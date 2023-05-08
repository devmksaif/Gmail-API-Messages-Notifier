const {google} = require('googleapis');
const https = require('https');


// Replace with your own values
const gmailCredentials = {
  client_id: '377882535609-vfp4airhpnrlbh0tjruvmtf54bp8adt4.apps.googleusercontent.com',
  client_secret: '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',
  redirect_uri: 'https://6456cded5f9a4f23614c4fb9.mockapi.io/data',
  access_token: 'ya29.a0AWY7CklGNT2wiNFO-WjGMWcEsoJCKW_e2dL8j6oZfMKiKKPOLY0tFH3M-HIhKAyCn61n-xb5Du28DSajH89a1BtiALHFf7-87pLuVkPBRs4UjYQs7l0209IqCx8oGwOvPYf7faLSTe_MWashnEwMJEb2NWxmaCgYKAcwSARMSFQG1tDrpA8pg2Rk3OUkFYU0VORWf0g0163',
  refresh_token: '1//043hgnAVmDk-JCgYIARAAGAQSNwF-L9Ire5m-BEn4Y6JawqYzU7sO7-s0ltY4Z_Lmav_nwLRy6jqw2b-2gYBGN1FrAQd7eove4Is',
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

while(true)
	main().catch(console.error);
