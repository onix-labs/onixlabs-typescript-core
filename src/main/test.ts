import { Duration } from "./date";
import {
    Optional,
    Equatable,
    Func2,
    Type,
    Constructor,
    Enum,
    Mapped,
    Action,
    Action2,
    Observable,
    NotifyDispatcher,
    InvalidOperationError
} from "./core";

export class AssertionError extends Error {
    public constructor(message: Optional<string> = "Assertion failed.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}

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

export class TestStatus extends Enum {
    public static readonly PASSED: TestStatus = new TestStatus(1, "PASSED");
    public static readonly FAILED_ASSERTION: TestStatus = new TestStatus(2, "FAILED_ASSERTION");
    public static readonly FAILED_EXCEPTION: TestStatus = new TestStatus(3, "FAILED_EXCEPTION");
}

class TestEntry {
    public displayName: string;

    public constructor(
        public readonly target: object,
        public readonly propertyKey: string,
        public readonly args: any[][] = []) {
        this.displayName = propertyKey;
    }

    public execute(testArgs: any[] = []): void {
        const instance: Mapped<Action> = Object.create(this.target);
        instance[this.propertyKey].apply(instance, testArgs);
    }

    public static createTestEntryKey(target: object, propertyKey: string): string {
        return `${target.constructor.name}_${propertyKey}`;
    }
}

export class TestExecutionResult {
    public constructor(
        public readonly target: object,
        public readonly propertyKey: string,
        public readonly displayName: string,
        public readonly duration: Duration,
        public readonly status: TestStatus,
        public readonly error?: Error,
        public readonly args?: any[]) {
    }

    public static passed(testEntry: TestEntry, started: Date): TestExecutionResult {
        return new TestExecutionResult(
            testEntry.target,
            testEntry.propertyKey,
            testEntry.displayName,
            Duration.between(started, new Date(Date.now())),
            TestStatus.PASSED
        );
    }

    public static failed(testEntry: TestEntry, started: Date, error: Error, testArgs?: any[]): TestExecutionResult {
        return new TestExecutionResult(
            testEntry.target,
            testEntry.propertyKey,
            testEntry.displayName,
            Duration.between(started, new Date(Date.now())),
            error instanceof AssertionError ? TestStatus.FAILED_ASSERTION : TestStatus.FAILED_EXCEPTION,
            error,
            testArgs
        );
    }
}

export class TestCompletionResult {
    public constructor(public readonly results: TestExecutionResult[]) {
    }

    public get passed(): TestExecutionResult[] {
        return this.results.filter(result => result.status.equals(TestStatus.PASSED));
    }

    public get failedAssertion(): TestExecutionResult[] {
        return this.results.filter(result => result.status.equals(TestStatus.FAILED_ASSERTION));
    }

    public get failedException(): TestExecutionResult[] {
        return this.results.filter(result => result.status.equals(TestStatus.FAILED_EXCEPTION));
    }

    public get totalDuration(): Duration {
        return this.results.map(result => result.duration).reduce((a, b) => a.addDuration(b));
    }
}

export function test(...args: any[]): Action2<object, string> {
    return (target: object, propertyKey: string): void => {
        TestExecutive.getInstance().addTest(target, propertyKey, args);
    };
}

export function display(name: string): Action2<object, string> {
    return (target: object, propertyKey: string): void => {
        TestExecutive.getInstance().addDisplayName(target, propertyKey, name);
    };
}

export class TestExecutive {
    private static instance: TestExecutive;

    public readonly onExecuted: Observable<TestExecutive, TestExecutionResult>;
    public readonly onCompleted: Observable<TestExecutive, TestCompletionResult>;
    private readonly dispatcher: NotifyDispatcher<TestExecutive> = new NotifyDispatcher<TestExecutive>(this);
    private readonly entries: Mapped<TestEntry> = {};
    private readonly results: TestExecutionResult[] = [];

    public constructor() {
        this.onExecuted = this.dispatcher.createObservable();
        this.onCompleted = this.dispatcher.createObservable();
    }

    public addTest(target: object, propertyKey: string, args: any[]): void {
        const key: string = TestEntry.createTestEntryKey(target, propertyKey);
        if (!Object.keys(this.entries).includes(key)) {
            this.entries[key] = new TestEntry(target, propertyKey);
        }
        this.entries[key].args.push(args);
    }

    public addDisplayName(target: object, propertyKey: string, displayName: string): void {
        const key: string = TestEntry.createTestEntryKey(target, propertyKey);
        if (!Object.keys(this.entries).includes(key)) {
            this.entries[key] = new TestEntry(target, propertyKey);
        }
        this.entries[key].displayName = displayName;
    }

    public run(): void {
        Object.values(this.entries).forEach(entry => {
            if (entry.args.length === 0) {
                throw new InvalidOperationError("No test arguments. Possibly missing @test annotation.");
            }

            entry.args.reverse().forEach(args => {
                const started: Date = new Date(Date.now());
                let result: TestExecutionResult;

                try {
                    entry.execute(args);
                    result = TestExecutionResult.passed(entry, started);
                } catch (error) {
                    result = TestExecutionResult.failed(entry, started, error, args);
                }

                this.results.push(result);
                this.dispatcher.notify(this.onExecuted, result);
            });
        });

        this.dispatcher.notify(this.onCompleted, new TestCompletionResult(this.results));
    }

    public static getInstance(): TestExecutive {
        return TestExecutive.instance || (TestExecutive.instance = new TestExecutive());
    }
}