![ONIX Labs](https://raw.githubusercontent.com/onix-labs/onix-labs.github.io/master/content/logo/master_full_md.png)

# TypeScript Core

The TypeScript Core library provides powerful, general-purpose APIs to TypeScript developers. TypeScript has become increasingly popular with JavaScript, web and NodeJS application developers. The objective of this framework is to provide a comprehensive type system and API surface making it easier to build and test applications with TypeScript.

## Setup

### Install

The framework uses NPM to set up development dependencies, such as TypeScript and TSLint. Before running any NPM tasks, the dependencies will need to be installed.

```
$ npm i
```

### Build

The following command will build the TypeScript `main` and `test` sources.
```
$ npm run build
```

### Test

The following command will execute the unit tests, which are driven from the framework's own unit testing framework.

```
$ npm run test
```

## Core API

The Core API provides several enhancements over the TypeScript type system, as well as a comprehensive set of general-purpose APIs which are used throughout the rest of the framework.

### Optional&lt;T&gt;

Represents an optional type; that is, a type that can be assigned `T` or `undefined`.

```typescript
const a: Optional<number> = 123;
const b: Optional<number> = undefined;
const c: Optional<number>;
```

---

### Nullable&lt;T&gt;

Represents a nullable type; that is, a type that can be assigned `T` or `null`.

```typescript
const a: Nullable<number> = 123;
const b: Nullable<number> = null;
```

**NOTE: Prefer `Optional<T>` over `Nullable<T>` to align with TypeScript and JavaScript defaults.**

---

### Indexed&lt;T&gt;

Represents a type that can be indexed using a numeric index, like an array, where `T` represents the value type at each index, and defaults to `unknown`.

```typescript
const a: Indexed<string> = ["Alice", "Bob", "Charlie"];
const b: Indexed = ["Alice", 123, true];
```

---

### Mapped&lt;T&gt;

Represents a type that can be mapped using a string key, like an object, map or dictionary, where `T` represents the value type at each key, and defaults to `unknown`.

```typescript
const a: Mapped<string> = { a: "Alice", b: "Bob", c: "Charlie" };
const b: Mapped = { a: "Alice", b: 123, c: true };
```

---

### Constructor&lt;T&gt;

Represents a type constructor, rather than a primitive, prototype or instance, where `T` represents the constructor type and defaults to `unknown`.

```typescript
const a: Constructor<Number> = Number;
const b: Constructor = Boolean;

const x: Constructor<Number> = 123; // Not allowed!
const y: Constructor = false; // Not allowed!
```

**NOTE: There are use-cases for `Constructor<any>` however it is generally advised not to use `any` with the `Constructor<T>` type, since this will also allow primitives, prototypes and instances.**

---

### Prototype&lt;T&gt;

Represents a prototype, including primitives and instances that derive from the prototype, where `T` represents the type and defaults to `unknown`.

```typescript
const a: Prototype<number> = 123;
const b: Prototype = false;

const x: Prototype<number> = Number; // Not allowed!
```

**NOTE: There are use-cases for `Prototype<any>` or `Prototype<unknown>` however it is generally advised not to use `any` or `unknown` types with the `Prototype<T>` type, since this will also allow type constructors.**

---

### Func&lt;R&gt;

Represents a function with any number of arguments, where `R` represents the function return type.

```typescript
const a: Func<string> = (first: string, last: string): string => `${first} ${last}`;
```

---

### Func0&lt;R&gt; ... Func8&lt;T1, T2, T3, T4, T5, T6, T7, T8, R&gt;

Represents functions with zero to eight arguments, where `R` represents the function return type.

```typescript
const a: Func0<string> = (): string => "Hello, World!";
const b: Func2<number, number, number> = (a: number, b: number): number => a + b;
```

---

### Action

Represents a function with any number of arguments, where the function return type is `void`.

```typescript
const a: Action = (name: string): void => console.log(`Hello, ${name}!`);
```

---

### Action0 ... Action8&lt;T1, T2, T3, T4, T5, T6, T7, T8&gt;

Represents functions with zero to eight arguments, where the function return type is `void`.

```typescript
const a: Action2<string, string> = (first: string, last: string): void => {
    console.log(`Hello, ${first} ${last}.`);
};
```

---

### Observer&lt;S, D&gt;

Represents a function that acts as an observer to an observable, where `S` represents the observable (subject) and `D` represents the data being observed.

---

### ObservableObject&lt;T, P&gt;

Represents an object whose properties can be observed for changes, where `T` represents the underlying object type and `P` represents the property value type at each key, and defaults to `unknown`.

```typescript
interface Person {
    firstName: string;
    lastName: string;
    birthday: Date;
}

const a: ObservableObject<Person> = Observable.fromObject({
    firstName: "John",
    lastName: "Smith",
    birthday: new Date(Date.parse("1950-01-17T00:00:00Z"))
});

a.subscribe(prop => {
    console.log(`Prop ${prop.key} changed from ${prop.oldValue} to ${prop.newValue}`);
});

a.firstName = "Jack";
a.lastName = "Jones";
```

---

