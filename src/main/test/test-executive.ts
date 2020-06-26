import { Observable, NotifyDispatcher } from "../data";
import { TestExecutionResult, TestEntry, TestCompletionResult } from ".";
import { InvalidOperationError, Keyed } from "../core";

export class TestExecutive {
    private static instance: TestExecutive;

    public readonly onExecuted: Observable<TestExecutive, TestExecutionResult>;
    public readonly onCompleted: Observable<TestExecutive, TestCompletionResult>;
    private readonly dispatcher: NotifyDispatcher<TestExecutive> = new NotifyDispatcher<TestExecutive>(this);
    private readonly entries: Keyed<TestEntry> = {};
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
