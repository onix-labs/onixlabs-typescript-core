/**
 * The symbol used to refer to the observers of an observable.
 */
const OBSERVERS: unique symbol = Symbol();

/**
 * The symbol used to refer to observerables of a notify dispatcher.
 */
const OBSERVABLES: unique symbol = Symbol();

/**
 * The symbol used to refer to a template in an observable object.
 */
const TEMPLATE: unique symbol = Symbol();

/**
 * Represents an optional type; that is, a type that can be assigned undefined.
 */
export type Optional<T> = T | undefined;

/**
 * Represents a nullable type; that is, a type that can be assigned null.
 */
export type Nullable<T> = T | null;

/**
 * Represents a type that can be indexed using a number, like an array.
 */
export type Indexed<T = unknown> = object & { [index: number]: T };

/**
 * Represents a type that can be mapped using a string, like an object.
 */
export type Mapped<T = unknown> = object & { [key: string]: T };

/**
 * Represents a type constructor, rather than a primitive, prototype or instance.
 */
export type Constructor<T = unknown> = Function & (new (...args: any[]) => T);

/**
 * Represents a prototype, including primitives and instances that derive from the prototype.
 */
export type Prototype<T = unknown> = T extends Constructor<unknown> ? never : T & {
    readonly constructor: Function;
    toString(): string;
};

/**
 * Represents a function with any number of arguments.
 */
export type Func<R> = (...args: any[]) => R;

/**
 * Represents a function with zero arguments.
 */
export type Func0<R> = () => R;

/**
 * Represents a function with one argument.
 */
export type Func1<T1, R> = (arg1: T1) => R;

/**
 * Represents a function with two arguments.
 */
export type Func2<T1, T2, R> = (arg1: T1, arg2: T2) => R;

/**
 * Represents a function with three arguments.
 */
export type Func3<T1, T2, T3, R> = (arg1: T1, arg2: T2, arg3: T3) => R;

/**
 * Represents a function with four arguments.
 */
export type Func4<T1, T2, T3, T4, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R;

/**
 * Represents a function with five arguments.
 */
export type Func5<T1, T2, T3, T4, T5, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => R;

/**
 * Represents a function with six arguments.
 */
export type Func6<T1, T2, T3, T4, T5, T6, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => R;

/**
 * Represents a function with seven arguments.
 */
export type Func7<T1, T2, T3, T4, T5, T6, T7, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => R;

/**
 * Represents a function with eight arguments.
 */
export type Func8<T1, T2, T3, T4, T5, T6, T7, T8, R> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => R;

/**
 * Represents a function with any number of arguments that returns void.
 */
export type Action = Func<void>;

/**
 * Represents a function with zero arguments that returns void.
 */
export type Action0 = Func0<void>;

/**
 * Represents a function with one argument that returns void.
 */
export type Action1<T1> = Func1<T1, void>;

/**
 * Represents a function with two arguments that returns void.
 */
export type Action2<T1, T2> = Func2<T1, T2, void>;

/**
 * Represents a function with three arguments that returns void.
 */
export type Action3<T1, T2, T3> = Func3<T1, T2, T3, void>;

/**
 * Represents a function with four argumetns that returns void.
 */
export type Action4<T1, T2, T3, T4> = Func4<T1, T2, T3, T4, void>;

/**
 * Represents a function with five arguments that returns void.
 */
export type Action5<T1, T2, T3, T4, T5> = Func5<T1, T2, T3, T4, T5, void>;

/**
 * Represents a function with six arguments that returns void.
 */
export type Action6<T1, T2, T3, T4, T5, T6> = Func6<T1, T2, T3, T4, T5, T6, void>;

/**
 * Represents a function with seven arguments that returns void.
 */
export type Action7<T1, T2, T3, T4, T5, T6, T7> = Func7<T1, T2, T3, T4, T5, T6, T7, void>;

/**
 * Represents a function with eight arguments that returns void.
 */
export type Action8<T1, T2, T3, T4, T5, T6, T7, T8> = Func8<T1, T2, T3, T4, T5, T6, T7, T8, void>;

