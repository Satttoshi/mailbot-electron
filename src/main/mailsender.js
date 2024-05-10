import nodemailer from 'nodemailer';
import fs from 'fs';

import { is } from '@electron-toolkit/utils';
import { contentFilePath, privateConfigFilePath } from './utils/file-paths';
import { getEventSender, initEventSender } from './event-sender';
import { delay } from '../utils/delay';

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
          resolve(info);
          trigger({ trigger: { message: 'mailSent', mail: mailOptions.to } });
        }
      });
    }); // Return info for further processing, if necessary
  } catch (error) {
    // we rethrow the error out of the callback
    throw error;
  }
}

let sanitizedMailList = [];
// load mailList and remove duplicates
function updateSheet(mailList) {
  // map just the email addresses and filter out the ones that don't have an @ and have already been sent
  const plainMailList = mailList
    .filter((email) => {
      console.log('Email: ', email, 'Sent: ', email.sent);
      return email.emails.includes('@') && !email.sent;
    })
    .map((row) => row.emails);
  // Remove duplicates
  sanitizedMailList = removeDuplicates(plainMailList);
  if (sanitizedMailList.length === 0) {
    log('There are no mails to send, please add some and mark them as "not sent"');
    return;
  }
  log('Completed loading current sheet with ' + sanitizedMailList.length + ' entries');
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
async function main(selectedMailIndex, mailTitle, mailList) {
  const config = await useConfig();
  if (!config) {
    log('No config found');
    return;
  }
  const min = config.min * 1000;
  const max = config.max * 1000;
  updateSheet(mailList);

  let isError = false;

  //Add Timestamps, update Mail configs
  for (let i = 0; i < sanitizedMailList.length; i++) {
    await changeMailOptions(sanitizedMailList[i], selectedMailIndex, mailTitle);
    try {
      if (is.dev) {
        log('DEV MODE: Skipping sending next email...');
        await mailSender(selectedMailIndex);
      }
    } catch (error) {
      log(error);
      isError = true;
      break;
    }
    log(`Send mail to: ${sanitizedMailList[i]} Index: ${i + 1}`);
    if (i + 1 < sanitizedMailList.length) {
      await delay(Math.floor(Math.random() * (max - min) + min));
    }
  }
  if (isError) {
    log('Bot stopped due to error');
    return;
  }
  await delay(2000);
  log('No more EMAILS! Pypenschuch, Bot ist fertig :)');
}

export async function startMailSender(event, mailerArgs) {
  initEventSender(event);
  log = trigger = getEventSender();

  const { selectedMailIndex, mailTitle, mailList } = mailerArgs;

  try {
    const config = await useConfig();
    const senderName = config.mailcredentials[selectedMailIndex].name;
    const senderEmail = config.mailcredentials[selectedMailIndex].email;
    log(`Starting mail sender for ${senderName}, ${senderEmail}`);
  } catch (error) {
    delay(1000).then(() => trigger({ trigger: { message: 'mailSender-stop' } }));
    log('Failed to read config file', error);
    return;
  }

  main(selectedMailIndex, mailTitle, mailList)
    .then(() => {
      log('Mail Sender finished');
    })
    .catch(log)
    .finally(() => {
      trigger({ trigger: { message: 'mailSender-stop' } });
    });
}

// Init the config on startup
useConfig().catch((err) => console.error('Failed to init private-config.json:', err));
