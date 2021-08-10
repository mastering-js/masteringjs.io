const pug = CodeMirror(document.querySelector('#pug'), { mode: 'pug', lineNumbers: true, readOnly: true});
const html = CodeMirror(document.querySelector('#html'), { mode: 'xml', lineNumbers: true });
window.pug = pug;
window.html = html;

window.convert = function convert() {
    console.log('hello')
// const html2pug = require('html2pug');
const html2jade = require('html2jade');
// const pug = document.querySelector('#pug')
//const html = document.querySelector('#html')
// pug.setValue(html2pug(html.getValue(), { tabs: true }));
html2jade.convertHtml(window.html.getValue(), {}, function(err, jade) {
    window.pug.setValue(jade);
})
}
document.getElementById('work').addEventListener('click', convert);