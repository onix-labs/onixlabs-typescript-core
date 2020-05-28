import { Func1, Type, Equatable, Func2 } from "./core";

export abstract class Validator<T> {

    public abstract isValid(subject: T): boolean;
}

export class PredicateValidator<T> extends Validator<T> {

    public constructor(private readonly predicate: Func1<T, boolean>) {
        super();
    }

    public isValid(subject: T): boolean {
        return this.predicate(subject);
    }
}

export class BooleanValidator extends PredicateValidator<boolean> {
    public constructor(value: boolean) {
        super(subject => subject === value);
    }
}

export class RangeValidator extends Validator<number> {

    public constructor(
        private readonly minimum: number,
        private readonly maximum: number,
        private readonly exclusive: boolean = false) {
        super();
    }

    public isValid(subject: number): boolean {
        return this.exclusive
            ? subject > this.minimum && subject < this.maximum
            : subject >= this.minimum && subject <= this.maximum;
    }
}

export class GreaterThanValidator extends PredicateValidator<number> {
    public constructor(value: number) {
        super(subject => subject > value);
    }
}

export class GreaterThanOrEqualToValidator extends PredicateValidator<number> {
    public constructor(value: number) {
        super(subject => subject >= value);
    }
}

export class LessThanValidator extends PredicateValidator<number> {
    public constructor(value: number) {
        super(subject => subject < value);
    }
}

export class LessThanOrEqualToValidator extends PredicateValidator<number> {
    public constructor(value: number) {
        super(subject => subject <= value);
    }
}

export class UndefinedValidator<T = unknown> extends PredicateValidator<T> {
    public constructor() {
        super(subject => Type.isUndefined(subject));
    }
}

export class NotUndefinedValidator<T = unknown> extends PredicateValidator<T> {
    public constructor() {
        super(subject => !Type.isUndefined(subject));
    }
}

export class NullValidator<T = unknown> extends PredicateValidator<T> {
    public constructor() {
        super(subject => Type.isNull(subject));
    }
}

export class NotNullValidator<T = unknown> extends PredicateValidator<T> {
    public constructor() {
        super(subject => !Type.isNull(subject));
    }
}

export class NullOrUndefinedValidator<T = unknown> extends PredicateValidator<T> {
    public constructor() {
        super(subject => Type.isNullOrUndefined(subject));
    }
}

export class NotNullOrUndefinedValidator<T = unknown> extends PredicateValidator<T> {
    public constructor() {
        super(subject => !Type.isNullOrUndefined(subject));
    }
}

export class EqualToValidator<T = unknown> extends PredicateValidator<T> {
    public constructor(value: T, equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => equalityFunction(subject, value));
    }
}

export class NotEqualToValidator<T = unknown> extends PredicateValidator<T> {
    public constructor(value: T, equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => !equalityFunction(subject, value));
    }
}

export class EqualToAnyValidator<T = unknown> extends PredicateValidator<T> {
    public constructor(values: T[], equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => values.some(other => equalityFunction(subject, other)));
    }
}

export class NotEqualToAnyValidator<T = unknown> extends PredicateValidator<T> {
    public constructor(values: T[], equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => !values.some(other => !equalityFunction(subject, other)));
    }
}

export class ContainsAnyValidator<T = unknown> extends PredicateValidator<T[]> {
    public constructor(values: T[], equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => subject.some(left => values.some(right => equalityFunction(left, right))));
    }
}

export class NotContainsAnyValidator<T = unknown> extends PredicateValidator<T[]> {
    public constructor(values: T[], equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => !subject.some(left => values.some(right => equalityFunction(left, right))));
    }
}

export class ContainsAllValidator<T = unknown> extends PredicateValidator<T[]> {
    public constructor(values: T[], equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => subject.every(left => values.some(right => equalityFunction(left, right))));
    }
}

export class NotContainsAllValidator<T = unknown> extends PredicateValidator<T[]> {
    public constructor(values: T[], equalityFunction: Func2<T, T, boolean> = Equatable.equals) {
        super(subject => !subject.every(left => values.some(right => equalityFunction(left, right))));
    }
}

export class MinimumLengthValidator extends PredicateValidator<string | unknown[]> {
    public constructor(minimum: number, exclusive: boolean = false) {
        super(subject => exclusive ? subject.length > minimum : subject.length >= minimum);
    }
}

export class MaximumLengthValidator extends PredicateValidator<string | unknown[]> {
    public constructor(maximum: number, exclusive: boolean = false) {
        super(subject => exclusive ? subject.length < maximum : subject.length <= maximum);
    }
}

export class LengthValidator extends Validator<string | unknown[]> {

    public constructor(
        private readonly minimum: number,
        private readonly maximum: number,
        private readonly exclusive: boolean = false) {
        super();
    }

    public isValid(subject: string | unknown[]): boolean {
        return this.exclusive
            ? subject.length > this.minimum && subject.length < this.maximum
            : subject.length >= this.minimum && subject.length <= this.maximum;
    }
}

export class RegexValidator extends PredicateValidator<string> {
    public constructor(regex: RegExp) {
        super(subject => regex.test(subject));
    }
}

export class LuhnValidator extends Validator<string> {
    public isValid(value: string): boolean {
        let result: number = 0;
        value
            .toString()
            .split("")
            .map(n => Number(n))
            .filter(n => n >= 0 && n <= 9)
            .reverse()
            .map((n, i) => n * (Math.floor(i % 2) === 0 ? 1 : 2))
            .forEach(n => result += Math.floor(n / 10 + n % 10));

        return value !== void 0
            && value !== null
            && value !== ""
            && result % 10 === 0;
    }
}
