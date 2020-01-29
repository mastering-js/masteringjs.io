A [finite state machine](https://www.freecodecamp.org/news/state-machines-basics-of-computer-science-d42855debc66/) is a fancy way
to describe a very simple design pattern: there is a list of valid
_states_, and a list of allowed _transitions_ between states.

For example, [JavaScript promises are state machines](/tutorials/fundamentals/promise#promises-as-state-machines). A promise can be in one of 3 states:

1. Pending
2. Fulfilled
3. Rejected

There are only two allowed state transitions: pending to fulfilled, and
pending to rejected. Once a promise is fulfilled, it stays fulfilled forever.
You can represent this state machine using the below [state machine diagram](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-state-machine-diagram/).

<img src="https://codebarbarian-images.s3.amazonaws.com/promise.png" class="inline-image" style="width: 400px">

A _state machine diagram_ usually represents states using circles or squares,
and transitions using lines or arrows.

## A Basic Use Case With [Mongoose](https://www.npmjs.com/package/mongoose)

Suppose you're building an app for moderating blog post comments.
Moderating comments can be represented by a state machine similar
to the one for promises. A comment can be in one of 3 states:

1. Pending
2. Approved
3. Rejected

You only want to display approved comments on your blog. But an admin
should have an easy way to load all pending comments. Here's how
you might represent this using a [Mongoose schema](https://mongoosejs.com/docs/guide.html):

```javascript
const schema = mongoose.Schema({
  state: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    required: true,
    default: 'Pending'
  },
  authorId: mongoose.ObjectId,
  comment: String
});

const Comment = mongoose.model('Comment', schema);
```

Loading all pending or all approved comments is easy using [Mongoose's `find()` function](http://thecodebarbarian.com/how-find-works-in-mongoose.html):

```javascript
const pending = await Comment.find({ state: 'Pending' });
```

Here's how the state machine diagram looks:

<img src="/assets/commentstate.png" class="inline-image" style="width: 400px">

As the developer, you're responsible for ensuring these state transitions
are respected. For example, you could expose 2 Express endpoints: one for
approving a comment, and one for rejecting a comment.

```javascript
app.put('/comment/:id/approve', async function(req, res) {
  const comment = await Comment.findById(req.params.id);
  if (comment.state !== 'Pending') {
    return res.send(400).json({ message: 'Comment is not pending' });
  }
  comment.state = 'Approved';
  await comment.save();
  res.json({ ok: 1 });
});

app.put('/comment/:id/reject', async function(req, res) {
  const comment = await Comment.findById(req.params.id);
  if (comment.state !== 'Pending') {
    return res.send(400).json({ message: 'Comment is not pending' });
  }
  comment.state = 'Rejected';
  await comment.save();
  res.json({ ok: 1 });
});
```