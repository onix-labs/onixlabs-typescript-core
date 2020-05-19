import {
    Enum,
    Equatable,
    Flags,
    Func2,
    InvalidArgumentError,
    InvalidFormatError,
    InvalidOperationError,
    NotImplementedError,
    NotSupportedError,
    OutOfRangeError,
    Type,
    TypeInfo,
    Version,
    Comparable
} from "../main/core";
import { Assert, display, test } from "../main/test";
import { TextColor } from "../main/text";

export class CoreTests {

    @display("Thrown error should have the correct error type, name and message.")
    @test(NotImplementedError, "NotImplementedError", "Not implemented.")
    @test(InvalidArgumentError, "InvalidArgumentError", "Invalid argument.")
    @test(InvalidOperationError, "InvalidOperationError", "Invalid operation.")
    @test(InvalidFormatError, "InvalidFormatError", "Invalid format.")
    @test(OutOfRangeError, "OutOfRangeError", "Out of range.")
    @test(NotSupportedError, "NotSupportedError", "Not supported.")
    public thrownErrorShouldHaveCorrectTypeNameAndMessage(type: Type<Error>, name: string, message: string): void {
        const error: Error = Assert.throws(type, () => { throw new type(); });
        Assert.isInstanceOfType(error, type);
        Assert.isEqual(name, error.name);
        Assert.isEqual(message, error.message);
    }

    @display("Comparable.compare should produce the expected numeric order.")
    @test({ value: 1 }, { value: 1 }, 0)
    @test({ value: 1 }, { value: 2 }, -1)
    @test({ value: 2 }, { value: 1 }, 1)
    @test({ value: 123 }, { value: 123 }, 0)
    @test({ value: 123 }, { value: 456 }, -1)
    @test({ value: 456 }, { value: 123 }, 1)
    public comparableCompareShouldProduceExpectedNumericOrder(a: any, b: any, expected: number): void {
        const actual: number = Comparable.compare(a, b, o => o.value);
        Assert.isEqual(expected, actual);
    }

    @display("Equatable.equals should return true when value references are equal.")
    @test({ key: "test", value: 123 })
    @test(123)
    @test(NaN)
    @test("abc")
    @test(true)
    public equatableEqualsShouldReturnTrueWhenObjectReferencesAreEqual(a: any): void {
        const b: any = a;
        const actual: boolean = Equatable.equals(a, b);
        Assert.isTrue(actual);
    }

    @display("Equatable.equals should return true when values are equal.")
    @test(123, 123)
    @test("abc", "abc")
    @test(true, true)
    @test(NaN, NaN)
    public equatableEqualsShouldReturnTrueWhenValueReferencesAreNotEqual(a: any, b: any): void {
        const actual: boolean = Equatable.equals(a, b);
        Assert.isTrue(actual);
    }

    @display("Equatable.equatableEquals should return true when equatable values are equal.")
    @test(TextColor.BLACK, TextColor.BLACK)
    @test(Version.parse("1.2.3"), Version.parse("1.2.3"))
    @test(new TypeInfo(123), new TypeInfo(456))
    public equatableEquatableEqualsShouldReturnTrueWhenReferencesAreEqual(
        a: Equatable<any>, b: Equatable<any>): void {
        const actual: boolean = Equatable.equatableEquals(a, b);
        Assert.isTrue(actual);
    }

    @display("Equatable.equatableEquals should return false when equatable values are not equal.")
    @test(TextColor.BLACK, TextColor.WHITE)
    @test(Version.parse("1.2.3"), Version.parse("3.2.1"))
    @test(new TypeInfo(123), new TypeInfo("abc"))
    public equatableEquatableEqualsShouldReturnFalseWhenReferencesAreNotEqual(
        a: Equatable<any>, b: Equatable<any>): void {
        const actual: boolean = Equatable.equatableEquals(a, b);
        Assert.isFalse(actual);
    }

    @display("Equatable.orderedArrayEquals should return true when the arrays are identical.")
    @test([1, 2, 3], [1, 2, 3], Equatable.equals)
    @test(["a", "b", "c"], ["a", "b", "c"], Equatable.equals)
    @test([/[a-z]/, /[A-Z]/], [/[a-z]/, /[A-Z]/], Equatable.equals)
    public equatableOrderedArrayEqualsShouldReturnTrueWhenTheArraysAreIdentical(
        a: any[], b: any[], comparer: Func2<any, any, boolean>): void {
        const actual: boolean = Equatable.orderedArrayEquals(a, b, comparer);
        Assert.isTrue(actual);
    }

    @display("Equatable.orderedArrayEquals should return false when the arrays are not identical.")
    @test([1, 2, 3], [3, 2, 1], Equatable.equals)
    @test(["a", "b", "c"], ["c", "b", "a"], Equatable.equals)
    @test([/[a-z]/, /[A-Z]/], [/[A-Z]/, /[a-z]/], (a: any, b: any) => a.toString() === b.toString())
    public equatableOrderedArrayEqualsShouldReturnFalseWhenTheArraysAreNotIdentical(
        a: any[], b: any[], comparer: Func2<any, any, boolean>): void {
        const actual: boolean = Equatable.orderedArrayEquals(a, b, comparer);
        Assert.isFalse(actual);
    }

