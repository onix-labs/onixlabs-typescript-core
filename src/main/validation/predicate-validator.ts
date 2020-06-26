import { Validator } from ".";
import { Func1 } from "../core";

export class PredicateValidator<T> extends Validator<T> {

    public constructor(private readonly predicate: Func1<T, boolean>) {
        super();
    }

    public isValid(subject: T): boolean {
        return this.predicate(subject);
    }
}
