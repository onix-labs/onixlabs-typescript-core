import { Assert, display, test } from "../../main/test";
import { Equatable } from "../../main/core";
import { TestEnum, TEST_ARRAY, TEST_OBJECT, TEST_MAP, TEST_SET } from "../mock-data";

export class EquatableTests {

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
}
