import { Optional } from "../core";

export class AssertionError extends Error {
    public constructor(message: Optional<string> = "Assertion failed.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}
