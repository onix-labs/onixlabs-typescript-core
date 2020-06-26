import { Optional } from ".";

/**
 * Represents an error that occurs when an operation or feature is not supported.
 */
export class NotSupportedError extends Error {

    /**
     * Creates a new instance of this class.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Not supported.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}