/**
 * Represents an observer of an observable.
 */
export type Observer<S, D = undefined> = (data: D, subject: S) => void;

/**
 * Represents an observable object.
 */
export type ObservableObject<T, P = unknown> = T & Observable<T, PropertyChanged<string, P>> & {
    toObject(): T;
};

/**
 * Represents a key changed event.
 */
export interface KeyChanged<K> {
    readonly oldKey: K;
    readonly newKey: K;
}

/**
 * Represents a value changed event.
 */
export interface ValueChanged<V> {
    readonly oldValue: V;
    readonly newValue: V;
}

/**
 * Represents a property changed event.
 */
export interface PropertyChanged<K, V> {
    readonly key: K;
    readonly oldValue: V;
    readonly newValue: V;
}

/**
 * Represents an item added event.
 */
export interface ItemAdded<V> {
    readonly index: number;
    readonly value: V;
}

/**
 * Represents an item removed event.
 */
export interface ItemRemoved<V> {
    readonly index: number;
    readonly value: V;
}

/**
 * Represents an item moved event.
 */
export interface ItemMoved<V> {
    readonly oldIndex: number;
    readonly newIndex: number;
    readonly value: V;
}

/**
 * Defines a mechanism to compare objects for relative order.
 */
export abstract class Comparable<T = unknown> {

    /**
     * Prevents instances of this class from being created.
     */
    private constructor() {
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns a numeric value indicating the relative order of this object to the other object.
     */
    public abstract compareTo(other: T): number;

    /**
     * Compares two objects that implement Comparable.
     * @param left The left-hand-side object to compare.
     * @param right The right-hand-side object to compare.
     * @returns Returns a numeric value indicating the relative order of the left object to the right object.
     */
    public static comparableCompare<T extends Comparable<T>>(left: T, right: T): number {
        return left.compareTo(right);
    }

    /**
     * Selects a numeric value from the specified objects and compares them.
     * @param left The left-hand-side object to select and compare.
     * @param right The right-hand-side object to select and compare.
     * @param selector The selector function which selects a numeric value from the specified objects.
     * @returns Returns a numeric value indicating the relative order of the left object to the right object.
     */
    public static compare<T>(left: T, right: T, selector: Func1<T, number>): number {
        const lval: number = selector(left);
        const rval: number = selector(right);
        return lval === rval ? 0 : lval > rval ? 1 : -1;
    }
}

/**
 * Defines a mechanism to compare objects for equality.
 */
export abstract class Equatable<T = unknown> {

