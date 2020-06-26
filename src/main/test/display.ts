import { Action2 } from "../core";
import { TestExecutive } from ".";

export function display(name: string): Action2<object, string> {
    return (target: object, propertyKey: string): void => {
        TestExecutive.getInstance().addDisplayName(target, propertyKey, name);
    };
}
