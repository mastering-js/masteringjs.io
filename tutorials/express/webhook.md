Simply put, a webhook is an API endpoint that an outside service calls
when an event occurs. Here's a few examples of commonly used webhooks
in web development:

- [Inbound SMS messages to your Twilio account](https://www.twilio.com/docs/glossary/what-is-a-webhook)
- [PayPal IPN](https://developer.paypal.com/docs/classic/products/instant-payment-notification/)
- [Inbound emails to your SendGrid account](https://sendgrid.com/blog/whats-webhook/)

The key takeaway is that an external service is responsible for calling your webhook.
You don't have to handle SMS messages directly in your app, you can rely on
[Twilio to convert the SMS message to an HTTP request to your API](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js).

Generally, services like Twilio ask you to enter a URL for your webhook
The URL must be publically accessible. If you want to expose `localhost`
for Twilio webhooks, you should use a service like [ngrok](https://ngrok.com/).

<img src="/assets/twilio.png">

A PayPal IPN Webhook
--------------------

Below is a simple webhook that prints the request body from a [simulated PayPal IPN webhook](https://developer.paypal.com/docs/classic/ipn/integration-guide/IPNSimulator/).

```javascript
'use strict';

const express = require('express');

run().catch(err => console.log(err));

async function run() {
  const app = express();

  app.use(require('body-parser').text({ type: () => true }));

  app.all('/ipn', (req, res) => {
    console.log('Got', req.body);

    return res.send('SENT');
  });

  await app.listen(3000);
  console.log('Listening on port 3000');
}
```

Using PayPal's IPN simulator and ngrok, you can send a test webhook
to the above server:

<img src="/assets/ipn.png">

Here's the output you should see when the webhook goes through:

```
$ node .
Listening on port 3000
Got payment_type=echeck&payment_date=12%3A28%3A46%20Jan%2012%2C%202020%20PST&payment_status=Completed&address_status=confirmed&payer_status=verified&first_name=John&last_name=Smith&payer_email=buyer@paypalsandbox.com&payer_id=TESTBUYERID01&address_name=John%20Smith&address_country=United%20States&address_country_code=US&address_zip=95131&address_state=CA&address_city=San%20Jose&address_street=123%20any%20street&business=seller@paypalsandbox.com&receiver_email=seller@paypalsandbox.com&receiver_id=seller@paypalsandbox.com&residence_country=US&item_name=something&item_number=AK-1234&quantity=1&shipping=3.04&tax=2.02&mc_currency=USD&mc_fee=0.44&mc_gross=12.34&mc_gross_1=12.34&txn_type=web_accept&txn_id=493449894&notify_version=2.1&custom=xyz123&invoice=abc1234&test_ipn=1&verify_sign=AkGoM1YN05HZDh0W4ejvAx3.yitsADMYtkiSuk3NqAk7.VGXP0jlR9WB

```