const pug = CodeMirror(document.querySelector('#pug'), { mode: 'pug', lineNumbers: true, readOnly: true});
const html = CodeMirror(document.querySelector('#html'), { mode: 'xml', lineNumbers: true });
window.pug = pug;
window.html = html;

window.convert = async function convert() {
    const request = await fetch('http://localhost:7071/api/htmltopug', {
        method: 'POST',
        body: JSON.stringify({ input: window.html.getValue(), fragment: document.getElementById('fragment').checked })
    }).then((res) => { return res.json() });
    window.pug.setValue(request.result);
}
document.getElementById('work').addEventListener('click', convert);