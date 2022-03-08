To replace a string in JavaScript, you can use the `replaceAll()` function.
The function takes a regular expression/pattern or string that defines what needs to be replaced as its first argument.
The second argument can either be a string that is the replacement, or a function that will be invoked to create the replacement.
It does not alter the original string but instead returns the new version of the string.

```javascript
const sentence = 'The world is a cruel place.';
sentence.replaceAll('cruel', 'wonderful'); // The world is a wonderful place.
sentence; // The world is a cruel place.
```

## Using a regular expression

You can use a regular expression in place of a string if you want to cover more cases of what needs to be replaced.
It is important to not that your regular expression must have the `g` flag enabled or you will get a `TypeError`.

```javascript
const sentence = 'The world is a cruel place. Only cruel people thrive here.';
sentence.replaceAll(/cruel/ig, 'wonderful'); // The world is a wonderful place. Only wonderful people thrive here.
sentence; // The world is a cruel place. Only cruel people thrive here.
```

## Using a function

The invoked function runs for every match it finds.
This function has 5 parameters:

1. match, what the function found that matched the search criteria.
2. pN/$N, where N is the nth string found by a parenthesized capture group. So for example `/(\a+)(\b+)/` has two.
3. offset, where in the string the match was found.
4. string, the string being examined.
5. namedGroups, a more detailed version of `2`. It is an object where the keys are the capture groups and the values and the matches.

```javascript
const sentence = 'abcd abcd';
sentence.replaceAll(/(a+)(b+)/ig, function(match, p1, p2, offset, string, namedGroups){
match; // ab
p1; // a
p2; // b
offset; // 0 then 5 on the next iteration
string; // abcd abcd
return 'Hello';
}) // Hellocd Hellocd
```
However, when running this example, `namedGroups` returns undefined. Could be the parameter is no longer supported.

With a string, it has 3:

1. match
2. offset
3. string

```javascript
const sentence = 'The world is a cruel place. Only cruel people thrive here.';
sentence.replaceAll('cruel', function(match, offset, string) {
 match; // cruel
 offset; // 15 then 33
 string; // The world is a cruel place. Only cruel people thrive here.
 return match.toUpperCase();
}); // The world is a CRUEL place. Only CRUEL people thrive here.
```
