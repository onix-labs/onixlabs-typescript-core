import { PredicateValidator } from ".";

export class BooleanValidator extends PredicateValidator<boolean> {
    public constructor(value: boolean) {
        super(subject => subject === value);
    }
}
