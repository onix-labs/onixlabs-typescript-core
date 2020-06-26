import { Assert, display, test } from "../../main/test";
import { Prototype, Constructor, Type } from "../../main/core";
import { C, B, A } from "../mock-data";

export class TypeTests {

    @test([], Array, Array.prototype, "Array", true, false)
    @test({}, Object, Object.prototype, "Object", false, false)
    @test(0, Number, Number.prototype, "Number", false, false)
    @test("", String, String.prototype, "String", false, false)
    @test(true, Boolean, Boolean.prototype, "Boolean", false, false)
    @test(/[A-Z]/, RegExp, RegExp.prototype, "RegExp", false, false)
    @test(() => undefined, Function, Function.prototype, "Function", false, true)
    @display("Type.constructor should construct a type.")
    public type_constructor(
        literal: Prototype<unknown>,
        constructor: Constructor<unknown>,
        prototype: Prototype<unknown>,
        name: string,
        isArray: boolean,
        isCallable: boolean): void {
        const type: Type<unknown> = Type.from(literal);
        Assert.isEqual(constructor, type.getConstructor());
        Assert.isEqual(prototype, type.prototype);
        Assert.isEqual(name, type.name);
        Assert.isEqual(isArray, type.isArray);
        Assert.isEqual(isCallable, type.isCallable);
    }

    @test(Type.from(123), Type.from(45.6), true)
    @test(Type.from(123), Type.from("abc"), false)
    @display("Type.equals should produce the expected result.")
    public type_equals(a: Type<unknown>, b: Type<unknown>, expected: boolean): void {
        const actual: boolean = a.equals(b);
        Assert.isEqual(expected, actual);
    }

    @test({}, Object)
    @test(12, Number)
    @test("", String)
    @test([1], Array)
    @test(true, Boolean)
    @test(() => undefined, Function)
    @display("Type.getConstructor should produce the expected result.")
    public type_getConstructor(a: Prototype<unknown>, expected: Type<unknown>): void {
        const actual: Constructor<unknown> = Type.from(a).getConstructor();
        Assert.isEqual(expected, actual);
    }

    @test()
    @display("Type.getConstructorHierarchy should produce the expected result.")
    public type_getConstructorHierarchy(): void {
        const expected: Constructor[] = [C, B, A, Object];
        const actual: Constructor[] = Type.from(new C()).getConstructorHierarchy();
        Assert.isOrderedArrayEquals(expected, actual);
    }

    @test()
    @display("Type.getConstructorNameHierarchy should produce the expected result.")
    public type_getConstructorNameHierarchy(): void {
        const expected: string[] = ["C", "B", "A", "Object"];
        const actual: string[] = Type.from(new C()).getConstructorNameHierarchy();
        Assert.isOrderedArrayEquals(expected, actual);
    }

    @test({}, "Object")
    @test(12, "Number")
    @test("", "String")
    @test([1], "Array")
    @test(true, "Boolean")
    @test(() => undefined, "Function")
    @display("Type.toString should produce the expected result.")
    public type_toString(value: Prototype<unknown>, expected: string): void {
        const actual: string = Type.from(value).toString();
        Assert.isEqual(expected, actual);
    }

    @test(null, true)
    @test(undefined, false)
    @test({}, false)
    @display("Type.isNull should produce the expected result.")
    public type_isNull(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isNull(value);
        Assert.isEqual(expected, actual);
    }

    @test(undefined, true)
    @test(null, false)
    @test({}, false)
    @display("Type.isUndefined should produce the expected result.")
    public type_isUndefined(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isUndefined(value);
        Assert.isEqual(expected, actual);
    }

    @test(undefined, true)
    @test(null, true)
    @test({}, false)
    @display("Type.isNullOrUndefined should produce the expected result.")
    public type_isNullOrUndefined(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isNullOrUndefined(value);
        Assert.isEqual(expected, actual);
    }

    @test("abc", String, false)
    @test(12345, Number, false)
    @test(1234n, BigInt, false)
    @test(false, Boolean, false)
    @test(Symbol(), Symbol, false)
    @test(new String(), String, true)
    @test(new String(), Number, false)
    @test(new String(), Object, true)
    @test(new Number(), Number, true)
    @test(new Number(), String, false)
    @test(new Number(), Object, true)
    @test(new Boolean(), Boolean, true)
    @test(new Boolean(), Number, false)
    @test(new Boolean(), Object, true)
    @test(new Function(), Function, true)
    @test(() => undefined, Function, true)
    @test(new A(), A, true)
    @test(new B(), B, true)
    @test(new C(), C, true)
    @test(new A(), Object, true)
    @test(new B(), Object, true)
    @test(new C(), Object, true)
    @display("Type.isInstanceOfType should produce the expected result.")
    public type_isInstanceOfType(value: unknown, constructor: Constructor<any>, expected: boolean): void {
        const actual: boolean = Type.isInstanceOfType(value, constructor);
        Assert.isEqual(expected, actual);
    }

    @test("abc", String, true)
    @test(12345, Number, true)
    @test(1234n, BigInt, true)
    @test(false, Boolean, true)
    @test(Symbol(), Symbol, true)
    @test(new String(), String, false)
    @test(new String(), Number, false)
    @test(new String(), Object, false)
    @test(new Number(), Number, false)
    @test(new Number(), String, false)
    @test(new Number(), Object, false)
    @test(new Boolean(), Boolean, false)
    @test(new Boolean(), Number, false)
    @test(new Boolean(), Object, false)
    @test(new Function(), Function, false)
    @test(() => undefined, Function, false)
    @test(new A(), A, false)
    @test(new B(), B, false)
    @test(new C(), C, false)
    @test(new A(), Object, false)
    @test(new B(), Object, false)
    @test(new C(), Object, false)
    @display("Type.isPrimitiveOfType should produce the expected result.")
    public type_isPrimitiveOfType(value: unknown, constructor: Constructor<any>, expected: boolean): void {
        const actual: boolean = Type.isPrimitiveOfType(value, constructor);
        Assert.isEqual(expected, actual);
    }

