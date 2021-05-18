module.exports = () => `
<!DOCTYPE html>

<html lang="en">
<head>
  <title>Thank You! | Mastering JS</title>
  <meta charset="utf-8">
  <meta name="description">
  <meta name="viewport" content="width=device-width, initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no">
  <link rel="stylesheet" href="/assets/request-invite.css" />
</head>

<body>
  <div id="content">
    <div class="request-invite">
      <h1>Thanks for Listing Your Job on Mastering JS!</h1>
      <div class="description">
        Stripe has emailed a receipt to your email address.
      </div>
      <div class="description">
        Questions or concerns?
        Need to update your job posting?
        Email <a href="mailto:val@karpov.io">val@karpov.io</a>.
      </div>

      <a href="/jobs" class="button-wrapper">
        <div class="button">
          Back to Job Board
        </div>
      </a>
    </div>
  </div>
</body>
</html>
`