    @display("Equatable.unorderedArrayEquals should return true when the arrays are identical.")
    @test([1, 2, 3], [1, 2, 3], Equatable.equals)
    @test(["a", "b", "c"], ["a", "b", "c"], Equatable.equals)
    @test([/[a-z]/, /[A-Z]/], [/[a-z]/, /[A-Z]/], (a: any, b: any) => a.toString() === b.toString())
    public equatableUnorderedArrayEqualsShouldReturnTrueWhenTheArraysAreIdentical(
        a: any[], b: any[], comparer: Func2<any, any, boolean>): void {
        const actual: boolean = Equatable.unorderedArrayEquals(a, b, comparer);
        Assert.isTrue(actual);
    }

    @display("Equatable.unorderedArrayEquals should return true when the arrays are identical but unordered.")
    @test([1, 2, 3, 1], [3, 2, 1, 1], Equatable.equals)
    @test(["a", "b", "c", "a"], ["c", "b", "a", "a"], Equatable.equals)
    @test([/[a-z]/, /[A-Z]/], [/[A-Z]/, /[a-z]/], (a: any, b: any) => a.toString() === b.toString())
    public equatableUnorderedArrayEqualsShouldReturnTrueWhenTheArraysAreIdenticalButUnordered(
        a: any[], b: any[], comparer: Func2<any, any, boolean>): void {
        const actual: boolean = Equatable.unorderedArrayEquals(a, b, comparer);
        Assert.isTrue(actual);
    }

    @display("Equatable.unorderedArrayEquals should return false when the arrays are not identical.")
    @test([1, 2, 3], [3, 2, 1, 1], Equatable.equals)
    @test(["a", "b", "c"], ["c", "b", "a", "a"], Equatable.equals)
    @test([/[a-z]/], [/[A-Z]/, /[a-z]/], (a: any, b: any) => a.toString() === b.toString())
    public equatableUnorderedArrayEqualsShouldReturnFalseWhenTheArraysAreNotIdentical(
        a: any[], b: any[], comparer: Func2<any, any, boolean>): void {
        const actual: boolean = Equatable.unorderedArrayEquals(a, b, comparer);
        Assert.isFalse(actual);
    }

    @display("Enum.compareTo should produce the expected numeric order.")
    @test(TextColor.BLACK, TextColor.BLACK, 0)
    @test(TextColor.BLACK, TextColor.WHITE, -1)
    @test(TextColor.WHITE, TextColor.BLACK, 1)
    public enumCompareToShouldProduceTheExpectedNumericOrder(a: Enum, b: Enum, expected: number): void {
        const actual: number = a.compareTo(b);
        Assert.isEqual(expected, actual);
    }

    @display("Enum.equals should return true when enum values are equal.")
    @test(TextColor.BLACK, TextColor.BLACK)
    public enumEqualsShouldReturnTrueWhenEnumValuesAreEqual(a: Enum, b: Enum): void {
        const actual: boolean = a.equals(b);
        Assert.isTrue(actual);
    }

    @display("Enum.equals should return false when enum values are equal.")
    @test(TextColor.BLACK, TextColor.WHITE)
    public enumEqualsShouldReturnFalseWhenEnumValuesAreNotEqual(a: Enum, b: Enum): void {
        const actual: boolean = a.equals(b);
        Assert.isFalse(actual);
    }

    @display("Enum.toString should return the enum name.")
    @test(TextColor.BLACK, "BLACK")
    @test(TextColor.DARK_MAGENTA, "DARK_MAGENTA")
    @test(TextColor.LIGHT_YELLOW, "LIGHT_YELLOW")
    public enumToStringShouldReturnTheEnumName(a: Enum, expected: string): void {
        const actual: string = a.toString();
        Assert.isEqual(expected, actual);
    }

    @display("Enum.getAll should return all enum instances.")
    @test()
    public enumGetAllShouldReturnAllEnumInstances(): void {
        const actual: Enum[] = TextColor.getAll();
        const expected: Enum[] = [
            TextColor.BLACK, TextColor.DARK_BLUE, TextColor.DARK_CYAN, TextColor.DARK_GRAY,
            TextColor.DARK_GREEN, TextColor.DARK_MAGENTA, TextColor.DARK_RED, TextColor.DARK_YELLOW,
            TextColor.LIGHT_BLUE, TextColor.LIGHT_CYAN, TextColor.LIGHT_GRAY, TextColor.LIGHT_GREEN,
            TextColor.LIGHT_MAGENTA, TextColor.LIGHT_RED, TextColor.LIGHT_YELLOW, TextColor.WHITE
        ];

        Assert.isUnorderedArrayEquals(expected, actual, Equatable.equatableEquals);
    }

