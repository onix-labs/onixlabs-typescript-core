import { Validator } from ".";

export class LengthValidator extends Validator<string | unknown[]> {

    public constructor(
        private readonly minimum: number,
        private readonly maximum: number,
        private readonly exclusive: boolean = false) {
        super();
    }

    public isValid(subject: string | unknown[]): boolean {
        return this.exclusive
            ? subject.length > this.minimum && subject.length < this.maximum
            : subject.length >= this.minimum && subject.length <= this.maximum;
    }
}
