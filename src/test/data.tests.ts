import { display, test, Assert } from "../main/test";
import { Pair } from "../main/data";

export class DataTests {

    @display("Pair.equals should return true when pairs are equal.")
    @test(new Pair("key", "value"), new Pair("key", "value"))
    @test(new Pair(123, true), new Pair(123, true))
    @test(new Pair("key", { a: 123, b: false, c: [1, 2, 3] }), new Pair("key", { a: 123, b: false, c: [1, 2, 3] }))
    public pairEqualsShouldReturnTrueWhenPairsAreEqual(a: Pair<any, any>, b: Pair<any, any>): void {
        const actual: boolean = a.equals(b);
        Assert.isTrue(actual);
    }

    @display("Pair.equals should return false when pairs are not equal.")
    @test(new Pair("key", "abc"), new Pair("key", "cba"))
    @test(new Pair(123, true), new Pair(321, false))
    @test(new Pair("key", { a: 123, b: false, c: [1, 2, 3] }), new Pair("key", { a: 321, b: true, c: [3, 2, 1] }))
    public pairEqualsShouldReturnFalseWhenPairsAreNotEqual(a: Pair<any, any>, b: Pair<any, any>): void {
        const actual: boolean = a.equals(b);
        Assert.isFalse(actual);
    }
}