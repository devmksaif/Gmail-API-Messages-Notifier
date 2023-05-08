const {google} = require('googleapis');
const TelegramBot = require('telegram-bot-api');

// Replace with your own values
const gmailCredentials = {
  client_id: '377882535609-vfp4airhpnrlbh0tjruvmtf54bp8adt4.apps.googleusercontent.com',
  client_secret: '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',
  redirect_uri: 'https://6456cded5f9a4f23614c4fb9.mockapi.io/data',
  authorization_code: '4/0AbUR2VO6iziaD3gu-ewGe3o4xdOUzpebgD1tKjygDLTZqVMjv1yarIjlpDIVzwlFE6CvEg',
};
const telegramToken = '6216708603:AAHuLMJZbAG_u8bXA0mlCV2uxTJqNAvk2_Y';

const gmail = google.gmail({version: 'v1', auth: getOAuth2Client()});

async function main() {
  const message = await getLatestEmail();
  if (message.subject.includes('Alert')) {
    const telegram = new TelegramBot(telegramToken);
    await telegram.sendMessage({chat_id: '@dragon_fire_signals', text: 'Alert!'});
  }
}

async function getLatestEmail() {
  const response = await gmail.users.messages.list({userId: 'me'});
  const messageId = response.data.messages[0].id;
  const message = await gmail.users.messages.get({userId: 'me', id: messageId});
  return parseMessage(message.data);
}

function parseMessage(raw) {
  const message = {};
  for (const header of raw.payload.headers) {
    message[header.name.toLowerCase()] = header.value;
  }
  message.body = getBody(raw.payload);
  return message;
}

function getBody(payload) {
  const body = payload.body.data || '';
  const parts = payload.parts || [];
  for (const part of parts) {
    if (part.body && part.body.data) {
      return Buffer.from(part.body.data, 'base64').toString();
    }
  }
  return Buffer.from(body, 'base64').toString();
}

async function getOAuth2Client() {
  const {client_secret, client_id, redirect_uri, authorization_code} = gmailCredentials;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uri);
  const {tokens} = await oAuth2Client.getToken(authorization_code);
  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
}


main().catch(console.error);
