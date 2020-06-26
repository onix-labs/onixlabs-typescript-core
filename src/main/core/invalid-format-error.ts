import { Optional } from ".";

/**
 * Represents an error that occurs when a format is invalid.
 */
export class InvalidFormatError extends Error {

    /**
     * Creates a new instance of this class.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Invalid format.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}
