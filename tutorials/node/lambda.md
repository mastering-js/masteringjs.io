The [AWS API has an endpoint for deploying a function on Lambda](https://docs.aws.amazon.com/cli/latest/reference/lambda/create-function.html). With a little bit of work, you can upload a Lambda function using the [AWS SDK for Node.js](https://www.npmjs.com/package/aws-sdk). Here's how you can upload and run a Lambda function in 3 steps:

## 1. Upload the Function Bundle to S3

Unfortunately, the AWS API requires you to store your bundled Lambda
function as a `.zip` file on S3, and that S3 bucket needs to be in
the same [AWS region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) as your Lambda function.

You can read more about [uploading objects to S3 in Node.js here](/tutorials/node/s3). Here's the abridged version.

First, suppose you have a simple `test.js` file that contains a
`handler` function:

```javascript
exports.handler = async function(event, context) {
  return { statusCode: 200, body: 'Hello, World' };
};
```

Lambda will execute this function for you and return "Hello World".
But first, you need to archive this `test.js` file into a `.zip` file
and upload it to S3. To bundle a zip file, you can use the [adm-zip package on npm](https://www.npmjs.com/package/adm-zip):

```javascript
[require:AWS lambda bundle and upload$]
```

## 2. Create a Lambda Function

Now that the file is on S3, you can create a Lambda function and
[invoke](https://docs.aws.amazon.com/cli/latest/reference/lambda/invoke.html) it using the `AWS.Lambda()` helper:

```javascript
[require:AWS lambda invoke$]
```

For convenience, the above code uses Node.js' `util.promisify()` helper, since the AWS SDK doesn't currently support promises.
[Learn more about `util.promisify()` here](/tutorials/node/promisify).

## 3. Create an API Gateway to Access the Function via HTTP

So now you have a Lambda function that you can invoke via the AWS
SDK. But what about invoking it via HTTP? That's what you need the
[AWS API Gateway API](https://docs.aws.amazon.com/cli/latest/reference/apigateway/index.html) for. You need to [create a new REST API](https://docs.aws.amazon.com/cli/latest/reference/apigateway/create-rest-api.html) and [add an integration to it](https://docs.aws.amazon.com/cli/latest/reference/apigateway/put-integration.html).

Step by step, you need to:

1. Create a new REST API
2. Add a resource to the REST API
3. Add a `GET` method to the resource
4. Hook up the `GET` method to call Lambda

Here's the full script:

```javascript
[require:AWS lambda create rest api$]
```