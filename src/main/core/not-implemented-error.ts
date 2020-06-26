import { Optional } from ".";

/**
 * Represents an error that occurs when a function has not been implemented.
 */
export class NotImplementedError extends Error {

    /**
     * Creates a new instance of this class.
     * @param message A message containing details about the error.
     */
    public constructor(message: Optional<string> = "Not implemented.") {
        super(message);
        this.name = this.constructor.name;
        Object.freeze(this);
    }
}
