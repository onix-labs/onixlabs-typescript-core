import { Assert, display, test } from "../../main/test";
import { Enum } from "../../main/core";
import { TestEnum } from "../mock-data";

export class EnumTests {

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
}
