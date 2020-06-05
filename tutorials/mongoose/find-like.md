[The SQL LIKE operator](https://use-the-index-luke.com/sql/where-clause/searching-for-ranges/like-performance-tuning) lets you search for strings with wildcards. MongoDB
doesn't have a similar operator - the [`$text` operator](https://docs.mongodb.com/manual/reference/operator/query/text/) performs a more sophisticated text search. But
MongoDB does support regular expression queries that work similarly to LIKE.

For example, suppose you want to find all users whose `email` contains `gmail`.
You can simply search by the JavaScript regular expression `/gmail/`:

```javascript
[require:Mongoose find like basic example$]
```

Equivalently, you can use the `$regex` operator.

```javascript
const docs = await User.find({ email: { $regex: 'gmail' } });
```

Note that Mongoose does **not** escape special characters in regexps
for you. If you want to use `$regexp` with user entered data, you
should sanitize the string first using [escape-string-regexp](https://www.npmjs.com/package/escape-string-regexp) or a similar library for escaping regular expression special characters.

```javascript
[require:Mongoose find like regexp escape$]
```