    /**
     * Prevents instances of this class from being created.
     */
    private constructor() {
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public abstract equals(other: T): boolean;

    /**
     * Compares two objects that implement Equatable.
     * @param a The first object to compare.
     * @param b The second object to compare.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public static equatableEquals<T extends Equatable<T>>(a: T, b: T): boolean {
        return a.equals(b);
    }

    /**
     * Compares the specified objects for eqaulity.
     * @param a The first object to compare.
     * @param b The second object to compare.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public static equals(a: unknown, b: unknown): boolean {
        if (a instanceof Map && b instanceof Map) {
            return Equatable.mapEquals(a, b);
        } else if (a instanceof Set && b instanceof Set) {
            return Equatable.setEquals(a, b);
        } else if (a instanceof Object && b instanceof Object) {
            return Equatable.objectEquals(a, b);
        }
        return Equatable.valueEquals(a, b);
    }

    /**
     * Compares values for equality. This is equivalent to calling Object.is.
     * @param a The first object to compare.
     * @param b The second object to compare.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public static valueEquals(a: any, b: any): boolean {
        return !!Object.is ? Object.is(a, b) : a === b ? a !== 0 || 1 / a === 1 / b : a !== a && b !== b;
    }

    /**
     * Compares objects for equality by comparing their keys and values.
     * @param a The first object to compare.
     * @param b The second object to compare.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public static objectEquals(a: any, b: any): boolean {
        const keys: Func1<object, string[]> = Object.getOwnPropertyNames;
        const symbols: Func1<object, symbol[]> = Object.getOwnPropertySymbols;
        return Equatable.valueEquals(a, b)
            || a !== undefined && b !== undefined
            && a !== null && b !== null
            && typeof a === "object"
            && typeof b === "object"
            && keys(a).length === keys(b).length
            && symbols(a).length === symbols(b).length
            && keys(a).every(key => Equatable.equals(a[key], b[key]))
            && symbols(a).every(symbol => Equatable.equals(a[symbol], b[symbol]));
    }

    /**
     * Compares maps for equality.
     * @param a The first map to compare.
     * @param b The second map to compare.
     * @returns Returns true if the maps are equal; otherwise, false.
     */
    public static mapEquals<K, V>(a: Map<K, V>, b: Map<K, V>): boolean {
        return a.size === b.size
            && Array.from(a.keys()).every(key => b.has(key) && Equatable.equals(a.get(key), b.get(key)));
    }

    /**
     * Compares sets for equality.
     * @param a The first set to compare.
     * @param b The second set to compare.
     * @returns Returns true if the sets are equal; otherwise, false.
     */
    public static setEquals<T>(a: Set<T>, b: Set<T>): boolean {
        return a.size === b.size && Array.from(a.values()).every(value => b.has(value));
    }

    /**
     * Compares arrays for equality with strict order.
     * @param a The first array to compare.
     * @param b The second array to compare.
     * @param comparer Determines how to compare each array element. The default is Equatable.equals.
     */
    public static orderedArrayEquals<T>(a: T[], b: T[], comparer: Func2<T, T, boolean> = Equatable.equals): boolean {
        if (a === b) return true;
        if (a === null || b === null) return false;
        if (a.length !== b.length) return false;
        for (let index: number = 0; index < a.length; index++) {
            if (!comparer(a[index], b[index])) return false;
        }
        return true;
    }

    /**
     * Compares arrays for equality with relaxed order.
     * @param a The first array to compare.
     * @param b The second array to compare.
     * @param comparer Determines how to compare each array element. The default is Equatable.equals.
     */
    public static unorderedArrayEquals<T>(a: T[], b: T[], comparer: Func2<T, T, boolean> = Equatable.equals): boolean {
        if (a === b) return true;
        if (a === null || b === null) return false;
        if (a.length !== b.length) return false;
        const copy: T[] = b.slice();
        for (const element of a) {
            for (let index: number = 0; index < copy.length; index++) {
                if (comparer(element, copy[index])) {
                    copy.splice(index, 1);
                    break;
                }
            }
        }
        return copy.length === 0;
    }
}

/**
 * Defines a mechanism to format an object.
 */
export abstract class Formattable<T> {

    /**
     * Prevents instances of this class from being created.
     */
    private constructor() {
    }

    /**
     * Formats the current object using the specified formatter.
     * @param formatter The formatter to format the current object.
     * @return Returns a string representation of the current object in the specified format.
     */
    public abstract format(formatter: Formatter<T>): string;
}

/**
 * Defines the base class for implementing formatting.
 */
export abstract class Formatter<T> {

    /**
     * Formats the specified value.
     * @param value The value to format.
     * @return Returns a formatted string representation of the specified value.
     */
    public abstract format(value: T): string;
}

/**
 * Represents an error that occurs when a function has not been implemented.
 */
export class NotImplementedError extends Error {

    /**
     * Creates a new instance of this class.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Not implemented.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}

/**
 * Represents an error that occurs when an argument is invalid.
 */
export class InvalidArgumentError extends Error {

    /**
     * Creates a new instance of this class.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Invalid argument.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}

/**
 * Represents an error that occurs when an operation is invalid.
 */
export class InvalidOperationError extends Error {

    /**
     * Creates a new instance of this class.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Invalid operation.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}

/**
 * Represents an error that occurs when a format is invalid.
 */
export class InvalidFormatError extends Error {

