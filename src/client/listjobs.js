
var server = window.location.hostname === 'localhost' ?
  'http://localhost:7071' :
  'https://masteringjs-job-board.azurewebsites.net';

function getJobs() {
  fetch(server + '/api/listjobs').
    then(function(res) { return res.json(); }).
    then(function(data) {
      var jobs = data.jobs.splice(0, 3);

      var insert = '';
      for (var i = 0; i < jobs.length; i++) {
        insert += `
          <div class="job-listing">
            <a href="/jobs#${jobs[i]._id}">
              <div v-if="job.logo" class="company-logo">
                <img src="${jobs[i].logo}" />
              </div>
              <div class="description">
                <div class="company">${jobs[i].company}</div>
                <div class="title">${jobs[i].title}</div>
                <div class="location">${jobs[i].location}</div>
              </div>
            </a>
          </div>
        `;
      }
      document.getElementById('jobs-container').innerHTML = insert;
    }).
    catch(function(err) { console.log(err) });
}

getJobs();