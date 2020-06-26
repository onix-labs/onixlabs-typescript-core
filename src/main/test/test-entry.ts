import { Keyed, Action } from "../core";

export class TestEntry {
    public displayName: string;

    public constructor(
        public readonly target: object,
        public readonly propertyKey: string,
        public readonly args: any[][] = []) {
        this.displayName = propertyKey;
    }

    public execute(testArgs: any[] = []): void {
        const instance: Keyed<Action> = Object.create(this.target);
        instance[this.propertyKey].apply(instance, testArgs);
    }

    public static createTestEntryKey(target: object, propertyKey: string): string {
        return `${target.constructor.name}_${propertyKey}`;
    }
}
