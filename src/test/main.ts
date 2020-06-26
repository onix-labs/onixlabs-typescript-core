import { TestExecutive, TestStatus } from "../main/test";
import { TextColor, buildString } from "../main/text";
import { Constructor, Type, Func1 } from "../main/core";
import { LongDurationFormatter } from "../main/time";
import { ComparableTests } from "./core/comparable.tests";
import { EquatableTests } from "./core/equatable.tests";
import { EnumTests } from "./core/enum.tests";
import { EnumSetTests } from "./core/enum-set.tests";
import { ErrorTests } from "./core/error.tests";
import { TypeTests } from "./core/type.tests";
import { VersionTests } from "./core/version.tests";
import { SequenceTests } from "./data/sequence.tests";
import { ObservableTests } from "./data/observable.tests";

let lastErrorFailed: boolean = false;
const executive: TestExecutive = TestExecutive.getInstance();

// tslint:disable-next-line: no-unused-expression
[
    ComparableTests,
    EquatableTests,
    EnumTests,
    EnumSetTests,
    ErrorTests,
    TypeTests,
    VersionTests,
    SequenceTests,
    ObservableTests
];

function getTextColor(status: TestStatus): TextColor {
    switch (status) {
        case TestStatus.PASSED: return TextColor.LIGHT_GREEN;
        case TestStatus.FAILED_ASSERTION: return TextColor.LIGHT_YELLOW;
        case TestStatus.FAILED_EXCEPTION: return TextColor.LIGHT_RED;
    }
    return TextColor.DARK_GRAY;
}

function getFormattedArguments(args: any[]): string {
    function color(arg: any): TextColor {
        const map: Map<Constructor, TextColor> = new Map();
        let result: TextColor;

        map.set(Array, TextColor.DARK_YELLOW);
        map.set(Function, TextColor.DARK_CYAN);
        map.set(String, TextColor.DARK_RED);
        map.set(Number, TextColor.DARK_GREEN);
        map.set(Boolean, TextColor.DARK_BLUE);
        map.set(RegExp, TextColor.DARK_MAGENTA);


        try {
            result = map.get(Type.from(arg).getConstructor()) ?? TextColor.DARK_GRAY;
        } catch {
            result = TextColor.DARK_GRAY;
        }

        return result;
    }

    function format(arg: any): string {
        const map: Map<Constructor, Func1<any, string>> = new Map();
        let result: string;

        map.set(Function, a => a.name || "(anonymous)");
        map.set(String, a => `"${a}"`);
        map.set(Array, a => `[${a}]`);

        try {
            result = (map.get(Type.from(arg).getConstructor()) ?? ((a: any) => a.toString()))(arg);
        } catch {
            result = ((a: any) => a?.toString() ?? "undefined")(arg);
        }

        return result;
    }

    return args.map(arg => buildString(it => it.appendColor(format(arg), color(arg)))).join(", ");
}

function formatArguments(args: any[] = []): string {
    return buildString(builder => {
        builder
            .appendColor("[", TextColor.DARK_GRAY)
            .append(getFormattedArguments(args))
            .appendColor("]", TextColor.DARK_GRAY);
    });
}

executive.onExecuted.subscribe(result => {
    console.log(buildString(builder => {
        const color: TextColor = getTextColor(result.status);

        if (result.status === TestStatus.PASSED) {
            builder
                .appendColor("PASSED : ", color)
                .appendColor(`[${result.target.constructor.name}]`, TextColor.LIGHT_GRAY)
                .append(" - ", result.displayName)
                .appendColor(` (${result.duration})`, TextColor.LIGHT_BLUE);

            lastErrorFailed = false;
        }

        if (result.status !== TestStatus.PASSED) {
            if (!lastErrorFailed) builder.appendLine();

            builder
                .appendColor("FAILED : ", color)
                .appendColor(`[${result.target.constructor.name}]`, TextColor.LIGHT_GRAY)
                .append(" - ", result.displayName)
                .appendColorLine(` (${result.duration})`, TextColor.LIGHT_BLUE)
                .appendColorLine(`REASON : ${result.error?.message}`, color)
                .appendColorLine(`STACK  : ${result.error?.stack}`, color)
                .appendColorLine(`ARGS   : ${formatArguments(result.args)}`, color);

            lastErrorFailed = true;
        }
    }));
});

executive.onCompleted.subscribe(result => {
    console.log(buildString(builder => {
        const extent: string = result.totalDuration.format(new LongDurationFormatter(true));
        builder
            .appendColorLine("------", TextColor.WHITE)
            .appendColorLine(`PASSED : ${result.passed.length}`, TextColor.LIGHT_GREEN)
            .appendColorLine(`FAILED : ${result.failedAssertion.length} (assertions)`, TextColor.LIGHT_YELLOW)
            .appendColorLine(`FAILED : ${result.failedException.length} (exceptions)`, TextColor.LIGHT_RED)
            .appendColorLine(`EXTENT : ${extent}`, TextColor.WHITE);
    }));
});

executive.run();