    @display("Enum.fromName should return an enum instance from its name.")
    @test("BLACK", TextColor.BLACK)
    @test("DARK_GREEN", TextColor.DARK_GREEN)
    public enumFromNameShouldReturnAnEnumInstanceFromItsName(name: string, expected: Enum): void {
        const actual: Enum = TextColor.fromName(name);
        Assert.isEqual(expected, actual);
    }

    @display("Enum.fromValue should return an enum instance from its value.")
    @test(0, TextColor.BLACK)
    @test(2, TextColor.DARK_GREEN)
    public enumFromNameShouldReturnAnEnumInstanceFromItsValue(value: number, expected: Enum): void {
        const actual: Enum = TextColor.fromValue(value);
        Assert.isEqual(expected, actual);
    }

    @display("Flags should construct a flag set.")
    @test()
    public flagsShouldConstructAFlagSet(): void {
        const expected: Enum[] = [TextColor.BLACK, TextColor.WHITE];
        const actual: Flags<TextColor> = new Flags(TextColor.BLACK, TextColor.WHITE);
        Assert.isUnorderedArrayEquals(expected, actual.toArray(), Equatable.equatableEquals);
    }

    @display("Flags.addFlag should add an enum to the flag set.")
    @test()
    public flagsAddFlagShouldAddAnEnumToTheFlagSet(): void {
        const expected: Enum[] = [TextColor.BLACK, TextColor.WHITE, TextColor.DARK_BLUE];
        const actual: Flags<TextColor> = new Flags(TextColor.BLACK, TextColor.WHITE);
        actual.add(TextColor.DARK_BLUE);
        Assert.isUnorderedArrayEquals(expected, actual.toArray(), Equatable.equatableEquals);
    }

    @display("Flags.removeFlag should remove an enum from the flag set.")
    @test()
    public flagsRemoveFlagShouldRemoveAnEnumFromTheFlagSet(): void {
        const expected: Enum[] = [TextColor.BLACK, TextColor.WHITE];
        const actual: Flags<TextColor> = new Flags(TextColor.BLACK, TextColor.WHITE, TextColor.DARK_BLUE);
        actual.delete(TextColor.DARK_BLUE);
        Assert.isUnorderedArrayEquals(expected, actual.toArray(), Equatable.equatableEquals);
    }

    @display("Flags.toString should correctly format a flag set.")
    @test()
    public flagsToStringShouldCorrectlyFormatAFlagSet(): void {
        const flags: Flags<TextColor> = new Flags(TextColor.WHITE, TextColor.BLACK, TextColor.DARK_BLUE);
        const expected: string = "BLACK, DARK_BLUE, WHITE";
        const actual: string = flags.toString();
        Assert.isEqual(expected, actual);
    }

    @display("TypeInfo should construct from a literal.")
    @test("", String, Object, "String", false, false)
    @test(0, Number, Object, "Number", false, false)
    @test(true, Boolean, Object, "Boolean", false, false)
    @test({}, Object, undefined, "Object", false, false)
    @test([], Array, Object, "Array", true, false)
    @test(/[a-z]/, RegExp, Object, "RegExp", false, false)
    @test(() => undefined, Function, Object, "Function", false, true)
    public typeInfoShouldConstructFromLiteral(
        literal: any,
        type: Type<any>,
        superType: Type<any>,
        name: string,
        isArray: boolean,
        isCallable: boolean): void {
        const typeInfo: TypeInfo<any> = new TypeInfo(literal);
        Assert.isEqual(type, typeInfo.type);
        Assert.isEqual(superType, typeInfo.superType);
        Assert.isEqual(name, typeInfo.type.name);
        Assert.isEqual(isArray, typeInfo.isArray);
        Assert.isEqual(isCallable, typeInfo.isCallable);
    }

    @display("TypeInfo should construct from an instance.")
    @test(new String(""), String, Object, "String", false, false)
    @test(new Number(0), Number, Object, "Number", false, false)
    @test(new Boolean(true), Boolean, Object, "Boolean", false, false)
    @test(new Object({}), Object, undefined, "Object", false, false)
    @test(new Array([]), Array, Object, "Array", true, false)
    @test(new RegExp(/[a-z]/), RegExp, Object, "RegExp", false, false)
    @test(new NotImplementedError(), NotImplementedError, Error, "NotImplementedError", false, false)
    @test(() => undefined, Function, Object, "Function", false, true)
    public typeInfoShouldConstructFromInstance(
        instance: any,
        type: Type<any>,
        superType: Type<any>,
        name: string,
        isArray: boolean,
        isCallable: boolean): void {
        const typeInfo: TypeInfo<any> = new TypeInfo(instance);
        Assert.isEqual(type, typeInfo.type);
        Assert.isEqual(superType, typeInfo.superType);
        Assert.isEqual(name, typeInfo.type.name);
        Assert.isEqual(isArray, typeInfo.isArray);
        Assert.isEqual(isCallable, typeInfo.isCallable);
    }
}