    /**
     * Creates a new instance of this class.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Invalid format.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}

/**
 * Represents an error that occurs when a value is out of range.
 */
export class OutOfRangeError extends Error {

    /**
     * Creates a new instance of this class.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Out of range.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}

/**
 * Represents an error that occurs when an operation or feature is not supported.
 */
export class NotSupportedError extends Error {

    /**
     * Creates a new instance of this class.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Not supported.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}

/**
 * Represents the base class for implementing enumerations.
 */
export abstract class Enum implements Equatable<Enum>, Comparable<Enum> {

    /**
     * Creates a new instance of this class.
     * @param value The value of the Enum instance.
     * @param name The name of the Enum instance.
     */
    protected constructor(public readonly value: number, public readonly name: string) {
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: Enum): boolean {
        return Equatable.equals(this, other);
    }

    /**
     * Compares two objects that implement Comparable.
     * @param other The other object to compare with this object.
     * @returns Returns a numeric value indicating the relative order of the left object to the right object.
     */
    public compareTo(other: Enum): number {
        return Comparable.compare(this, other, enumeration => enumeration.value);
    }

    /**
     * Returns a string representing this object.
     * @returns Returns a string representing this object.
     */
    public toString(): string {
        return this.name;
    }

    /**
     * Gets all Enum instances from this enumeration.
     * @returns Returns an array containing all Enum instances in this enumeration.
     */
    public static getAll<T extends Enum>(): T[] {
        const enumeration: Mapped<any> = this;
        return Object
            .keys(enumeration)
            .filter(name => enumeration[name] instanceof this)
            .map(name => enumeration[name]);
    }

    /**
     * Gets an enumeration by name, or undefined if the enumeration does not exist.
     * @param name The name of the enumeration to get.
     * @returns Returns an enumeration, or undefined if the enumeration does not exist.
     */
    public static fromName<T extends Enum>(name: string): Optional<T> {
        return this.getAll().filter(enumeration => enumeration.name === name)[0] as T;
    }

    /**
     * Gets an enumeration by value, or undefined if the enumeration does not exist.
     * @param value The value of the enumeration to get.
     * @returns Returns an enumeration, or undefined if the enumeration does not exist.
     */
    public static fromValue<T extends Enum>(value: number): Optional<T> {
        return this.getAll().filter(entry => entry.value === value)[0] as T;
    }
}

/**
 * Represents a set of Enum instances.
 */
export class EnumSet<T extends Enum> extends Set<T> implements Equatable<EnumSet<T>> {

    /**
     * Creates a new instance of this class.
     * @param items The Enum items to add to this set.
     */
    public constructor(...items: T[]) {
        super(items);
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: EnumSet<T>): boolean {
        return Equatable.equals(this, other);
    }

    /**
     * Gets the contents of this set as an array.
     * @returns Returns an array of Enum instances.
     */
    public toArray(): T[] {
        return Array
            .from(this.values())
            .sort(Comparable.comparableCompare);
    }

    /**
     * Returns a string representing this object.
     * @returns Returns a string representing this object.
     */
    public toString(): string {
        return this.toArray().join(", ");
    }

    /**
     * Performs the specified action when the item is present in the enum set.
     * @param item The item to find in the enum set.
     * @param action The action to perform when the item is present in the enum set.
     * @returns Returns this enum set.
     */
    public when(item: T, action: Action2<this, T>): this {
        if (this.has(item)) action(this, item);
        return this;
    }
}

/**
 * Specifies an enumeration that defines how properties are bound to an object.
 */
export class PropertyBinding extends Enum {

    /**
     * Defines properties that are bound directly to the object's instance.
     */
    public static readonly OWN: PropertyBinding = new PropertyBinding(1, "OWN");

    /**
     * Defines properties that are bound to the object's prototype.
     */
    public static readonly PROTOTYPE: PropertyBinding = new PropertyBinding(2, "PROTOTYPE");

    /**
     * Defines properties that are bound to the object's constructor.
     */
    public static readonly CONSTRUCTOR: PropertyBinding = new PropertyBinding(3, "CONSTRUCTOR");

