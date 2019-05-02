There are numerous libraries, like [moment](https://www.npmjs.com/package/moment), that allow you to format dates in JavaScript. However, you don't need them for basic date formatting: the built-in [`Date#toLocaleString()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) lets you convert dates into custom string formats with no outside libraries.

Introducing `toLocaleString()`
------------------------------

The `toLocaleString()` function takes 2 arguments:

1) A string `locale` that represents the [high level format of the date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument), like `'en-US'` or `'default'`.

2) An object `options` that contains how to format various date components, like `month` or `minutes`.

Here's an example of formatting a date to include the short form of the weekday and the full date.

```javascript
[require:Fundamentals.*toLocaleString.*basic]
```

**Note:** Don't confuse `toLocaleString()` with [`toLocaleDateString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString). The `toLocaleDateString()` function is similar to `toLocaleString()`, except for it doesn't include the time portion of the date by default.

```javascript
[require:Fundamentals.*toLocaleString.*vs toLocaleDateString]
```

Timezones
---------

The `toLocaleString()` function also lets you specify a timezone to format the date in. Which timezones are supported is [implementation-specific](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Parameters), so you shouldn't rely on named timezones like 'America/Los_Angeles' or 'America/New_York' without testing your environment first. For example, Node.js [pulls timezone data from your OS](https://github.com/nodejs/help/issues/1843), so that means your Node process most likely has timezone data, but that is not strictly guaranteed.

Below is an example of formatting a UTC date with a specific timezone, `'America/Denver'`.

```javascript
[require:Fundamentals.*toLocaleString.*timezone]
```

Limitations
-----------

The `toLocaleString()` function is good enough for simple human-readable formatting, but it doesn't have the same level of control that you have with [moment](https://www.npmjs.com/package/moment).

For example, `toLocaleString()` doesn't have a way to output a date in `YYYYMMDD` format, such as '20190601' for June 1, 2019. You can output a date in `YYYY-MM-DD`, but you have to guess a compatible locale. There's no way to output `YYYY-MM-DD` using the `'en-US'` locale, but you can do it with the `'fr-CA'` locale.

```javascript
[require:Fundamentals.*toLocaleString.*yyyy-mm-dd]
```

Unfortunately, figuring out the right locale requires trial and error. If you need more powerful formatting than just 'June 1, 2019', you're better off using moment.