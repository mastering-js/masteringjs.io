To log in with Google OAuth in Node.js, you should use the [googleapis npm package](https://www.npmjs.com/package/googleapis).
The OAuth redirect URI is the 3rd param to `google.auth.OAuth2` as shown below.

```javascript
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_CALLBACK_URL
);
```

Google requires you to configure a list of allowed OAuth callback URLs (also called OAuth redirect URIs) in the Google Cloud Platform console.
To modify your app's allowed redirect URIs, go to [`console.cloud.google.com`](https://console.cloud.google.com/), click the left side panel, and navigate to `APIs & Services > Credentials`.

<img src="/assets/images/google-oauth.png" />

From there, find the OAuth credential that you want to modify.
Click "Edit" and you should see a list of "Authorized redirect URIs".

<img src="/assets/images/google-oauth-2.png" />