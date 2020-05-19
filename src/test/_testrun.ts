import { Func1, Type, TypeInfo } from "../main/core";
import { LongDurationFormatter } from "../main/date";
import { TestExecutive, TestStatus } from "../main/test";
import { buildString, TextColor } from "../main/text";
import { CoreTests } from "./core.tests";
import { DataTests } from "./data.tests";

[CoreTests, DataTests]

const executive: TestExecutive = TestExecutive.getInstance();
let lastErrorFailed: boolean = false;

function getTextColor(status: TestStatus): TextColor {
    switch (status) {
        case TestStatus.PASSED: return TextColor.LIGHT_GREEN;
        case TestStatus.FAILED_ASSERTION: return TextColor.LIGHT_YELLOW;
        case TestStatus.FAILED_EXCEPTION: return TextColor.LIGHT_RED;
    }
    return TextColor.DARK_GRAY;
}

function getArgumentColor(arg: any): TextColor {
    const map: Map<Type<any>, TextColor> = new Map();
    let result: TextColor;

    map.set(Array, TextColor.DARK_YELLOW);
    map.set(Function, TextColor.DARK_CYAN);
    map.set(String, TextColor.DARK_RED);
    map.set(Number, TextColor.DARK_GREEN);
    map.set(Boolean, TextColor.DARK_BLUE);
    map.set(RegExp, TextColor.DARK_MAGENTA);


    try {
        result = map.get(new TypeInfo(arg).type) ?? TextColor.DARK_GRAY;
    } catch {
        result = TextColor.DARK_GRAY;
    }

    return result;
}

function getArgumentFormat(arg: any): string {
    const map: Map<Type<any>, Func1<any, string>> = new Map();
    let result: string;

    map.set(Function, a => a.name || "(anonymous)");
    map.set(String, a => `"${a}"`);
    map.set(Array, a => `[${a}]`);

    try {
        result = (map.get(new TypeInfo(arg).type) ?? ((a: any) => a.toString()))(arg);
    } catch {
        result = ((a: any) => a?.toString() ?? "undefined")(arg);
    }

    return result;
}

function formatArguments(testArgs: any[] = []): string {
    const coloredArgs: string = testArgs.map(arg => buildString(builder => {
        builder.appendColor(getArgumentFormat(arg), getArgumentColor(arg));
    })).join(", ");

    return buildString(builder => {
        builder
            .appendColor("[", TextColor.LIGHT_GRAY)
            .append(coloredArgs)
            .appendColor("]", TextColor.LIGHT_GRAY);
    });
}

executive.onExecuted.subscribe((_, result) => {
    console.log(buildString(builder => {
        const color: TextColor = getTextColor(result.status);

        if (result.status === TestStatus.PASSED) {
            builder
                .appendColor("PASSED : ", color)
                .append(result.displayName, " (", result.duration, ")");

            lastErrorFailed = false;
        }

        if (result.status !== TestStatus.PASSED) {
            if (!lastErrorFailed) builder.appendLine();

            builder
                .appendColor("FAILED : ", color)
                .appendLine(result.displayName, " (", result.duration, ")")
                .appendColorLine(`REASON : ${result.error?.message}`, color)
                .appendColorLine(`ARGS   : ${formatArguments(result.testArgs)}`, color);

            lastErrorFailed = true;
        }
    }));
});

executive.onCompleted.subscribe((_, result) => {
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
