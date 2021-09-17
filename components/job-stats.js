module.exports = () => 
`
<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="description">
  <meta name="viewport" content="width=device-width, initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no">
  <link rel="stylesheet" href="/assets/style.css" />
  <link rel="stylesheet" href="/assets/jobs.css" />
  <script src="https://unpkg.com/vue@2.x"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
  <script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>

  <style>
    .row::after {
      content: '';
      clear: both;
      display: table;
    }

    .row .col-4 {
      width: 33.333333%;
      float: left;
    }

    .stat {
      padding: 10px;
      margin: 10px;
      border: 1px solid #ddd;
      border-radius: 3px;
      position: relative;
    }

    .stat .tooltip {
      position: absolute;
      display: none;
      left: 0%;
      top: 99%;
      background-color: #ddd;
      line-height: 1.25em;
      padding: 10px;
      border-radius: 3px;
      width: calc(100% - 20px);
    }

    .stat:hover .tooltip {
      display: block;
    }

    .stat-data {
      font-size: 1.5em;
      font-weight: bold;
    }

    canvas {
      margin-top: 2em;
    }
  </style>
</head>

<body>
  <div id="content"></div>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="../src/client/vuejobstats.js"></script>
</body>
</html>
`