    /**
     * Defines properties that are callable.
     */
    public static readonly CALLABLE: PropertyBinding = new PropertyBinding(4, "CALLABLE");

    /**
     * Defines properties that are non-callable.
     */
    public static readonly NON_CALLABLE: PropertyBinding = new PropertyBinding(5, "NON_CALLABLE");

    /**
     * Defines properties that are inherited through the prototype chain.
     */
    public static readonly INHERITED: PropertyBinding = new PropertyBinding(6, "INHERITED");
}

/**
 * Represents type information that can be obtained from an instance or literal value.
 */
export class Type<T = unknown> implements Equatable<Type<T>> {

    /**
     * Gets information about the Object type.
     */
    public static get OBJECT(): Type<Object> {
        return new Type(new Object());
    }

    /**
     * Gets information about the array type.
     */
    public static get ARRAY(): Type<unknown[]> {
        return new Type(new Array());
    }

    /**
     * Gets information about the Boolean type.
     */
    public static get BOOLEAN(): Type<Boolean> {
        return new Type(new Boolean());
    }

    /**
     * Gets information about the Function type.
     */
    public static get FUNCTION(): Type<Function> {
        return new Type(new Function());
    }

    /**
     * Gets information about the Number type.
     */
    public static get NUMBER(): Type<Number> {
        return new Type(new Number());
    }

    /**
     * Gets information about the String type.
     */
    public static get STRING(): Type<String> {
        return new Type(new String());
    }

    public readonly prototype: Prototype<T>;
    public readonly name: string;
    public readonly isArray: boolean;
    public readonly isCallable: boolean;

    /**
     * Creates a new instance of this class.
     * @param prototype The underlying prototype or value from which to obtain type information.
     */
    private constructor(prototype: Prototype<T>) {
        this.prototype = Object.getPrototypeOf(prototype);
        this.name = this.prototype.constructor.name;
        this.isArray = Array.isArray(prototype);
        this.isCallable = Type.isFunction(prototype);
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: Type<T>): boolean {
        return Equatable.equals(this, other)
            || Equatable.equals(this.prototype, other.prototype)
            && Equatable.equals(this.getConstructor(), other.getConstructor());
    }

    /**
     * Gets the constructor function of the type.
     * @returns Returns the constructor function of the type.
     */
    public getConstructor(): Constructor<T> {
        return this.prototype.constructor as Constructor<T>;
    }

    /**
     * Gets the constructor function hierarchy of the type.
     * @return Returns the constructor function hierarchy of the type.
     */
    public getConstructorHierarchy(): Constructor[] {
        function getConstructorHierarchy(type: Constructor, hierarchy: Constructor[] = []): Constructor[] {
            return (type.name || Object.name) === Object.name
                ? [...hierarchy, Object]
                : [type, ...getConstructorHierarchy(Object.getPrototypeOf(type), hierarchy)];
        }

        return getConstructorHierarchy(this.getConstructor());
    }

    /**
     * Gets the constructor function name hierarchy.
     * @return Returns the constructor function name hierarchy.
     */
    public getConstructorNameHierarchy(): string[] {
        return this.getConstructorHierarchy().map(constructor => constructor.name);
    }

    /**
     * Returns a string representing this object.
     * @returns Returns a string representing this object.
     */
    public toString(): string {
        return this.name;
    }

    /**
     * Creates a Type instance from the specified prototype or value.
     * @param prototype The prototype or valur from which to construct a prototype.
     */
    public static from<T>(prototype: Prototype<T>): Type<T> {
        if (Type.isNullOrUndefined(prototype)) {
            throw new InvalidArgumentError("Cannot construct Type from null or undefined.");
        }

        return new Type(prototype);
    }

    /**
     * Determines whether the specified value is null.
     * @param value The value to determine is null.
     * @returns Returns true if the value is null; otherwise, false.
     */
    public static isNull(value: unknown): boolean {
        return value === null;
    }

