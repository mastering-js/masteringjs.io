There are numerous solutions out there for validating an email address in JavaScript, depending on how strict you want to be with your validation. 
In this tutorial, you'll learn about 3 different options and the tradeoffs between them.

### Write Your Own Regular Expression

The quick and easy approach is to write a regular expression that validates whether a string is a correctly formatted
email address. One simple approach I've used in the past is checking if the string looks like `xx@yy.zz`:

```javascript
/^[^@]+@\w+(\.\w+)+\w$/.test(str);
```

This regular expression is fairly concise and handles many common cases. If you don't need to be especially strict
about validation, this regexp can be helpful.

```javascript
/^[^@]+@\w+(\.\w+)+\w$/.test('foo@bar.co'); // true
/^[^@]+@\w+(\.\w+)+\w$/.test('foo.bar@baz.co'); // true
/^[^@]+@\w+(\.\w+)+\w$/.test('foo@bar.c'); // false, TLD must be at least 2 chars
/^[^@]+@\w+(\.\w+)+\w$/.test('foo@bar'); // false
/^[^@]+@\w+(\.\w+)+\w$/.test('bar.co'); // false
```

However, there are many rules that the above regular expression doesn't account for. For example, the "personal info"
part of an email address (everything before '@') cannot contain square braces `[]`. There are
[more sophisticated regexps](https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression/201378#201378) that handle most of the edge cases,
for example:

```javascript
/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
```

However, this regular expression still doesn't handle all edge cases. For example, the personal info part of the email
address cannot be more than 64 characters. Because of this, writing your own email validation regexp is typically not
a good choice, unless you're certain you only want a quick spot check as to whether an email is valid.

### 2. Use an npm Module

The [email-validator npm module](https://www.npmjs.com/package/email-validator) is a more robust check for whether a
string is a syntactically valid email address. It handles several rules that regular expressions can't check, for example:

```javascript
[require:Fundamentals email validation npm module$]
```

The email-validator module is a great choice most of the time. It handles the complex regular expressions and various
rules so you don't have to. You should use email-validator or something similar, unless you have
a compelling reason to write your own regular expression.

### 3. Use an API

Regular expressions and email-validator only check the _syntax_ of the email address, not if it is an actual email
address. For example, `foo@bar.baz` is a syntactically valid email address, but sending an email to that address from
[Mailgun](http://thecodebarbarian.com/sending-emails-using-the-mailgun-api.html) will fail because `baz` is not a valid TLD.

There are several APIs for validating email addresses, like [Mailgun](https://www.mailgun.com/email-validation/) and [Kickbox](https://kickbox.com/). These APIs perform additional validation by talking to the actual mail server and
verifying that the email exists.

For example, here's how you can use [Axios](https://masteringjs.io/axios) to validate an email against Kickbox's validation API:

```javascript
const email = 'notexist@karpov.io';
const apiKey = 'your key here';

const res = await axios.get('https://api.kickbox.com/v2/verify', { params: { email, apiKey } });

res.data.result; // 'undeliverable', because the email address doesn't exist
```

These APIs are also not foolproof: some mail servers don't allow tools like Mailgun or Kickbox to check whether
an individual email address exists, to block email scraping. However, if you want to make absolutely certain that
users are signing up with valid emails, and you're willing to pay to maximize deliverability, using an API is a good choice.