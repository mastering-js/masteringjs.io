# Hello World


<script src="https://unpkg.com/prettier@2.7.1/standalone.js"></script>
<script src="https://unpkg.com/prettier@2.7.1/parser-graphql.js"></script>
<script>
  prettier.format(`.navBar {color: red; background-color: black;}`, {
    parser(text, {}) {
        console.log('what is text', text);
        let insideRules = false;
        let ruleName = false;
        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) == '{') {
                insideRules = true;
                ruleName = false;
            }
            if (text.chartAt(i) == '.') {
                ruleName = true;
            }
            if (text.charAt(i) == '}') {
                insideRules = false;
            }
        }
    }
  }, {tabWidth: 2, endOfLine: 'lf'});
</script>