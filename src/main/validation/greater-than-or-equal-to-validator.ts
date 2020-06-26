import { PredicateValidator } from ".";

export class GreaterThanOrEqualToValidator extends PredicateValidator<number> {
    public constructor(value: number) {
        super(subject => subject >= value);
    }
}