    /**
     * Determines whether the specified value is undefined.
     * @param value The value to determine is undefined.
     * @returns Returns true if the value is undefined; otherwise, false.
     */
    public static isUndefined(value: unknown): boolean {
        return value === undefined;
    }

    /**
     * Determines whether the specified value is null or undefined.
     * @param value The value to determine is null or undefined.
     * @return Returns true if the value is null or undefined; otherwise, false.
     */
    public static isNullOrUndefined(value: unknown): boolean {
        return value === null || value === undefined;
    }

    /**
     * Determines whether the specified value is an instance of the specified type.
     * @param value The value to determine is an instance of the specified type.
     * @param constructor The constructor of the type.
     * @return Returns true if the value is an instance of the specified type; otherwise, false.
     */
    public static isInstanceOfType(value: unknown, constructor: Constructor<any>): boolean {
        return value instanceof constructor;
    }

    /**
     * Determines whether the specified value is a primitive of the specified type.
     * @param value The value to determine is a primitive of the specified type.
     * @param constructor The constructor of the type.
     * @return Returns true if the value is a primitive of the specified type; otherwise, false.
     */
    public static isPrimitiveOfType(value: unknown, constructor: Constructor<any>): boolean {
        const primitives: Mapped = {
            "string": String,
            "number": Number,
            "bigint": BigInt,
            "boolean": Boolean,
            "symbol": Symbol
        };
        const type: any = primitives[typeof value];
        return !Type.isNullOrUndefined(type) && type === constructor;
    }

    public static isPrimitive(value: unknown): boolean {
        const primitives: string[] = ["string", "number", "bigint", "boolean", "symbol", "undefined"];
        return primitives.includes(typeof value);
    }

    public static isBoolean(value: unknown, allowInstance: boolean = false): boolean {
        return typeof value === "boolean" || (allowInstance && value instanceof Boolean);
    }

    public static isNumber(value: unknown, allowInstance: boolean = false): boolean {
        return typeof value === "number" || (allowInstance && value instanceof Number);
    }

    public static isBigInt(value: unknown, allowInstance: boolean = false): boolean {
        return typeof value === "bigint" || (allowInstance && value instanceof BigInt);
    }

    public static isString(value: unknown, allowInstance: boolean = false): boolean {
        return typeof value === "string" || (allowInstance && value instanceof String);
    }

    public static isSymbol(value: unknown, allowInstance: boolean = false): boolean {
        return typeof value === "symbol" || (allowInstance && value instanceof Symbol);
    }

    public static isFunction(value: unknown): boolean {
        return typeof value === "function";
    }

    public static isObject(value: unknown): boolean {
        return typeof value === "object";
    }

    public static isArray(value: unknown): boolean {
        return Array.isArray(value);
    }
}

/**
 * Represents a version number.
 */
export class MutableVersion implements Comparable<MutableVersion>, Equatable<MutableVersion> {

    /**
     * Creates a new instance of this class.
     * @param major The major component of the version number.
     * @param minor The minor component of the version number.
     * @param patch The patch component of the version number.
     */
    public constructor(public major: number = 0, public minor: number = 0, public patch: number = 0) {
    }

    /**
     * Compares two objects that implement Comparable.
     * @param other The other object to compare with this object.
     * @returns Returns a numeric value indicating the relative order of the left object to the right object.
     */
    public compareTo(other: MutableVersion): number {
        if (this.major > other.major) return 1;
        if (this.major < other.major) return -1;
        if (this.minor > other.minor) return 1;
        if (this.minor < other.minor) return -1;
        if (this.patch > other.patch) return 1;
        if (this.patch < other.patch) return -1;
        return 0;
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: MutableVersion): boolean {
        return Equatable.equals(this, other);
    }

    /**
     * Returns a string representing this object.
     * @returns Returns a string representing this object.
     */
    public toString(): string {
        return `${this.major}.${this.minor}.${this.patch}`;
    }

