import { Validator } from ".";

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
