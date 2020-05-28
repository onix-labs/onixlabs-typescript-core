import { test, display, Assert } from "../main/test";
import { TestEnum, TEST_OBJECT, TEST_ARRAY, TEST_MAP, TEST_SET, C, B, A, Person } from "./_mockdata";
import {
    Comparable,
    Equatable,
    NotImplementedError,
    InvalidArgumentError,
    InvalidOperationError,
    InvalidFormatError,
    OutOfRangeError,
    NotSupportedError,
    Constructor,
    Enum,
    EnumSet,
    Prototype,
    Type,
    MutableVersion,
    ObservableObject,
    Observable,
    PropertyChanged,
    Action2
} from "../main/core";

export class CoreTests {

    @test(TestEnum.ONE, TestEnum.TWO, -1)
    @test(TestEnum.TWO, TestEnum.TWO, 0)
    @test(TestEnum.TWO, TestEnum.ONE, 1)
    @display("Comparable.comparableCompare should produce the expected result.")
    public comparable_comparableCompare(a: Comparable, b: Comparable, expected: number): void {
        const actual: number = Comparable.comparableCompare(a, b);
        Assert.isEqual(expected, actual);
    }

    @test(TestEnum.ONE, TestEnum.TWO, -1)
    @test(TestEnum.TWO, TestEnum.TWO, 0)
    @test(TestEnum.TWO, TestEnum.ONE, 1)
    @display("Comparable.compare should produce the expected result.")
    public comparable_compare(a: TestEnum, b: TestEnum, expected: number): void {
        const actual: number = Comparable.compare(a, b, color => color.value);
        Assert.isEqual(expected, actual);
    }

    @test(TestEnum.ONE, TestEnum.ONE, true)
    @test(TestEnum.ONE, TestEnum.TWO, false)
    @display("Equatable.equatableEquals should produce the expected result.")
    public equatable_equatableEquals(a: Equatable, b: Equatable, expected: boolean): void {
        const actual: boolean = Equatable.equatableEquals(a, b);
        Assert.isEqual(expected, actual);
    }

    @test(123, 123, true)
    @test(123, 456, false)
    @test("abc", "abc", true)
    @test("abc", "xyz", false)
    @test(true, true, true)
    @test(true, false, false)
    @test([1, 2, 3], [1, 2, 3], true)
    @test([1, 2, 3], [4, 5, 6], false)
    @test(TEST_ARRAY, TEST_ARRAY, true)
    @test(TEST_OBJECT, TEST_OBJECT, true)
    @test(new Set([123, "abc"]), new Set([123, "abc"]), true)
    @test(new Set([123, "abc"]), new Set([456, "xyz"]), false)
    @test(new Map([[1, "abc"], [2, "xyz"]]), new Map([[1, "abc"], [2, "xyz"]]), true)
    @test(new Map([[1, "abc"], [2, "xyz"]]), new Map([[1, "xyz"], [2, "abc"]]), false)
    @test({ a: 123, b: "abc", c: [1, 2, 3], d: false }, { a: 123, b: "abc", c: [1, 2, 3], d: false }, true)
    @test({ a: 123, b: "abc", c: [1, 2, 3], d: false }, { a: 456, b: "abc", c: [1, 2, 3], d: true }, false)
    @display("Equatable.equals should produce the expected result.")
    public equatable_equals(a: unknown, b: unknown, expected: boolean): void {
        const actual: boolean = Equatable.equals(a, b);
        Assert.isEqual(expected, actual);
    }

    @test(123, 123, true)
    @test(123, 456, false)
    @test("abc", "abc", true)
    @test("abc", "xyz", false)
    @test(true, true, true)
    @test(true, false, false)
    @test(TEST_ARRAY, TEST_ARRAY, true)
    @test(TEST_OBJECT, TEST_OBJECT, true)
    @display("Equatable.valueEquals should produce the expected result.")
    public equatable_valueEquals(a: unknown, b: unknown, expected: boolean): void {
        const actual: boolean = Equatable.valueEquals(a, b);
        Assert.isEqual(expected, actual);
    }

    @test(TEST_OBJECT, TEST_OBJECT, true)
    @test({ a: 123, b: "abc", c: [1, 2, 3], d: false }, { a: 123, b: "abc", c: [1, 2, 3], d: false }, true)
    @test({ a: 123, b: "abc", c: [1, 2, 3], d: false }, { a: 456, b: "abc", c: [1, 2, 3], d: true }, false)
    @display("Equatable.objectEquals should produce the expected result.")
    public equatable_objectEquals(a: object, b: object, expected: boolean): void {
        const actual: boolean = Equatable.objectEquals(a, b);
        Assert.isEqual(expected, actual);
    }

