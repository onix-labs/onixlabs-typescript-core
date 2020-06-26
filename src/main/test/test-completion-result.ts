import { TestExecutionResult, TestStatus } from ".";
import { Duration } from "../time";

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
