import { Equatable, Prototype, Constructor, InvalidArgumentError } from ".";
import { Keyed } from "./keyed";

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
        const primitives: Keyed = {
            "string": String,
            "number": Number,
            "bigint": BigInt,
            "boolean": Boolean,
            "symbol": Symbol
        };
        const type: any = primitives[typeof value];
        return !Type.isNullOrUndefined(type) && type === constructor;
    }

    /**
     * Determines whether the specified value is primitive.
     * @param value The value to determine is primitive.
     * @returns Returns true if the value is primitive; otherwise, false.
     */
    public static isPrimitive(value: unknown): boolean {
        const primitives: string[] = ["string", "number", "bigint", "boolean", "symbol", "undefined"];
        return primitives.includes(typeof value);
    }

    /**
     * Determines whether the specified value is boolean.
     * @param value The value to determine is boolean.
     * @param allowInstance Specifies whether to check for instances of the Boolean type, or primitives only.
     * @return Returns true if the value is boolean; otherwise, false.
     */
    public static isBoolean(value: unknown, allowInstance: boolean = false): boolean {
        return typeof value === "boolean" || (allowInstance && value instanceof Boolean);
    }

    /**
     * Determines whether the specified value is a number.
     * @param value The value to determine is a number.
     * @param allowInstance Specifies whether to check for instances of the Number type, or primitives only.
     * @return Returns true if the value is a number; otherwise, false.
     */
    public static isNumber(value: unknown, allowInstance: boolean = false): boolean {
        return typeof value === "number" || (allowInstance && value instanceof Number);
    }

    /**
     * Determines whether the specified value is a bigint.
     * @param value The value to determine is a bigint.
     * @param allowInstance Specifies whether to check for instances of the BigInt type, or primitives only.
     * @return Returns true if the value is a bigint; otherwise, false.
     */
    public static isBigInt(value: unknown, allowInstance: boolean = false): boolean {
        return typeof value === "bigint" || (allowInstance && value instanceof BigInt);
    }

    /**
     * Determines whether the specified value is a string.
     * @param value The value to determine is a string.
     * @param allowInstance Specifies whether to check for instances of the String type, or primitives only.
     * @return Returns true if the value is a string; otherwise, false.
     */
    public static isString(value: unknown, allowInstance: boolean = false): boolean {
        return typeof value === "string" || (allowInstance && value instanceof String);
    }

    /**
     * Determines whether the specified value is a symbol.
     * @param value The value to determine is a symbol.
     * @param allowInstance Specifies whether to check for instances of the Symbol type, or primitives only.
     * @return Returns true if the value is a symbol; otherwise, false.
     */
    public static isSymbol(value: unknown, allowInstance: boolean = false): boolean {
        return typeof value === "symbol" || (allowInstance && value instanceof Symbol);
    }

    /**
     * Determines whether the specified value is a function.
     * @param value The value to determine is a function.
     * @return Returns true if the value is a function; otherwise, false.
     */
    public static isFunction(value: unknown): boolean {
        return typeof value === "function";
    }

    /**
     * Determines whether the specified value is an object.
     * @param value The value to determine is an object.
     * @return Returns true if the value is an object; otherwise, false.
     */
    public static isObject(value: unknown): boolean {
        return typeof value === "object";
    }

    /**
     * Determines whether the specified value is an array.
     * @param value The value to determine is an array.
     * @return Returns true if the value is an array; otherwise, false.
     */
    public static isArray(value: unknown): boolean {
        return Array.isArray(value);
    }
}
