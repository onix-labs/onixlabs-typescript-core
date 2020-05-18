/**
 * Represents a type that can be assigned undefined.
 */
export type Optional<T> = T | undefined;

/**
 * Represents a type that can be assigned null.
 */
export type Nullable<T> = T | null;

/**
 * Represents a type that can be indexed using a number.
 */
export type NumberIndexed<T = any> = {
    [index: number]: T;
};

/**
 * Represents a type that can be indexed using a string.
 */
export type StringIndexed<T = any> = {
    [index: string]: T;
};

/**
 * Represents a type constructor rather than a type literal or instance.
 */
export type Type<T = any> = {
    new(...args: any[]): T;
    readonly prototype: T;
    readonly name: string;
} & T;

/**
 * Represents a type literal or instance rather that a type constructor.
 */
export type Instance<T> = T extends Type<unknown> ? never : T;

/**
 * Represents a function with any number of arguments.
 */
export type Func<R> = (...args: any[]) => R;

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
 * Represents a function which listens to events from an event source.
 */
export type EventListener<S, D = void> = Action2<Readonly<S>, Readonly<D>>;

/**
 * Defines a mechanism for comparing object instances for sorting or ordering.
 */
export interface Comparable<T = any> {

    /**
     * Compares the current object instance with another object instance.
     * @param other The other object instance to compare with this instance.
     * @returns Returns a numeric value indicating the relative order of the objects being compared.
     */
    compareTo(other: Readonly<T>): number;
}

/**
 * Defines a mechanism for determining equality of object instances.
 */
export interface Equatable<T = any> {

    /**
     * Determines whether this object instance is equal to another object instance.
     * @param other The other object instance to compare wiht this instance.
     * @returns Returns true if this instance is equal to the other instance; otherwise, false.
     */
    equals(other: Readonly<T>): boolean;
}

/**
 * Defines a mechanism for formatting an object into a string representation.
 */
export interface Formattable<T> {

    /**
     * Formats this object instance into a string representation.
     * @param formatter The formatter to use to format this object instance.
     * @returns Returns a string representation of this object instance.
     */
    format(formatter?: Optional<Formatter<T>>): string;
}

/**
 * Defines a mechanism for providing a formatting implementation.
 */
export interface Formatter<T> {

    /**
     * Formats the specified value into a string representation.
     * @param value The value to format.
     * @returns Returns a string representation of the specified value.
     */
    format(value: Readonly<T>): string;
}

/**
 * Represents an error that occurs when a function has not been implemented.
 */
export class NotImplementedError extends Error {