    /**
     * Parses a string into a MutableVersion instance.
     * @param value The value to parse into a MutableVersion instance.
     * @returns Returns a new MutableVersion instance parsed from the specified value.
     */
    public static parse(value: string): MutableVersion {
        const values: number[] = value.split(".", 3).map(n => Number(n));
        return new MutableVersion(values[0], values[1], values[2]);
    }
}

/**
 * Represents an immutable, or readonly version.
 */
export type Version = Readonly<MutableVersion>;

/**
 * Represents a unique identifier.
 */
export class UniqueIdentifier implements Comparable<UniqueIdentifier>, Equatable<UniqueIdentifier> {

    /**
     * An empty unique identifier.
     * @returns Returns an empty unique identifier.
     */
    public static get EMPTY(): UniqueIdentifier {
        return new UniqueIdentifier();
    }

    /**
     * Creates a new instance of this class.
     * @param value The value of the unique identifier.
     */
    private constructor(private readonly value: number[] = Array.from({ length: 16 }, () => 0)) {
        Object.freeze(this);
    }

    /**
     * Compares two objects that implement Comparable.
     * @param other The other object to compare with this object.
     * @returns Returns a numeric value indicating the relative order of the left object to the right object.
     */
    public compareTo(other: UniqueIdentifier): number {
        function computeHash(values: number[]): number {
            const prime: number = 16777619;
            let hash: number = 2166136261;

            values.forEach(value => {
                hash ^= value;
                hash *= prime;
            });

            return hash;
        }

        return Comparable.compare(this, other, uid => computeHash(uid.value));
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: UniqueIdentifier): boolean {
        return Equatable.equals(this, other);
    }

    /**
     * Gets the value of this unique identifier as an array.
     * @returns Returns the value of this unique identifier as an array.
     */
    public toArray(): number[] {
        return this.value;
    }

    /**
     * Returns a string representing this object.
     * @returns Returns a string representing this object.
     */
    public toString(): string {
        const positions: number[] = [4, 6, 8, 10];
        const toHexByte: Func1<number, string> = (index: number) => ("0" + this.value[index].toString(16)).slice(-2);
        return this.value.map((_, index) => `${positions.includes(index) ? "-" : ""}${toHexByte(index)}`).join("");
    }

    /**
     * Generates a random version 4 unique identifier.
     * @returns Returns a random unique identifier.
     */
    public static random(): UniqueIdentifier {
        const value: number[] = Array.from({ length: 16 }, () => Math.floor(Math.random() * 255));

        value[6] &= 0x0F;
        value[6] |= 0x40;
        value[8] &= 0x3F;
        value[8] |= 0x80;

        return new UniqueIdentifier(value);
    }
}

/**
 * Represents the base class for implementing observables.
 */
export abstract class Observable<S, D = undefined> implements Equatable<Observable<S, D>> {
    private readonly [OBSERVERS]: Set<Observer<S, D>> = new Set();

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: Observable<S, D>): boolean {
        return Equatable.equals(this, other);
    }

    /**
     * Subscribes to this observable.
     * @param observer The observer which will receive subscription updates to this observable.
     */
    public subscribe(observer: Observer<S, D>): void {
        this[OBSERVERS].add(observer);
    }

    /**
     * Unsubscribes from this observable.
     * @param observer The observer which will no longer receive subscription updates to this observable.
     */
    public unsubscribe(observer: Observer<S, D>): void {
        this[OBSERVERS].delete(observer);
    }

    /**
     * Unsubscribes all observers from this observable.
     */
    public unsubscribeAll(): void {
        this[OBSERVERS].clear();
    }

    /**
     * Notifies all observers of an update to the state of this observable.
     * @param subject The sibject of the observable subscription update; usually the object generating the update.
     * @param data The subscription update data to be observed by all observers.
     */
    protected notify(subject: S, data: D): void {
        Array.from(this[OBSERVERS].values()).forEach(observer => observer(data, subject));
    }

