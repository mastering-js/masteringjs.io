module.exports = () => 
`
<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="description">
  <meta name="viewport" content="width=device-width, initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no">
  <link rel="stylesheet" href="/assets/style.css" />
  <link rel="stylesheet" href="/assets/jobs.css" />\
  <script src="https://unpkg.com/vue@2.x"></script>
  <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>

<body>
  <div id="content"></div>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="../src/client/vuejobs.js"></script>
</body>
</html>
`