    /**
     * Creates a new instance of this error.
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
     * Creates a new instance of this error.
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
     * Creates a new instance of this error.
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
     * Creates a new instance of this error.
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
     * Creates a new instance of this error.
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
     * Creates a new instance of this error.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Not supported.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}

export class Comparer {
    private constructor() {
    }

    public static compare<T>(left: T, right: T, selector: Func1<T, number>): number {
        const lValue: number = selector(left);
        const rValue: number = selector(right);
        return lValue === rValue ? 0 : lValue > rValue ? 1 : -1;
    }

    public static comparableCompare<T extends Comparable<T>>(left: T, right: T): number {
        return left.compareTo(right);
    }

    public static equals(a: any, b: any): boolean {
        if (TypeInfo.isNullOrUndefined(Object["is"])) {
            return a === b
                ? a !== 0 || 1 / a === 1 / b
                : a !== a && b !== b;
        }

        return Object.is(a, b);
    }

    public static equatableEquals<T extends Equatable<T>>(a: T, b: T): boolean {
        return a.equals(b);
    }

    public static orderedArrayEquals<T>(a: T[], b: T[], comparer: Func2<T, T, boolean> = Comparer.equals): boolean {
        if (a === b) return true;
        if (a === null || b === null) return false;
        if (a.length !== b.length) return false;
        for (let i: number = 0; i < a.length; i++) {
            if (!comparer(a[i], b[i])) return false;
        }
        return true;
    }

    public static unorderedArrayEquals<T>(a: T[], b: T[], comparer: Func2<T, T, boolean> = Comparer.equals): boolean {
        if (a === b) return true;
        if (a === null || b === null) return false;
        if (a.length !== b.length) return false;
        const copy: T[] = b.slice();
        for (const element of a) {
            for (let j: number = 0; j < copy.length; j++) {
                if (comparer(element, copy[j])) {
                    copy.splice(j, 1);
                    break;
                }
            }
        }
        return copy.length === 0;
    }
}

export abstract class Enum implements Equatable<Enum>, Comparable<Enum> {
    protected constructor(public readonly value: number, public readonly name: string) {
    }

    public compareTo(other: Enum): number {
        return Comparer.compare(this, other, enumeration => enumeration.value);
    }

    public equals(other: Readonly<Enum>): boolean {
        return Comparer.equals(this, other)
            || this.name === other.name
            && this.value === other.value;
    }

    public toString(): string {
        return this.name;
    }

    public static getAll<T extends Enum>(): T[] {
        const enumeration: any = this;
        return Object
            .getOwnPropertyNames(enumeration)
            .filter(name => TypeInfo.isInstanceOfType(enumeration[name], enumeration))
            .map(name => enumeration[name]);
    }

    public static fromName<T extends Enum>(name: string): T {
        const result: T = this.getAll().filter(entry => entry.name === name)[0] as T;
        if (!TypeInfo.isNullOrUndefined(result)) return result;
        throw new InvalidArgumentError(`Enum with name '${name}' not found in ${this.name}`);
    }

    public static fromValue<T extends Enum>(value: number): T {
        const result: T = this.getAll().filter(entry => entry.value === value)[0] as T;
        if (!TypeInfo.isNullOrUndefined(result)) return result;
        throw new InvalidArgumentError(`Enum value '${value}' not found in ${this.name}`);
    }
}

export class Flags<T extends Enum> extends Set<T> implements Equatable<Flags<T>> {

    public constructor(...flags: T[]) {
        super(flags);
    }

    public equals(other: Readonly<Flags<T>>): boolean {
        return Comparer.equals(this, other)
            || Comparer.unorderedArrayEquals(this.toArray(), other.toArray());
    }

    public toArray(): T[] {
        return Array.from(this.values());
    }

    public toString(): string {
        return this
            .toArray()
            .sort(Comparer.comparableCompare)
            .join(", ");
    }
}

export class PropertyBinding extends Enum {
    public static readonly OWN: PropertyBinding = new PropertyBinding(1, "OWN");
    public static readonly PROTOTYPE: PropertyBinding = new PropertyBinding(2, "PROTOTYPE");
    public static readonly STATIC: PropertyBinding = new PropertyBinding(3, "STATIC");
    public static readonly CALLABLE: PropertyBinding = new PropertyBinding(4, "CALLABLE");
    public static readonly NON_CALLABLE: PropertyBinding = new PropertyBinding(5, "NON_CALLABLE");
}

export class TypeInfo<T> implements Equatable<TypeInfo<T>> {
    public static get OBJECT(): TypeInfo<Object> {
        return new TypeInfo(new Object());
    }

    public static get ARRAY(): TypeInfo<any[]> {
        return new TypeInfo(new Array());
    }

    public static get BOOLEAN(): TypeInfo<Boolean> {
        return new TypeInfo(new Boolean());
    }

    public static get FUNCTION(): TypeInfo<Function> {
        return new TypeInfo(new Function());
    }

    public static get NUMBER(): TypeInfo<Number> {
        return new TypeInfo(new Number());
    }

    public static get STRING(): TypeInfo<String> {
        return new TypeInfo(new String());
    }

    public readonly type: Type<T>;
    public readonly superType: Optional<Type<any>>;
    public readonly isArray: boolean;
    public readonly isCallable: boolean;

    public constructor(private readonly value: Instance<T>) {

        if (TypeInfo.isNullOrUndefined(value)) {
            throw new InvalidArgumentError("Cannot construct TypeInfo from null or undefined.");
        }

        this.type = Object.getPrototypeOf(value).constructor;
        this.superType = this.getTypeHierarchy()[1];
        this.isArray = Array.isArray(value);
        this.isCallable = TypeInfo.isCallable(value);
    }

    public equals(other: Readonly<TypeInfo<T>>): boolean {
        return Comparer.equals(this, other)
            || Comparer.equals(this.type, other.type);
    }

    public getProperties(bindings: Flags<PropertyBinding>): PropertyInfo<T, any>[] {
        const result: PropertyInfo<T, any>[] = [];

        if (bindings.has(PropertyBinding.OWN)) {
            const target: any = this.value;
            const properties: string[] = Object.getOwnPropertyNames(target);
            this.getPropertiesFromMap(target, properties, bindings).forEach(property => result.push(property));
        }

        if (bindings.has(PropertyBinding.PROTOTYPE)) {
            const target: any = Object.getPrototypeOf(this.value);
            const properties: string[] = Object.getOwnPropertyNames(target);
            this.getPropertiesFromMap(target, properties, bindings).forEach(property => result.push(property));
        }

        if (bindings.has(PropertyBinding.STATIC)) {
            const target: any = Object.getPrototypeOf(this.value).constructor;
            const properties: string[] = Object.getOwnPropertyNames(target);
            this.getPropertiesFromMap(target, properties, bindings).forEach(property => result.push(property));
        }

        return result;
    }

    public getTypeHierarchy(): Type[] {
        function getTypeHierarchy(type: Type, hierarchy: Type[] = []): Type[] {
            return (type.name || Object.name) === Object.name
                ? [...hierarchy, Object]
                : [type, ...getTypeHierarchy(Object.getPrototypeOf(type), hierarchy)];
        }
        return getTypeHierarchy(this.type);
    }

    public getTypeNameHierarchy(): string[] {
        return this.getTypeHierarchy().map(type => type.name);
    }

    private getPropertiesFromMap(
        target: StringIndexed<any>,
        properties: string[],
        bindings: Flags<PropertyBinding>): PropertyInfo<T, any>[] {
        const result: PropertyInfo<T, any>[] = [];

        properties.forEach(property => {
            if (bindings.has(PropertyBinding.CALLABLE) && TypeInfo.isCallable(target[property])) {
                result.push(new PropertyInfo(property, bindings, this.value));
            }

            if (bindings.has(PropertyBinding.NON_CALLABLE) && !TypeInfo.isCallable(target[property])) {
                result.push(new PropertyInfo(property, bindings, this.value));
            }
        });

        return result;
    }

    public static isNull(value: any): boolean {
        return value === null;
    }

    public static isUndefined(value: any): boolean {
        return value === undefined;
    }

    public static isNullOrUndefined(value: any): boolean {
        return value === null || value === undefined;
    }

    public static isCallable(value: any): boolean {
        return !TypeInfo.isNullOrUndefined(value)
            && (typeof value === "function" || Object.prototype.toString.call(value) === "[object Function]");
    }

    public static isLiteralOfType(value: any, type: Type): boolean {
        const toString: Func<string> = Object.prototype.toString;
        return !TypeInfo.isNullOrUndefined(value)
            && toString.call(value) === toString.call(new type().valueOf());
    }

    public static isInstanceOfType(value: any, type: Type): boolean {
        return !TypeInfo.isNullOrUndefined(value) && value instanceof type;
    }

    public static tryCreate(value: any): Optional<TypeInfo<any>> {
        if (TypeInfo.isUndefined(value)) return undefined;
        if (TypeInfo.isNull(value)) return new TypeInfo({});
        return new TypeInfo(value);
    }
}

export class PropertyInfo<T, P> implements Equatable<PropertyInfo<T, P>> {
    public readonly declaringType: TypeInfo<T>;
    public readonly propertyType: Optional<TypeInfo<P>>;
    public readonly descriptor: TypedPropertyDescriptor<P>;

    public constructor(
        public readonly propertyName: string,
        public readonly bindings: Flags<PropertyBinding>,
        private readonly declaringValue: any) {
        this.declaringType = new TypeInfo(declaringValue);
        let target: any;

        if (bindings.has(PropertyBinding.OWN)) {
            target = declaringValue;
        } else if (bindings.has(PropertyBinding.PROTOTYPE)) {
            target = Object.getPrototypeOf(this.declaringValue);
        } else if (bindings.has(PropertyBinding.STATIC)) {
            target = Object.getPrototypeOf(declaringValue).constructor;
        } else {
            throw new InvalidOperationError(`Failed to obtain descriptor for '${this.propertyName}'.`);
        }

        this.descriptor = this.getPropertyDescriptorOrThrow(target);
        this.propertyType = TypeInfo.tryCreate(target[propertyName]);
    }

    public call(...args: any[]): any {
        if (this.propertyType?.isCallable) {
            const callable: Function = this.declaringValue[this.propertyName];
            return callable.call(this.declaringValue, ...args);
        }
    }

    public equals(other: Readonly<PropertyInfo<T, P>>): boolean {
        throw new Error("Method not implemented.");
    }

    private getPropertyDescriptorOrThrow(target: any): TypedPropertyDescriptor<P> {
        const result: Optional<TypedPropertyDescriptor<P>> = Object
            .getOwnPropertyDescriptor(target, this.propertyName);

        if (!result) throw new InvalidOperationError(`Failed to obtain descriptor for '${this.propertyName}'.`);

        return result;
    }
}

export class Version implements Equatable<Version> {
    public constructor(
        public readonly major: number = 0,
        public readonly minor: number = 0,
        public readonly patch: number = 0) {
        Object.freeze(this);
    }

    public equals(other: Readonly<Version>): boolean {
        return Comparer.equals(this, other)
            || (Comparer.equals(this.toString(), other.toString()));
    }

    public toString(): string {
        return `${this.major}.${this.minor}.${this.patch}`;
    }

    public static parse(value: string): Version {
        const values: number[] = value.split(".", 3).map(n => Number(n));
        return new Version(values[0], values[1], values[2]);
    }
}

export class Event<S, D = void> {
    private readonly eventListeners: EventListener<S, D>[] = [];

    public constructor(eventDispatcher: EventDispatcher<S>) {
        eventDispatcher.onDispatchEvent(this, (sender: S, data: D) => {
            this.eventListeners.forEach(eventListener => eventListener(sender, data));
        });
    }

    public addEventListener(eventListener: EventListener<S, D>): void {
        this.eventListeners.push(eventListener);
    }

    public removeEventListener(eventListener: EventListener<S, D>): void {
        const index: number = this.eventListeners.indexOf(eventListener);
        if (index > -1) this.eventListeners.splice(index, 1);
    }

    public removeAllEventListeners(): void {
        this.eventListeners.splice(1);
    }
}

export class EventDispatcher<S> {
    private readonly events: Map<Event<S, any>, Action2<S, any>> = new Map();

    public onDispatchEvent<D>(event: Event<S, D>, action: Action2<S, D>): void {
        this.events.set(event, action);
    }

    public dispatchEvent<D>(event: Event<S, D>, source: S, data: D): void {
        const action: Optional<Action2<S, any>> = this.events.get(event);
        if (action !== null && action !== undefined) {
            action(source, data);
        }
    }
}

export class Timer {
    private isRunning: boolean = false;
    private readonly dispatcher: EventDispatcher<Timer> = new EventDispatcher();
    public readonly onTick: Event<Timer> = new Event(this.dispatcher);

    public start(interval: number = 1000): void {
        if (!this.isRunning) {
            this.isRunning = true;
            (async () => {
                while (this.isRunning) {
                    this.dispatcher.dispatchEvent(this.onTick, this, undefined);
                    await new Promise((resolve: () => void): number => setTimeout(resolve, interval));
                }
            })();
        }
    }

    public stop(): void {
        this.isRunning = false;
    }

    public static startNew(interval: number, eventListener: EventListener<Timer>): Timer {
        const result: Timer = new Timer();
        result.onTick.addEventListener(eventListener);
        result.start(interval);
        return result;
    }
}

export class Delay {
    private isRunning: boolean = false;
    private readonly dispatcher: EventDispatcher<Delay> = new EventDispatcher();
    public readonly onTick: Event<Delay> = new Event(this.dispatcher);

    public start(timeout: number = 1000): void {
        if (!this.isRunning) {
            this.isRunning = true;
            (async () => {
                await new Promise((resolve: () => void): number => setTimeout(resolve, timeout));
                if (this.isRunning) this.dispatcher.dispatchEvent(this.onTick, this, undefined);
            })();
        }
    }

    public stop(): void {
        this.isRunning = false;
    }

    public static startNew(timeout: number, eventListener: EventListener<Delay>): Delay {
        const result: Delay = new Delay();
        result.onTick.addEventListener(eventListener);
        result.start(timeout);
        return result;
    }
}