    /**
     * Creates a new observable object from an object template.
     * @param template The template from which the observable object will be based.
     * @returns Returns a new observable object.
     */
    public static fromObject<T, P = unknown>(template: T): ObservableObject<T> {
        return new (class extends Observable<T, PropertyChanged<string, P>> {
            private readonly [TEMPLATE]: Mapped<P> = template as unknown as Mapped<P>;

            public constructor() {
                super();
                Object.keys(template).forEach(key => {
                    Object.defineProperty(this, key, {
                        configurable: false,
                        enumerable: true,
                        get: (): P => {
                            return this[TEMPLATE][key];
                        },
                        set: (newValue: P) => {
                            if (!Equatable.equals(this[TEMPLATE][key], newValue)) {
                                const oldValue: P = this[TEMPLATE][key];
                                this[TEMPLATE][key] = newValue;
                                this.notify(template, { key, oldValue, newValue });
                            }
                        }
                    });
                });
            }

            public toObject(): T {
                return this[TEMPLATE] as unknown as T;
            }
        })() as unknown as ObservableObject<T>;
    }
}

/**
 * Represents a dispatcher for objects that handle mutliple observables.
 */
export class NotifyDispatcher<S> {
    private readonly [OBSERVABLES]: Map<Observable<S, any>, Action2<S, any>> = new Map();

    /**
     * Creates a new instance of this class.
     * @param source The source of the observable subscription update; usually the object generating the update.
     */
    public constructor(private readonly source: S) {
    }

    /**
     * Creates a new observable and registers its notify function to the notify dispatcher.
     */
    public createObservable<D>(): Observable<S, D> {
        const observables: Map<Observable<S, D>, Action2<S, D>> = this[OBSERVABLES];
        return new (class extends Observable<S, D> {
            public constructor() {
                super();
                observables.set(this, this.notify);
            }
        })();
    }

    /**
     * Notifies all observers of an update to the state of the specified observable.
     * @param observable The observable whose observers will be notified of a subscription update.
     * @param data The subscription update data to be observed by all observers.
     */
    public notify<D>(observable: Observable<S, D>, data: D): void {
        this[OBSERVABLES].get(observable as Observable<S, D>)?.call(observable, this.source, data);
    }
}

/**
 * Represents a timer.
 */
export class Timer extends Observable<Timer> {
    private isRunning: boolean = false;

    /**
     * Starts the timer.
     * @param interval The interval between timer ticks in milliseconds.
     */
    public start(interval: number = 1000): void {
        if (!this.isRunning) {
            this.isRunning = true;
            (async () => {
                while (this.isRunning) {
                    this.notify(this, undefined);
                    await new Promise((resolve: () => void): number => setTimeout(resolve, interval));
                }
            })();
        }
    }

    /**
     * Stops the timer.
     */
    public stop(): void {
        this.isRunning = false;
    }

    /**
     * Starts a new timer.
     * @param interval The interval between timer ticks in milliseconds.
     * @param observer An observer which will receive subscription updates at regular intervals.
     * @returns Returns the newly created and started timer.
     */
    public static startNew(interval: number, observer: Observer<Timer>): Timer {
        const result: Timer = new Timer();
        result.subscribe(observer);
        result.start(interval);
        return result;
    }
}

/**
 * Represents a delay.
 */
export class Delay extends Observable<Delay> {
    private isRunning: boolean = false;

    /**
     * Starts the delay.
     * @param interval The interval in milliseconds before the delay raises a subscription update.
     */
    public start(timeout: number = 1000): void {
        if (!this.isRunning) {
            this.isRunning = true;
            (async () => {
                await new Promise((resolve: () => void): number => setTimeout(resolve, timeout));
                if (this.isRunning) this.notify(this, undefined);
            })();
        }
    }

    /**
     * Stops the delay.
     */
    public stop(): void {
        this.isRunning = false;
    }

    /**
     * Starts a new delay.
     * @param interval The interval in milliseconds before the delay raises a subscription update.
     * @param observer An observer which will receive a subscription update when the delay times out.
     * @returns Returns the newly created and started delay.
     */
    public static startNew(timeout: number, observer: Observer<Delay>): Delay {
        const result: Delay = new Delay();
        result.subscribe(observer);
        result.start(timeout);
        return result;
    }
}