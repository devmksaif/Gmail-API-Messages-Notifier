const {google} = require('googleapis');
const https = require('https');


// Replace with your own values
const gmailCredentials = {
  client_id: '377882535609-vfp4airhpnrlbh0tjruvmtf54bp8adt4.apps.googleusercontent.com',
  client_secret: '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',
  redirect_uri: 'https://6456cded5f9a4f23614c4fb9.mockapi.io/data',
  access_token: 'ya29.a0AWY7Ckllp0dFY1nYb1jZLef6QHzUXVx3QOk5vHgq-FqwN0dWgg0hNUXkBafBygf82aQcP8JZl241vbRCcMFahSl7JRonI8LPHu39axUILxt8SQ22oklmIobd_8e_91_Lickc8JlnddZy4_jIP4cfNMnhAa76aCgYKAd4SARMSFQG1tDrpgVSWRV4N-xG323IFvPfDaQ0163',
  refresh_token: '1//04H69gvJpeGZvCgYIARAAGAQSNwF-L9IrDRrW81JlgnQZwk39vsOhfa_S4zsRfCKH89l9yeaSTg5EA62y7bDOaB_LJkDJejrOMyk',
};

const gmail = google.gmail({version: 'v1', auth: getOAuth2Client()});

async function main() {
  const message = await getLatestEmail();
  if (message.subject.includes('Alert')) {
	https.get("https://api.telegram.org/bot6216708603:AAHuLMJZbAG_u8bXA0mlCV2uxTJqNAvk2_Y/sendMessage?chat_id=@dragon_fire_signals&text=Alert");
	console.log("Found");
  }else
  {
	  console.log("Not found");
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