    @test(TEST_MAP, TEST_MAP, true)
    @test(new Map([[1, "abc"], [2, "xyz"]]), new Map([[1, "abc"], [2, "xyz"]]), true)
    @test(new Map([[1, "abc"], [2, "xyz"]]), new Map([[1, "xyz"], [2, "abc"]]), false)
    @display("Equatable.mapEquals should produce the expected result.")
    public equatable_mapEquals(a: Map<unknown, unknown>, b: Map<unknown, unknown>, expected: boolean): void {
        const actual: boolean = Equatable.mapEquals(a, b);
        Assert.isEqual(expected, actual);
    }

    @test(TEST_SET, TEST_SET, true)
    @test(new Set([123, "abc"]), new Set([123, "abc"]), true)
    @test(new Set([123, "abc"]), new Set([456, "xyz"]), false)
    @display("Equatable.setEquals should produce the expected result.")
    public equatable_setEquals(a: Set<unknown>, b: Set<unknown>, expected: boolean): void {
        const actual: boolean = Equatable.setEquals(a, b);
        Assert.isEqual(expected, actual);
    }

    @test(TEST_ARRAY, TEST_ARRAY, true)
    @test([1, 2, 3], [1, 2, 3], true)
    @test([1, 2, 3], [1, 2, 4], false)
    @test([1, 2, 3], [3, 2, 1], false)
    @test([1, 2, 3], [4, 2, 1], false)
    @test([1, 2, 3, 3], [1, 2, 3, 3], true)
    @test([1, 2, 3, 3], [1, 2, 3, 4], false)
    @test([1, 2, 3, 3], [3, 2, 3, 1], false)
    @test([1, 2, 3, 3], [4, 2, 3, 1], false)
    @test(["a", "b", "c"], ["a", "b", "c"], true)
    @test(["a", "b", "c"], ["a", "b", "d"], false)
    @test(["a", "b", "c"], ["c", "b", "a"], false)
    @test(["a", "b", "c"], ["d", "b", "a"], false)
    @test(["a", "b", "c", "c"], ["a", "b", "c", "c"], true)
    @test(["a", "b", "c", "c"], ["a", "b", "c", "d"], false)
    @test(["a", "b", "c", "c"], ["c", "b", "c", "a"], false)
    @test(["a", "b", "c", "c"], ["d", "b", "c", "a"], false)
    @display("Equatable.orderedArrayEquals should produce the expected result.")
    public equatable_orderedArrayEquals(a: unknown[], b: unknown[], expected: boolean): void {
        const actual: boolean = Equatable.orderedArrayEquals(a, b);
        Assert.isEqual(expected, actual);
    }

    @test(TEST_ARRAY, TEST_ARRAY, true)
    @test([1, 2, 3], [1, 2, 3], true)
    @test([1, 2, 3], [1, 2, 4], false)
    @test([1, 2, 3], [3, 2, 1], true)
    @test([1, 2, 3], [4, 2, 1], false)
    @test([1, 2, 3, 3], [1, 2, 3, 3], true)
    @test([1, 2, 3, 3], [1, 2, 3, 4], false)
    @test([1, 2, 3, 3], [3, 2, 3, 1], true)
    @test([1, 2, 3, 3], [4, 2, 3, 1], false)
    @test(["a", "b", "c"], ["a", "b", "c"], true)
    @test(["a", "b", "c"], ["a", "b", "d"], false)
    @test(["a", "b", "c"], ["c", "b", "a"], true)
    @test(["a", "b", "c"], ["d", "b", "a"], false)
    @test(["a", "b", "c", "c"], ["a", "b", "c", "c"], true)
    @test(["a", "b", "c", "c"], ["a", "b", "c", "d"], false)
    @test(["a", "b", "c", "c"], ["c", "b", "c", "a"], true)
    @test(["a", "b", "c", "c"], ["d", "b", "c", "a"], false)
    @display("Equatable.unorderedArrayEquals should produce the expected result.")
    public equatable_unorderedArrayEquals(a: unknown[], b: unknown[], expected: boolean): void {
        const actual: boolean = Equatable.unorderedArrayEquals(a, b);
        Assert.isEqual(expected, actual);
    }

    @test(NotImplementedError, "NotImplementedError", "Not implemented.")
    @test(InvalidArgumentError, "InvalidArgumentError", "Invalid argument.")
    @test(InvalidOperationError, "InvalidOperationError", "Invalid operation.")
    @test(InvalidFormatError, "InvalidFormatError", "Invalid format.")
    @test(OutOfRangeError, "OutOfRangeError", "Out of range.")
    @test(NotSupportedError, "NotSupportedError", "Not supported.")
    @display("Custom error should produce the expected name and error message")
    public error_constructor(ctor: Constructor<Error>, name: string, message: string): void {
        const error: Error = Assert.throws(ctor, () => { throw new ctor(); });
        Assert.isEqual(name, error.name);
        Assert.isEqual(message, error.message);
    }

