'use strict';

module.exports = ({ url }) => `
<div class="sidebar">
  <h2>Mastering Axios</h2>
  <ul>
    ${createLink(url, '/tutorials/axios/get', 'GET Requests')}
    ${createLink(url, '/tutorials/axios/response-body', 'Get the HTTP Response Body')}
    ${createLink(url, '/tutorials/axios/post', 'POST Requests')}
    ${createLink(url, '/tutorials/axios/put', 'PUT Requests')}
    ${createLink(url, '/tutorials/axios/delete', 'DELETE Requests')}
    ${createLink(url, '/tutorials/axios/then', 'The <code>then()</code> Function')}
    ${createLink(url, '/tutorials/axios/catch', 'Error Handling using <code>catch()</code>')}
    ${createLink(url, '/tutorials/axios/call', 'Calling Axios as a Function')}
  </ul>
  <h4>Framework Features</h4>
  <ul>
    ${createLink(url, '/tutorials/axios/create', 'The <code>create()</code> Function')}
    ${createLink(url, '/tutorials/axios/interceptors', 'Axios Interceptors')}
  </ul>
  <h4>Integrations</h4>
  <ul>
    ${createLink(url, '/tutorials/axios/basic_auth', 'Basic Auth')}
  </ul>
</div>
`;

const createLink = (pageUrl, linkUrl, title) => `
<li>
  <a href="${linkUrl}" class="${pageUrl === linkUrl ? 'selected' : ''}">${pageUrl === linkUrl ? '&rsaquo; ' : ''}${title}</a>
</li>
`;