    @test("abc", true)
    @test(12345, true)
    @test(1234n, true)
    @test(false, true)
    @test(Symbol(), true)
    @test(undefined, true)
    @test({}, false)
    @test([], false)
    @test(() => undefined, false)
    @test(new Array(), false)
    @test(new Object(), false)
    @test(new String(), false)
    @test(new Number(), false)
    @test(new Boolean(), false)
    @test(new Function(), false)
    @display("Type.isPrimitive should produce the expected result.")
    public type_isPrimitive(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isPrimitive(value);
        Assert.isEqual(expected, actual);
    }

    @test("abc", false)
    @test(12345, false)
    @test(1234n, false)
    @test(false, true)
    @test(Symbol(), false)
    @test(undefined, false)
    @test({}, false)
    @test([], false)
    @test(() => undefined, false)
    @test(new Array(), false)
    @test(new Object(), false)
    @test(new String(), false)
    @test(new Number(), false)
    @test(new Boolean(), true)
    @test(new Function(), false)
    @display("Type.isBoolean should produce the expected result.")
    public type_isBoolean(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isBoolean(value, true);
        Assert.isEqual(expected, actual);
    }

    @test("abc", false)
    @test(12345, true)
    @test(1234n, false)
    @test(false, false)
    @test(Symbol(), false)
    @test(undefined, false)
    @test({}, false)
    @test([], false)
    @test(() => undefined, false)
    @test(new Array(), false)
    @test(new Object(), false)
    @test(new String(), false)
    @test(new Number(), true)
    @test(new Boolean(), false)
    @test(new Function(), false)
    @display("Type.isNumber should produce the expected result.")
    public type_isNumber(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isNumber(value, true);
        Assert.isEqual(expected, actual);
    }

    @test("abc", false)
    @test(12345, false)
    @test(1234n, true)
    @test(false, false)
    @test(Symbol(), false)
    @test(undefined, false)
    @test({}, false)
    @test([], false)
    @test(() => undefined, false)
    @test(new Array(), false)
    @test(new Object(), false)
    @test(new String(), false)
    @test(new Number(), false)
    @test(new Boolean(), false)
    @test(new Function(), false)
    @display("Type.isBigInt should produce the expected result.")
    public type_isBigInt(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isBigInt(value, true);
        Assert.isEqual(expected, actual);
    }

    @test("abc", true)
    @test(12345, false)
    @test(1234n, false)
    @test(false, false)
    @test(Symbol(), false)
    @test(undefined, false)
    @test({}, false)
    @test([], false)
    @test(() => undefined, false)
    @test(new Array(), false)
    @test(new Object(), false)
    @test(new String(), true)
    @test(new Number(), false)
    @test(new Boolean(), false)
    @test(new Function(), false)
    @display("Type.isString should produce the expected result.")
    public type_isString(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isString(value, true);
        Assert.isEqual(expected, actual);
    }

    @test("abc", false)
    @test(12345, false)
    @test(1234n, false)
    @test(false, false)
    @test(Symbol(), true)
    @test(undefined, false)
    @test({}, false)
    @test([], false)
    @test(() => undefined, false)
    @test(new Array(), false)
    @test(new Object(), false)
    @test(new String(), false)
    @test(new Number(), false)
    @test(new Boolean(), false)
    @test(new Function(), false)
    @display("Type.isSymbol should produce the expected result.")
    public type_isSymbol(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isSymbol(value, true);
        Assert.isEqual(expected, actual);
    }

    @test("abc", false)
    @test(12345, false)
    @test(1234n, false)
    @test(false, false)
    @test(Symbol(), false)
    @test(undefined, false)
    @test({}, false)
    @test([], false)
    @test(() => undefined, true)
    @test(new Array(), false)
    @test(new Object(), false)
    @test(new String(), false)
    @test(new Number(), false)
    @test(new Boolean(), false)
    @test(new Function(), true)
    @test(Object.keys, true)
    @display("Type.isFunction should produce the expected result.")
    public type_isFunction(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isFunction(value);
        Assert.isEqual(expected, actual);
    }

    @test("abc", false)
    @test(12345, false)
    @test(1234n, false)
    @test(false, false)
    @test(Symbol(), false)
    @test(undefined, false)
    @test({}, true)
    @test([], true)
    @test(() => undefined, false)
    @test(new Array(), true)
    @test(new Object(), true)
    @test(new String(), true)
    @test(new Number(), true)
    @test(new Boolean(), true)
    @test(new Function(), false)
    @test(Object.keys, false)
    @display("Type.isObject should produce the expected result.")
    public type_isObject(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isObject(value);
        Assert.isEqual(expected, actual);
    }

    @test("abc", false)
    @test(12345, false)
    @test(1234n, false)
    @test(false, false)
    @test(Symbol(), false)
    @test(undefined, false)
    @test({}, false)
    @test([], true)
    @test(() => undefined, false)
    @test(new Array(), true)
    @test(new Object(), false)
    @test(new String(), false)
    @test(new Number(), false)
    @test(new Boolean(), false)
    @test(new Function(), false)
    @test(Object.keys, false)
    @display("Type.isArray should produce the expected result.")
    public type_isArray(value: unknown, expected: boolean): void {
        const actual: boolean = Type.isArray(value);
        Assert.isEqual(expected, actual);
    }
}