    @test(TestEnum.ONE, TestEnum.ONE, true)
    @test(TestEnum.ONE, TestEnum.TWO, false)
    @display("Enum.equals should produce the expected result.")
    public enum_equals(a: Enum, b: Enum, expected: boolean): void {
        const actual: boolean = a.equals(b);
        Assert.isEqual(expected, actual);
    }

    @test(TestEnum.TWO, TestEnum.ONE, 1)
    @test(TestEnum.ONE, TestEnum.ONE, 0)
    @test(TestEnum.ONE, TestEnum.TWO, -1)
    @display("Enum.compareTo should produce the expected result.")
    public enum_compareTo(a: Enum, b: Enum, expected: number): void {
        const actual: number = a.compareTo(b);
        Assert.isEqual(expected, actual);
    }

    @test(TestEnum.ONE, "ONE")
    @test(TestEnum.TWO, "TWO")
    @display("Enum.toString should produce the expected result.")
    public enum_toString(e: Enum, expected: string): void {
        const actual: string = e.toString();
        Assert.isEqual(expected, actual);
    }

    @test()
    @display("Enum.getAll should get all entries from an enumeration.")
    public enum_getAll(): void {
        const expected: TestEnum[] = [TestEnum.ONE, TestEnum.TWO];
        const actual: TestEnum[] = TestEnum.getAll();
        Assert.isUnorderedArrayEquals(expected, actual);
    }

    @test("ONE", TestEnum.ONE)
    @test("TWO", TestEnum.TWO)
    @display("Enum.fromName should get the correct entry from an enumeration.")
    public enum_fromName(name: string, expected: Enum): void {
        const actual: TestEnum = TestEnum.fromName(name)!;
        Assert.isEqual(expected, actual);
    }

    @test(1, TestEnum.ONE)
    @test(2, TestEnum.TWO)
    @display("Enum.fromValue should get the correct entry from an enumeration.")
    public enum_fromValue(value: number, expected: Enum): void {
        const actual: TestEnum = TestEnum.fromValue(value)!;
        Assert.isEqual(expected, actual);
    }

    @test()
    @display("EnumSet.constructor should construct an enum set.")
    public enumSet_constructor(): void {
        const set: EnumSet<TestEnum> = new EnumSet(TestEnum.ONE, TestEnum.TWO, TestEnum.TWO);
        const expected: TestEnum[] = [TestEnum.ONE, TestEnum.TWO];
        const actual: TestEnum[] = set.toArray();
        Assert.isUnorderedArrayEquals(expected, actual);
    }

    @test(new EnumSet<TestEnum>(TestEnum.ONE), new EnumSet<TestEnum>(TestEnum.ONE), true)
    @test(new EnumSet<TestEnum>(TestEnum.ONE), new EnumSet<TestEnum>(TestEnum.TWO), false)
    @test(new EnumSet<TestEnum>(TestEnum.ONE, TestEnum.TWO), new EnumSet<TestEnum>(TestEnum.TWO, TestEnum.ONE), true)
    @test(new EnumSet<TestEnum>(TestEnum.ONE, TestEnum.TWO), new EnumSet<TestEnum>(TestEnum.TWO, TestEnum.TWO), false)
    @display("EnumSet.equals should produce the expected result.")
    public enumSet_equals(a: EnumSet<Enum>, b: EnumSet<Enum>, expected: boolean): void {
        const actual: boolean = a.equals(b);
        Assert.isEqual(expected, actual);
    }

    @test()
    @display("EnumSet.toArray should be produce the expected array.")
    public enumSet_toArray(): void {
        const set: EnumSet<TestEnum> = new EnumSet(TestEnum.TWO, TestEnum.TWO, TestEnum.ONE);
        const expected: TestEnum[] = [TestEnum.ONE, TestEnum.TWO];
        const actual: TestEnum[] = set.toArray();
        Assert.isOrderedArrayEquals(expected, actual);
    }

    @test()
    @display("EnumSet.toString should be produce the expected string.")
    public enumSet_toString(): void {
        const set: EnumSet<TestEnum> = new EnumSet(TestEnum.TWO, TestEnum.TWO, TestEnum.ONE);
        const expected: string = "ONE, TWO";
        const actual: string = set.toString();
        Assert.isEqual(expected, actual);
    }

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

    @test()
    @display("Version.constructor should construct a version.")
    public version_constructor(): void {
        const version: MutableVersion = new MutableVersion(1, 2, 3);
        const expected: string = "1.2.3";
        const actual: string = version.toString();
        Assert.isEqual(expected, actual);
    }

