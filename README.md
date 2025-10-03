
# Gmail Alert Notifier

A Node.js application that monitors your Gmail inbox for new emails with a specific subject ("Alert") and sends a notification to a Telegram chat when such an email is found. This is useful for receiving instant alerts for important emails.

## Prerequisites

Before you begin, ensure you have the following:

*   **Node.js** installed on your machine (version 14 or higher recommended). You can download it from [nodejs.org](https://nodejs.org/).
*   **Gmail API Credentials:** You'll need to set up a project in the Google Cloud Console and enable the Gmail API to obtain the necessary credentials.
*   **Telegram Bot API Credentials:** You'll need to create a Telegram bot using BotFather and obtain the bot token and your chat ID.

### Obtaining Gmail API Credentials

1.  **Create a Project in Google Cloud Console:**
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   Create a new project or select an existing one.

2.  **Enable the Gmail API:**
    *   In the Cloud Console, navigate to "APIs & Services" > "Library".
    *   Search for "Gmail API" and enable it.

3.  **Create OAuth 2.0 Credentials:**
    *   Go to "APIs & Services" > "Credentials".
    *   Click "Create Credentials" > "OAuth client ID".
    *   Configure the OAuth consent screen (if you haven't already):
        *   Select "External" user type (unless you're using a Google Workspace account).
        *   Fill in the required information (app name, user support email, etc.).
    *   Choose "Web application" as the application type.
    *   Enter a name for your client.
    *   Specify the **Authorized redirect URIs**.  For testing purposes, `http://localhost:3000` is commonly used. **IMPORTANT: This URI must match the one you use in your application.**
    *   Click "Create". You'll receive your **Client ID** and **Client Secret**.

4.  **Obtain Access and Refresh Tokens:**
    *   You'll need to use the OAuth 2.0 flow to obtain an access token and a refresh token.  A simple way to do this is to use the [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
    *   In the OAuth 2.0 Playground:
        *   Click the gear icon in the upper right corner and check "Use your own OAuth credentials".
        *   Enter your **Client ID** and **Client Secret**.
        *   Select the Gmail API v1 and authorize it.
        *   Exchange the authorization code for tokens.  You'll receive your **Access Token** and **Refresh Token**.

> **Important Considerations:** Store your `Client ID`, `Client Secret`, `Redirect URI`, `Access Token`, and `Refresh Token` securely. The `Access Token` may expire, but the `Refresh Token` can be used to obtain a new `Access Token`.

### Obtaining Telegram Bot API Credentials

1.  **Create a Telegram Bot:**
    *   Open Telegram and search for "BotFather".
    *   Start a chat with BotFather and use the `/newbot` command to create a new bot.
    *   Follow the instructions to choose a name and username for your bot.

2.  **Obtain the Bot Token:**
    *   BotFather will provide you with a **Bot Token**. This token is required to interact with the bot via the Telegram Bot API.

3.  **Obtain the Chat ID:**
    *   Start a conversation with your newly created bot.
    *   You can use a tool like `@userinfobot` to get the chat ID of the conversation. Alternatively, you can send a message to your bot and then use the Telegram API `getUpdates` method to retrieve the chat ID from the response. For example, you can use the following URL in your browser, replacing `<BOT_TOKEN>` with your bot's token: `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates`.  The `chat.id` will be in the JSON response.

> **Important Considerations:** Keep your `Bot Token` secure. Anyone with the token can control your bot.

## Installation

1.  **Clone the Repository:**

    bash
    cd gmail-alert-notifier
        *   Open the `index.js` file.
    *   Locate the `gmailCredentials` object and replace the placeholder values with your actual Gmail API credentials:

        *   `index.js`: The main application file containing the logic for fetching emails, checking the subject, and sending Telegram notifications.
*   `package.json`: Contains project metadata and lists the project's dependencies (e.g., `googleapis`, `node-telegram-bot-api`).
*   `package-lock.json`: Records the exact versions of the dependencies used in the project.
*   `LICENSE`: Contains the license information for the project.
    

## Troubleshooting

*   **Incorrect Credentials:** Double-check that you have correctly entered your Gmail API credentials (Client ID, Client Secret, Redirect URI, Access Token, Refresh Token) and Telegram Bot API credentials (Bot Token, Chat ID).
*   **Gmail API Not Enabled:** Ensure that you have enabled the Gmail API in the Google Cloud Console for your project.
*   **Invalid Redirect URI:** Make sure that the redirect URI you configured in the Google Cloud Console matches the one used in your application (`http://localhost:3000` or your actual URI).
*   **API Rate Limits:** The Gmail API has rate limits. If you exceed these limits, you may receive errors. Implement error handling and consider adding delays between API calls to avoid rate limiting.
*   **Telegram Bot Not Receiving Messages:** Ensure that your bot has been started by sending it a message first. Also, double-check that you have the correct Chat ID.

## Contributing

Contributions are welcome! If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.

## License

