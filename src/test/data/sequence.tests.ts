import { Assert, display, test } from "../../main/test";
import { Sequence, NumericSequence } from "../../main/data";

export class SequenceTests {

    @test([1, 2, 3], [4, 5, 6], [1, 2, 3, 4, 5, 6])
    @test(["a", "b", "c"], ["d", "e", "f"], ["a", "b", "c", "d", "e", "f"])
    @display("Sequence.append should produce the expected result.")
    public sequence_append(a: unknown[], b: unknown[], expected: unknown[]): void {
        const actual: unknown[] = Sequence.from(a).append(...b).toArray();
        Assert.isOrderedArrayEquals(expected, actual);
    }

    @test(Sequence.ofNumeric(1, 2, 3, 4, 5, 6, 7, 8, 9), 5)
    @display("Sequence.average of a numeric sequence should produce the expected result.")
    public sequenceOfNumeric_average(sequence: NumericSequence, expected: number): void {
        const actual: number = sequence.average();
        Assert.isEqual(expected, actual);
    }

    @test(Sequence.of({ a: 1 }, { a: 2 }, { a: 3 }), 2)
    @display("Sequence.average of a non-numeric sequence should produce the expected result.")
    public sequenceOfNonNumeric_average(sequence: Sequence<{ a: number }>, expected: number): void {
        const actual: number = sequence.average(o => o.a);
        Assert.isEqual(expected, actual);
    }

    @test(Sequence.of(1, 2, 3), Sequence.of(4, 5, 6), Sequence.of(1, 2, 3, 4, 5, 6))
    @test(Sequence.of("a", "b", "c"), Sequence.of("d", "e", "f"), Sequence.of("a", "b", "c", "d", "e", "f"))
    @display("Sequence.concatenate should produce the expected result.")
    public sequence_concatenate(a: Sequence<unknown>, b: Sequence<unknown>, expected: Sequence<unknown>): void {
        const actual: Sequence<unknown> = a.concatenate(b);
        Assert.isOrderedArrayEquals(expected.toArray(), actual.toArray());
    }

    @test(Sequence.empty(), 0)
    @test(Sequence.of(10, 20, 30, 40, 50), 5)
    @test(Sequence.repeat(100, { a: "abc", b: 123, c: true }), 100)
    @display("Sequence.count should produce the expected result.")
    public sequence_count(sequence: Sequence<unknown>, expected: number): void {
        const actual: number = sequence.count();
        Assert.isEqual(expected, actual);
    }

    @test()
    @display("Sequence.count with a custom predicate should produce the expected result.")
    public sequence_countWithPredicate(): void {
        const expected: number = 5;
        const actual: number = Sequence.ofNumeric(1, 2, 3, 4, 5, 6, 7, 8, 9).count(o => o <= 5);
        Assert.isEqual(expected, actual);
    }

    @test(Sequence.of(1, 2, 3, 4, 5), Sequence.of(3, 4, 5, 6), Sequence.of(1, 2))
    @test(Sequence.of("a", "b", "c", "d", "e"), Sequence.of("d", "e", "f"), Sequence.of("a", "b", "c"))
    @display("Sequence.difference should produce the expected result.")
    public sequence_difference(a: Sequence<unknown>, b: Sequence<unknown>, expected: Sequence<unknown>): void {
        const actual: Sequence<unknown> = a.difference(b);
        Assert.isOrderedArrayEquals(expected.toArray(), actual.toArray());
    }

    @test(Sequence.of(1, 2, 2, 3, 4, 4, 5, 6), Sequence.of(1, 2, 3, 4, 5, 6))
    @test(Sequence.of("a", "b", "b", "c", "d", "d", "e"), Sequence.of("a", "b", "c", "d", "e"))
    @display("Sequence.distinct should produce the expected result.")
    public sequence_distinct(sequence: Sequence<unknown>, expected: Sequence<unknown>): void {
        const actual: Sequence<unknown> = sequence.distinct();
        Assert.isOrderedArrayEquals(expected.toArray(), actual.toArray());
    }

    @test(Sequence.of(1, 2, 3), Sequence.of(1, 2, 3), true)
    @test(Sequence.of(1, 2, 3), Sequence.of(3, 2, 1), false)
    @test(Sequence.of(1, 2, 3), Sequence.of(1, 2, 3, 4), false)
    @test(Sequence.of("a", "b", "c"), Sequence.of("a", "b", "c"), true)
    @test(Sequence.of("a", "b", "c"), Sequence.of("c", "b", "a"), false)
    @test(Sequence.of("a", "b", "c"), Sequence.of("a", "b", "c", "d"), false)
    @display("Sequence.equals should produce the expected result.")
    public sequence_equals(a: Sequence<unknown>, b: Sequence<unknown>, expected: boolean): void {
        const actual: boolean = a.equals(b);
        Assert.isEqual(expected, actual);
    }
}
