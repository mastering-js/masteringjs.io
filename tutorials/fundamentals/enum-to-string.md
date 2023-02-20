The standard pattern for [JavaScript enums](/tutorials/fundamentals/enum) is the following.

```javascript
const Direction = {
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right'
};
```

TypeScript enums compile to almost the above JavaScript, so everything in this post also applies to TypeScript enums.

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

## Converting an Entire Enum to a String

Enums are just objects, so [`JSON.stringify()`](/tutorials/fundamentals/stringify) works for converting an enum to a string.

```javascript
// {"Up":"Up","Down":"Down","Left":"Left","Right":"Right"} in JavaScript
// {"0":"Up","1":"Down","2":"Left","3":"Right","Up":0,"Down":1,"Left":2,"Right":3} in TypeScript
console.log(JSON.stringify(direction));
```

## Converting TypeScript Enum Values to Strings

In TypeScript, enum values are numbers.

```ts
console.log(Direction.Up); // 0
```

TypeScript enums also store a mapping from the numeric value back to the string, so to convert the numeric enum value back to a string do the following.

```ts
console.log(Direction[Direction.Up]); // 'Up'
```