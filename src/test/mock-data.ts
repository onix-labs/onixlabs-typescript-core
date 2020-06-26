import { Enum } from "../main/core";

export class TestEnum extends Enum {
    public static readonly ONE: TestEnum = new TestEnum(1, "ONE");
    public static readonly TWO: TestEnum = new TestEnum(2, "TWO");
}

export const TEST_ARRAY: number[] = [1, 2, 3];

export const TEST_OBJECT: object = { a: 123, b: "abc", c: [1, 2, 3], d: true, e: { x: 12.3, y: 45.6, z: 78.9 } };

export const TEST_SET: Set<string> = new Set(["a", "ab", "abc", "xyz", "xy", "x"]);

export const TEST_MAP: Map<string, object> = new Map([
    ["a", { a: 123, b: "abc", c: [1, 2, 3], d: true, e: { x: 12.3, y: 45.6, z: 78.9 } }],
    ["b", { a: 456, b: "xyz", c: [4, 5, 6], d: true, e: { x: 23.4, y: 45.6, z: 99.9 } }]
]);

export class A { }
export class B extends A { }
export class C extends B { }

export interface Person {
    firstName: string;
    lastName: string;
    birthday: Date;
}
