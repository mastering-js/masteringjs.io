const pug = CodeMirror(document.querySelector('#pug'), { mode: 'pug', lineNumbers: true, readOnly: true});
const html = CodeMirror(document.querySelector('#html'), { mode: 'xml', lineNumbers: true });
window.pug = pug;
window.html = html;

window.convert = async function convert() {
    var server = window.location.hostname === 'localhost' ?
        'http://localhost:7071' :
        'https://masteringjs-job-board.azurewebsites.net';

    const request = await fetch(server + '/api/htmltopug', {
        method: 'POST',
        body: JSON.stringify({ input: window.html.getValue(), fragment: true })
    }).then((res) => { return res.json() });
    window.pug.setValue(request.result);
}
document.getElementById('work').addEventListener('click', convert);