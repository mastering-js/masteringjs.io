const yaml = CodeMirror(document.querySelector('#yaml'), { mode: 'yaml', lineNumbers: true, readOnly: true});
const json = CodeMirror(document.querySelector('#json'), { mode: 'javascript', lineNumbers: true });
const YAML = require('js-yaml');
window.yaml = yaml;
window.json = json;

window.convert = async function convert() {
    try {
        window.yaml.setValue(YAML.dump(JSON.parse(window.json.getValue())));
    } catch (e) {
        window.yaml.setValue('Make sure you are entering valid JSON');
    }
}
document.getElementById('work').addEventListener('click', convert);