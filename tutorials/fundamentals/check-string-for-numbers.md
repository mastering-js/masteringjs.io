To check if a string contains a number in JavaScript, there are two approaches.

## Using a Regular Expression

You can use a regular expression in combination with the `test()` function to confirm if there is a number in the string.

```javascript
const example = 'Dial 555-555-5555 for a free consultation today!';
const regex = new RegExp('\d');
regex.test(example); // true

/\d/.test(example); // true
```

## The Iterative Approach

Another approach is to iterate through the string

```javascript
const example = 'Dial 555-555-5555 for a free consultation today!';
[...example].find(char => char >= '0' && char <= '9'); // 5
```