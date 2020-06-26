import { PredicateValidator } from ".";

export class MinimumLengthValidator extends PredicateValidator<string | unknown[]> {
    public constructor(minimum: number, exclusive: boolean = false) {
        super(subject => exclusive ? subject.length > minimum : subject.length >= minimum);
    }
}
