import { AssertionError, TestStatus, TestEntry } from ".";
import { Duration } from "../time";

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
