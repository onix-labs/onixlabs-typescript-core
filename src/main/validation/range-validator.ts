import { Validator } from ".";

export class RangeValidator extends Validator<number> {

    public constructor(
        private readonly minimum: number,
        private readonly maximum: number,
        private readonly exclusive: boolean = false) {
        super();
    }

    public isValid(subject: number): boolean {
        return this.exclusive
            ? subject > this.minimum && subject < this.maximum
            : subject >= this.minimum && subject <= this.maximum;
    }
}
