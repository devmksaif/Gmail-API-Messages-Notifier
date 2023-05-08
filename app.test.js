const {google} = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  "377882535609-vfp4airhpnrlbh0tjruvmtf54bp8adt4.apps.googleusercontent.com",
  "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",
  "https://6456cded5f9a4f23614c4fb9.mockapi.io/data"
);


const scopes = [
  'https://www.googleapis.com/auth/gmail.readonly'
];
const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes.join(' '),
});



const code = '0AbUR2VNTN809RCwky5GUMRfe-CHJRxXY_J_JsE64Zoc41Ve7cnKkC3VVRdOjHq13-Va5vg';
oauth2Client.getToken(code, (err, token) => {
  if (err) return console.error('Error retrieving access token', err);
  oauth2Client.setCredentials(token);
});


const gmail = google.gmail({version: 'v1', auth: oauth2Client});
gmail.users.labels.list({
  userId: 'me',
}, (err, res) => {
  if (err) return console.error('The API returned an error:', err.message);
  const labels = res.data.labels;
  if (labels.length) {
    console.log('Labels:');
    labels.forEach((label) => {
      console.log(`- ${label.name} (${label.id})`);
    });
  } else {
    console.log('No labels found.');
  }
});