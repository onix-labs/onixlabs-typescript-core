import { PredicateValidator } from ".";

export class LessThanOrEqualToValidator extends PredicateValidator<number> {
    public constructor(value: number) {
        super(subject => subject <= value);
    }
}
