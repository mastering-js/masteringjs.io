
const server = "https://masteringjs-job-board.azurewebsites.net";
async function getJobs() {
  var jobs = await fetch(server+'/api/listjobs').then((res) => {
    return res.json();
  }).then((data) => {return data.jobs.splice(0,3)}).catch((err) => console.log(err));
  var insert='';
  for(let i = 0; i < jobs.length; i++) {
    insert += `
        <a href="'/jobs/' + ${jobs[i]._id}">
          <div v-if="job.logo" class="company-logo">
            <img src="${jobs[i].logo}" />
          </div>
          <div class="description">
            <div class="company">${jobs[i].company}</div>
            <div class="title">${jobs[i].title}</div>
            <div class="location">${jobs[i].location}</div>
          </div>
        </a>
    `;
  }
  insert += `
  <div>
  <div class="button jobs-view-more">
    View more jobs!
  </div>
</div>
`;
document.getElementById('jobs').innerHTML = insert;
}
getJobs();