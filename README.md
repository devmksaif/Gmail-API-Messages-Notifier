# Gmail Alert Notifier

This is a simple Node.js application that checks the latest email in your Gmail account and sends an alert message if the subject contains "Alert". It utilizes the Gmail API from Google and the Telegram Bot API for sending alerts.

## Prerequisites

- Node.js installed on your machine.
- Gmail API credentials:
  - Client ID
  - Client Secret
  - Redirect URI
  - Access Token
  - Refresh Token
- Telegram Bot API credentials:
  - Bot Token
  - Chat ID

## Installation

1. Clone the repository:
    git clone https://github.com/your-username/gmail-alert-notifier.git

2. Navigate to the project directory:
    cd gmail-alert-notifier

3. Install the dependencies:
   npm install
   

4. Configure the credentials:
- Open the `index.js` file.
- Replace the placeholder values in the `gmailCredentials` object with your actual Gmail API credentials.
- Update the Telegram Bot API URL in the `main` function with your own Bot Token and Chat ID.

## Usage

Run the application using the following command:
      node index.js


The application will continuously check for new emails in your Gmail account. If an email with the subject "Alert" is found, it will send an alert message to the specified Telegram chat.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


