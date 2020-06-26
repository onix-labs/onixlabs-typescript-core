import { Assert, display, test } from "../../main/test";
import { Comparable } from "../../main/core";
import { TestEnum } from "../mock-data";

export class ComparableTests {

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
}
