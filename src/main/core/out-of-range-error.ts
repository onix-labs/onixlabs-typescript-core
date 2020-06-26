import { Optional } from ".";

/**
 * Represents an error that occurs when a value is out of range.
 */
export class OutOfRangeError extends Error {

    /**
     * Creates a new instance of this class.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Out of range.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}
