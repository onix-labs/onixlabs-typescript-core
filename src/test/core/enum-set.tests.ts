import { Assert, display, test } from "../../main/test";
import { Enum, EnumSet } from "../../main/core";
import { TestEnum } from "../mock-data";

export class EnumSetTests {

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
}
