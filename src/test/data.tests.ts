import { test, display, Assert } from "../main/test";
import { ObservableObject, Pair, MutablePair, KeyChanged } from "../main/data";

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

    @display("MutablePair.equals should return true when pairs are equal.")
    @test(new MutablePair("key", "value"), new MutablePair("key", "value"))
    @test(new MutablePair(123, true), new MutablePair(123, true))
    @test(new MutablePair("key", { a: 123, b: false }), new MutablePair("key", { a: 123, b: false }))
    public mutablePairEqualsShouldReturnTrueWhenPairsAreEqual(
        a: MutablePair<any, any>, b: MutablePair<any, any>): void {
        const actual: boolean = a.equals(b);
        Assert.isTrue(actual);
    }

    @display("MutablePair.equals should return false when pairs are not equal.")
    @test(new MutablePair("key", "abc"), new MutablePair("key", "cba"))
    @test(new MutablePair(123, true), new MutablePair(321, false))
    @test(new MutablePair("key", { a: 123, b: false }), new MutablePair("key", { a: 321, b: true }))
    public mutablePairEqualsShouldReturnFalseWhenPairsAreNotEqual(
        a: MutablePair<any, any>, b: MutablePair<any, any>): void {
        const actual: boolean = a.equals(b);
        Assert.isFalse(actual);
    }

    @display("MutablePair should emit an event when the key changes.")
    @test()
    public mutablePairShouldEmitAnEventWhenTheKeyChanges(): void {
        const pair: MutablePair<string, string> = new MutablePair("oldKey", "value");
        pair.onKeyChanged.subscribe((_, data) => {
            Assert.isEqual("oldKey", data.oldKey);
            Assert.isEqual("newKey", data.newKey);
        });
        pair.key = "newKey";
    }

    @display("MutablePair should emit an event when the value changes.")
    @test()
    public mutablePairShouldEmitAnEventWhenTheValueChanges(): void {
        const pair: MutablePair<string, string> = new MutablePair("key", "oldValue");
        pair.onValueChanged.subscribe((_, data) => {
            Assert.isEqual("oldValue", data.oldValue);
            Assert.isEqual("newValue", data.newValue);
        });
        pair.value = "newValue";
    }
}