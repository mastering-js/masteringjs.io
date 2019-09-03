By default, MongoDB creates an `_id` property on every document that's of type
[ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/). Many
other databases use a numeric id property by default, but in MongoDB and
[Mongoose](https://mongoosejs.com/), ids are objects by default.

```javascript
[require:Mongoose.*objectid.*basic example$]
```

Casting
-------

MongoDB ObjectIds are typically represented using a 24 hexadecimal character
string, like `'5d6ede6a0ba62570afcedd3a'`. Mongoose casts 24 char strings
to ObjectIds for you based on your [schema](https://mongoosejs.com/docs/guide.html#definition) paths.

```javascript
[require:Mongoose.*objectid.*casting$]
```

There are several other values that Mongoose can cast to ObjectIds. The key
lesson is that _an ObjectId is 12 arbitrary bytes_. Any 12 byte buffer or
12 character string is a valid ObjectId.

```javascript
[require:Mongoose.*objectid.*casting other types$]
```

Getting the Timestamp from an ObjectId
--------------------------------------

ObjectIds encode the local time at which they were created. That means you can
usually pull the time that a document was created from its `_id`.

```javascript
[require:Mongoose.*objectid.*timestamps$]
```

Why ObjectIds?
--------------

Suppose you're building your own database, and you want to set a numeric `id` property on each new document. The `id` property should be increasing, so the
first document you insert gets `id = 0`, then `id = 1`, and so on.

Incrementing a counter is an easy problem in a single process. But what if
you have multiple processes, like a
[sharded cluster](https://docs.mongodb.com/manual/sharding/)? Now each process
needs to be able to increment the counter, so whenever you insert a document
you also need to increment a distributed counter. That can lead to unreliable
performance if there's significant network latency between two processes, or
unpredictable results if one process is down.

ObjectIds are designed to work around this problem. [ObjectId conflicts are highly unlikely](https://docs.mongodb.com/manual/reference/bson-types/#objectid),
so MongoDB can assign ids that are probably unique in a distributed system with
no inter-process communication.