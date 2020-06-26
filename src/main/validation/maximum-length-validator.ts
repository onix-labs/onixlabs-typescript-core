import { PredicateValidator } from ".";

export class MaximumLengthValidator extends PredicateValidator<string | unknown[]> {
    public constructor(maximum: number, exclusive: boolean = false) {
        super(subject => exclusive ? subject.length < maximum : subject.length <= maximum);
    }
}
