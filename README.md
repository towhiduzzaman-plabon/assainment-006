# JavaScript ES6 Basics

## 1) Difference between var, let, and const
- **var**
  - Old way to declare variables.
  - Can be changed and declared again.
  - Works in the whole function or file, not just inside a block.
  
- **let**
  - New way to declare variables.
  - Can change the value, but cannot declare it again in the same block.
  - Works only inside the block where it is written.

- **const**
  - Used for values that should not change.
  - Cannot change or declare again.
  - Works inside the block where it is written.
  - If it is an object or array, the content inside can still change.

---

## 2) Difference between map(), forEach(), and filter()
- **map()**
  - Creates a **new array** by changing each item.
  - Always returns an array of the same length.

- **forEach()**
  - Just loops through each item.
  - Does **not return** a new array.

- **filter()**
  - Creates a **new array** only with items that match a condition.
  - Removes items that don’t match.

---

## 3) What are arrow functions?
- A shorter way to write functions in ES6.
- Uses `=>` instead of the word `function`.
- Example:
  ```js
  const add = (a, b) => a + b;

## 4) How does destructuring work?

A simple way to take values from objects or arrays into variables.
Example:
const person = { name: "Alice", age: 25 };
const { name, age } = person;
const numbers = [10, 20, 30];
const [first, second] = numbers;

## 5) What are template literals? How are they different from string concatenation?

Template literals are strings that use backticks (`).
We can add variables inside using ${} easily.
Can write multiple lines without \n.

Example:
const name = "John";
console.log(`Hello, ${name}!`);

