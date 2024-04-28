import nodemailer from 'nodemailer';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import fs from 'fs';
import { shutdownComputer } from './shutdown';

import { contentFilePath, privateConfigFilePath } from './utils/file-paths';
import { getEventSender, initEventSender } from './event-sender';

let log;
let trigger;

// Read private-config.json file on demand
function readConfig() {
  return new Promise((resolve, reject) => {
    fs.readFile(privateConfigFilePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const config = JSON.parse(data);
          resolve(config);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
}

// load the config file
async function useConfig() {
  try {
    return await readConfig();
  } catch (error) {
    console.error('Failed to read or parse the config file:', error);
    return null;
  }
}

// Watch the config file for changes, to always use the latest config in runtime
fs.watchFile(privateConfigFilePath, () => {
  console.log('Config file updated. Reloading...');
  // Debounce the reload
  setTimeout(() => {
    useConfig()
      .then((config) => {
        if (config) {
          console.log('Config reloaded');
        }
      })
      .catch((err) => console.error('Failed to reload config:', err));
  }, 1000);
});

// Delay function like sleep() in python
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// Define the email options
let mailOptions = {};

async function changeMailOptions(mail, selectedMailIndex, mailTitle) {
  const config = await useConfig();
  const content = fs.readFileSync(contentFilePath, 'utf-8');
  console.log(selectedMailIndex);
  const senderEmail = config.mailcredentials[selectedMailIndex].email;
  const senderName = config.mailcredentials[selectedMailIndex].name;
  const contentWithResolvedVariables = content.replace(/%NAME%/gi, senderName);
  console.log('Sender Email:', senderEmail, 'Sender Name:', senderName, 'Mail Title:', mailTitle);
  mailOptions = {
    from: senderEmail,
    to: mail,
    subject: mailTitle,
    text: contentWithResolvedVariables
  };
}

// Send the email
async function mailSender(selectedMailIndex) {
  // eslint-disable-next-line no-useless-catch
  try {
    const config = await useConfig();
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.mailcredentials[selectedMailIndex].email,
        pass: config.mailcredentials[selectedMailIndex].password
      }
    });

    return await new Promise((resolve, reject) => {
      // Send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          // log(`${mailOptions.to} ${info.response}\n`)
          resolve(info);
        }
      });
    }); // Return info for further processing, if necessary
  } catch (error) {
    // we rethrow the error out of the callback
    throw error;
  }
}

// Load sheets in array
const currentSheet = [];
let dedupedArr = [];

// bring sheet row into array "currentSheet"
async function updateSheet() {
  const config = await useConfig();
  const doc = new GoogleSpreadsheet(config.spreadsheet_id);

  await doc.useServiceAccountAuth(config.credentials);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  currentSheet.length = 0;
  // Imports sheet to array based on current row count
  for (let i = 0; i < rows.length; i++) {
    currentSheet.push(rows[i].Email);
  }
  // Remove duplicates
  dedupedArr = removeDuplicates(currentSheet);
  log(dedupedArr);
  log('Completed removing duplicates from current sheet');
  return 'Completed loading current sheet with ' + dedupedArr.length + ' entries mulaa\n';
}

// remove Duplicates from array
function removeDuplicates(arr) {
  return Object.keys(
    arr.reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {})
  );
}

//Main
async function main(selectedMailIndex, shouldShutdown, mailTitle) {
  const config = await useConfig();
  if (!config) {
    log('No config found');
    return;
  }
  const min = config.min * 1000;
  const max = config.max * 1000;
  const result = await updateSheet(log);
  console.log(result);

  let isError = false;

  //Add Timestamps, update Mail configs
  for (let i = 0; i < dedupedArr.length; i++) {
    await changeMailOptions(dedupedArr[i], selectedMailIndex, mailTitle);
    try {
      await mailSender(selectedMailIndex);
    } catch (error) {
      log(error);
      isError = true;
      break;
    }
    log(`Send mail to: ${dedupedArr[i]} Index: ${i + 1}`);
    if (i + 1 < dedupedArr.length) {
      await delay(Math.floor(Math.random() * (max - min) + min));
    }
  }
  if (isError) {
    log('Bot stopped due to error');
    return;
  }
  await delay(2000);
  log('No more EMAILS! Pypenschuch, Bot ist fertig :)');

  if (shouldShutdown) {
    await delay(5000);
    log('Gute Nacht! Shutting down...');
    shutdownComputer(log);
  }
}

export async function startMailSender(event, selectedMailIndex, shouldShutdown, mailTitle) {
  initEventSender(event);
  log = trigger = getEventSender();

  try {
    const config = await useConfig();
    const senderName = config.mailcredentials[selectedMailIndex].name;
    const senderEmail = config.mailcredentials[selectedMailIndex].email;
    log(`Starting mail sender for ${senderName}, ${senderEmail}`);
  } catch (error) {
    log('Failed to read config file', error);
    return;
  }

  main(selectedMailIndex, shouldShutdown, mailTitle)
    .then(() => {
      log('Mail Sender finished');
    })
    .catch(log)
    .finally(() => {
      trigger({ trigger: 'mailSender-stop' });
    });
}

// Init the config on startup
useConfig().catch((err) => console.error('Failed to init private-config.json:', err));
