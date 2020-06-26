import { Action2 } from "../core";
import { TestExecutive } from ".";

export function test(...args: any[]): Action2<object, string> {
    return (target: object, propertyKey: string): void => {
        TestExecutive.getInstance().addTest(target, propertyKey, args);
    };
}
