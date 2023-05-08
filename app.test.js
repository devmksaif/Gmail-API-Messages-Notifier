const {google} = require('googleapis');
const TelegramBot = require('telegram-bot-api');

// Replace with your own values
const gmailCredentials = {
  client_id: '377882535609-vfp4airhpnrlbh0tjruvmtf54bp8adt4.apps.googleusercontent.com',
  client_secret: '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',
  redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
  access_token: 'ya29.a0AWY7Ckk6NsYw5f62-B4L64TsdVXcmLc24O9GQEmSgT_xGfki9yL06nWij0Tyu-DlnR5EyyBeAAfcagXgjKxJOaGRL5ECA5FYLfzHF7RAJibUW2fO9XBIl30XOnebQwqSmTg0oADCf3JZfFnz9U_f19JdQxiGaCgYKAdASARMSFQG1tDrpKxcQhfFW5E3Ej2FvKrxnxQ0163',
  refresh_token: '1//04TeZy10amwdUCgYIARAAGAQSNwF-L9IrLw0ivr9Jb15qfN4ybBT25jrA8mxOzvBtsaEdClKur_0yfSc6ph2ObC1DFcedXTDD2mA',
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

function getOAuth2Client() {
  const {client_secret, client_id, redirect_uri, access_token, refresh_token} = gmailCredentials;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uri);
  oAuth2Client.setCredentials({access_token, refresh_token});
  return oAuth2Client;
}

main().catch(console.error);
