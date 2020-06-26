import { PredicateValidator } from ".";

export class RegexValidator extends PredicateValidator<string> {
    public constructor(regex: RegExp) {
        super(subject => regex.test(subject));
    }
}
