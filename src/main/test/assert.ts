import { AssertionError } from ".";
import { Equatable, Func2, Type, Constructor } from "../core";

export class Assert {
    public static fail(message: string): void {
        throw new AssertionError(`Assertion failed. ${message}`);
    }

    public static isEqual(expected: any, actual: any): void {
        if (!Equatable.equals(expected, actual)) {
            throw new AssertionError(`Assert.isEqual failed. '${expected}' and '${actual}' are not equal.`);
        }
    }

    public static isNotEqual(expected: any, actual: any): void {
        if (Equatable.equals(expected, actual)) {
            throw new AssertionError(`Assert.isNotEqual failed. '${expected}' and '${actual}' are equal.`);
        }
    }

    public static isEquatableEqual<T extends Equatable<T>>(expected: T, actual: T): void {
        if (!Equatable.equatableEquals(expected, actual)) {
            throw new AssertionError(`Assert.isEquatableEqual failed. '${expected}' and '${actual}' are not equal.`);
        }
    }

    public static isNotEquatableEqual<T extends Equatable<T>>(expected: T, actual: T): void {
        if (Equatable.equatableEquals(expected, actual)) {
            throw new AssertionError(`Assert.isNotEquatableEqual failed. '${expected}' and '${actual}' are equal.`);
        }
    }

    public static isOrderedArrayEquals<T>(expected: T[], actual: T[], comparer: Func2<T, T, boolean> = Equatable.equals): void {
        if (!Equatable.orderedArrayEquals(expected, actual, comparer)) {
            throw new AssertionError(`Assert.isOrderedArrayEquals failed. '${expected}' and '${actual}' are not equal.`);
        }
    }

    public static isNotOrderedArrayEquals<T>(expected: T[], actual: T[], comparer: Func2<T, T, boolean> = Equatable.equals): void {
        if (Equatable.orderedArrayEquals(expected, actual, comparer)) {
            throw new AssertionError(`Assert.isNotOrderedArrayEquals failed. '${expected}' and '${actual}' are equal.`);
        }
    }

    public static isUnorderedArrayEquals<T>(expected: T[], actual: T[], comparer: Func2<T, T, boolean> = Equatable.equals): void {
        if (!Equatable.unorderedArrayEquals(expected, actual, comparer)) {
            throw new AssertionError(`Assert.isUnorderedArrayEquals failed. '${expected}' and '${actual}' are not equal.`);
        }
    }

    public static isNotUnorderedArrayEquals<T>(expected: T[], actual: T[], comparer: Func2<T, T, boolean> = Equatable.equals): void {
        if (Equatable.unorderedArrayEquals(expected, actual, comparer)) {
            throw new AssertionError(`Assert.isNotUnorderedArrayEquals failed. '${expected}' and '${actual}' are equal.`);
        }
    }

    public static isNull(actual: any): void {
        if (!Type.isNull(actual)) {
            throw new AssertionError(`Assert.isNull failed. The value is not null.`);
        }
    }

    public static isNotNull(actual: any): void {
        if (Type.isNull(actual)) {
            throw new AssertionError(`Assert.isNotNull failed. The value is null.`);
        }
    }

    public static isUndefined(actual: any): void {
        if (!Type.isUndefined(actual)) {
            throw new AssertionError(`Assert.isUndefined failed. The value is not undefined.`);
        }
    }

    public static isNotUndefined(actual: any): void {
        if (Type.isUndefined(actual)) {
            throw new AssertionError(`Assert.isNotUndefined failed. The value is undefined.`);
        }
    }

    public static isNullOrUndefined(actual: any): void {
        if (!Type.isNullOrUndefined(actual)) {
            throw new AssertionError(`Assert.isNullOrUndefined failed. The value is not null or undefined.`);
        }
    }

    public static isNotNullOrUndefined(actual: any): void {
        if (Type.isNullOrUndefined(actual)) {
            throw new AssertionError(`Assert.isNotNullOrUndefined failed. The value is null or undefined.`);
        }
    }

    public static isTrue(actual: boolean): void {
        if (!actual) {
            throw new AssertionError(`Assert.isTrue failed. The value is false.`);
        }
    }

    public static isFalse(actual: boolean): void {
        if (actual) {
            throw new AssertionError(`Assert.isFalse failed. The value is true.`);
        }
    }

    public static isPrimitiveOfType(actual: any, ctor: Constructor): void {
        if (!Type.isPrimitiveOfType(actual, ctor)) {
            throw new AssertionError(`Assert.isPrimitiveOfType failed. The value is not a literal of type '${ctor.name}'.`);
        }
    }

    public static isNotPrimitiveOfType(actual: any, type: Constructor): void {
        if (Type.isPrimitiveOfType(actual, type)) {
            throw new AssertionError(`Assert.isNotPrimitiveOfType failed. The value is a literal of type '${type.name}'.`);
        }
    }

    public static isInstanceOfType(actual: any, ctor: Constructor): void {
        if (!Type.isInstanceOfType(actual, ctor)) {
            throw new AssertionError(`Assert.isInstanceOfType failed. The value is not an instance of type '${ctor.name}'.`);
        }
    }

    public static isNotInstanceOfType(actual: any, ctor: Constructor): void {
        if (Type.isInstanceOfType(actual, ctor)) {
            throw new AssertionError(`Assert.isNotInstanceOfType failed. The value is an instance of type '${ctor.name}'.`);
        }
    }

    public static throws<T extends Error>(ctor: Constructor<T>, action: () => unknown): T {
        try {
            action();
            throw new AssertionError(`Assert.throws failed. The function did not throw an error.`);
        } catch (error) {
            if (error instanceof AssertionError) {
                throw error;
            }
            if (!(error instanceof ctor)) {
                throw new AssertionError(`Assert.throws failed. Expected '${ctor.name}' but got '${error.name}' instead.`);
            }
            return error;
        }
    }
}