    @test(new MutableVersion(0, 0, 2), new MutableVersion(0, 0, 1), 1)
    @test(new MutableVersion(0, 0, 1), new MutableVersion(0, 0, 1), 0)
    @test(new MutableVersion(0, 0, 1), new MutableVersion(0, 0, 2), -1)
    @test(new MutableVersion(0, 2, 0), new MutableVersion(0, 1, 0), 1)
    @test(new MutableVersion(0, 1, 0), new MutableVersion(0, 1, 0), 0)
    @test(new MutableVersion(0, 1, 0), new MutableVersion(0, 2, 0), -1)
    @test(new MutableVersion(2, 0, 0), new MutableVersion(1, 0, 0), 1)
    @test(new MutableVersion(1, 0, 0), new MutableVersion(1, 0, 0), 0)
    @test(new MutableVersion(1, 0, 0), new MutableVersion(2, 0, 0), -1)
    @display("Version.compareTo should produce the expected result.")
    public version_compareTo(a: MutableVersion, b: MutableVersion, expected: number): void {
        const actual: number = a.compareTo(b);
        Assert.isEqual(expected, actual);
    }

    @test(new MutableVersion(1, 2, 3), new MutableVersion(1, 2, 3), true)
    @test(new MutableVersion(1, 2, 3), new MutableVersion(2, 3, 4), false)
    @display("Version.equals should produce the expected result.")
    public version_equals(a: MutableVersion, b: MutableVersion, expected: boolean): void {
        const actual: boolean = a.equals(b);
        Assert.isEqual(expected, actual);
    }

    @test(new MutableVersion(1, 0, 0), "1.0.0")
    @test(new MutableVersion(1, 2, 3), "1.2.3")
    @display("Version.toString should produce the expected result.")
    public version_toString(version: MutableVersion, expected: string): void {
        const actual: string = version.toString();
        Assert.isEqual(expected, actual);
    }

    @test("1.0.0", new MutableVersion(1, 0, 0))
    @test("1.2.3", new MutableVersion(1, 2, 3))
    @display("Version.parse should produce the expected result.")
    public version_parse(version: string, expected: MutableVersion): void {
        const actual: MutableVersion = MutableVersion.parse(version);
        Assert.isEqual(expected, actual);
    }

    @test()
    @display("Observable.equals should produce the expected result.")
    public observable_equals(): void {
        const a: ObservableObject<Person> = Observable.fromObject({
            firstName: "John",
            lastName: "Smith",
            birthday: new Date(Date.parse("2000-05-01T00:00:00Z"))
        });

        const b: ObservableObject<Person> = Observable.fromObject({
            firstName: "John",
            lastName: "Smith",
            birthday: new Date(Date.parse("2000-05-01T00:00:00Z"))
        });

        const result: boolean = a.equals(b);

        Assert.isTrue(result);
    }

    @test()
    @display("Observable.subscribe should subscribe an observer.")
    public observable_subscribe(): void {
        const expected: string[] = ["Jack"];
        const actual: string[] = [];
        const observer: Action2<PropertyChanged<String, unknown>, Person> = update => {
            actual.push(update.newValue as string);
        };

        const observable: ObservableObject<Person> = Observable.fromObject({
            firstName: "John",
            lastName: "Smith",
            birthday: new Date(Date.parse("2000-05-01T00:00:00Z"))
        });

        observable.subscribe(observer);
        observable.firstName = "Jack";

        Assert.isEqual(expected, actual);
    }

    @test()
    @display("Observable.unsubscribe should unsubscribe an observer.")
    public observable_unsubscribe(): void {
        const expected: string[] = ["Jack"];
        const actual: string[] = [];
        const observer: Action2<PropertyChanged<String, unknown>, Person> = update => {
            actual.push(update.newValue as string);
        };

        const observable: ObservableObject<Person> = Observable.fromObject({
            firstName: "John",
            lastName: "Smith",
            birthday: new Date(Date.parse("2000-05-01T00:00:00Z"))
        });

        observable.subscribe(observer);
        observable.firstName = "Jack";

        observable.unsubscribe(observer);
        observable.firstName = "John";

        Assert.isEqual(expected, actual);
    }

    @test()
    @display("Observable.unsubscribeAll should unsubscribe an observer.")
    public observable_unsubscribeAll(): void {
        const expected: string[] = ["Jack"];
        const actual: string[] = [];
        const observer: Action2<PropertyChanged<String, unknown>, Person> = update => {
            actual.push(update.newValue as string);
        };

        const observable: ObservableObject<Person> = Observable.fromObject({
            firstName: "John",
            lastName: "Smith",
            birthday: new Date(Date.parse("2000-05-01T00:00:00Z"))
        });

        observable.subscribe(observer);
        observable.firstName = "Jack";

        observable.unsubscribeAll();
        observable.firstName = "John";

        Assert.isEqual(expected, actual);
    }
}