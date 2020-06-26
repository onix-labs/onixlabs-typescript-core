import { Optional } from ".";

/**
 * Represents an error that occurs when an argument is invalid.
 */
export class InvalidArgumentError extends Error {

    /**
     * Creates a new instance of this class.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Invalid argument.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}
