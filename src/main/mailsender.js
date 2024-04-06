import nodemailer from 'nodemailer'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import fs from 'fs'

import { contentFilePath, privateConfigFilePath } from './utils/file-paths'

// Read private-config.json file on demand
function readConfig() {
  return new Promise((resolve, reject) => {
    fs.readFile(privateConfigFilePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        try {
          const config = JSON.parse(data)
          resolve(config)
        } catch (parseError) {
          reject(parseError)
        }
      }
    })
  })
}

// load the config file
async function useConfig() {
  try {
    return await readConfig()
  } catch (error) {
    console.error('Failed to read or parse the config file:', error)
    return null
  }
}

// Watch the config file for changes, to always use the latest config in runtime
fs.watchFile(privateConfigFilePath, () => {
  console.log('Config file updated. Reloading...')
  // Debounce the reload
  setTimeout(() => {
    useConfig()
      .then((config) => {
        if (config) {
          console.log('Config reloaded')
        }
      })
      .catch((err) => console.error('Failed to reload config:', err))
  }, 1000)
})

// Mail Title
const title = 'Photo and video editing services!'

// Delay function like sleep() in python
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

// Define the email options
let mailOptions = {}

async function changeMailOptions(mail, selectedMailIndex) {
  const config = await useConfig()
  const txt = fs.readFileSync(contentFilePath, 'utf-8')
  mailOptions = {
    from: config.mailcredentials[selectedMailIndex].email,
    to: mail,
    subject: title,
    text: txt
  }
}

// Send the email
async function mailSender(selectedMailIndex) {
  const config = await useConfig()
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailcredentials[selectedMailIndex].email,
      pass: config.mailcredentials[selectedMailIndex].password
    }
  })
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log(`${mailOptions.to} ${info.response}\n`)
    }
  })
}

// Load sheets in array
const currentSheet = []
let dedupedArr = []

// bring sheet row into array "currentSheet"
async function updateSheet(log) {
  const config = await useConfig()
  const doc = new GoogleSpreadsheet(config.spreadsheet_id)

  await doc.useServiceAccountAuth(config.credentials)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows()
  currentSheet.length = 0
  // Imports sheet to array based on current row count
  for (let i = 0; i < rows.length; i++) {
    currentSheet.push(rows[i].Email)
  }
  // Remove duplicates
  dedupedArr = removeDuplicates(currentSheet)
  log(dedupedArr)
  log('Completed removing duplicates from current sheet')
  return 'Completed loading current sheet with ' + dedupedArr.length + ' entries mulaa\n'
}

// remove Duplicates from array
function removeDuplicates(arr) {
  return Object.keys(
    arr.reduce((acc, curr) => {
      acc[curr] = true
      return acc
    }, {})
  )
}

//Main
async function main(log, selectedMailIndex) {
  const config = await useConfig()
  if (!config) {
    log('No config found')
    return
  }
  const min = config.min * 1000
  const max = config.max * 1000
  const result = await updateSheet(log)
  console.log(result)

  //Add Timestamps, update Mail configs
  for (let i = 0; i < dedupedArr.length; i++) {
    await changeMailOptions(dedupedArr[i], selectedMailIndex)
    await mailSender(selectedMailIndex)
    log(`Send to: ${dedupedArr[i]} Index: ${i + 1}`)
    if (i + 1 < dedupedArr.length) {
      await delay(Math.floor(Math.random() * (max - min) + min))
    }
  }
  await delay(2000)
  log('No more EMAILS! Pypenschuch, Bot ist fertig :)')
}

export function startMailsender(event, selectedMailIndex) {
  function log(message) {
    console.log(message)
    event.sender.send('message', message)
  }

  log('Mailsender started')
  main(log, selectedMailIndex)
    .then(() => {
      log('Mailsender finished')
    })
    .catch(log)
}

// Init the config on startup
useConfig().catch((err) => console.error('Failed to init private-config.json:', err))
