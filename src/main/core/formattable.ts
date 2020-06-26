import { Formatter } from ".";

/**
 * Defines a mechanism to format an object.
 */
export abstract class Formattable<T> {

    /**
     * Prevents instances of this class from being created.
     */
    private constructor() {
    }

    /**
     * Formats the current object using the specified formatter.
     * @param formatter The formatter to format the current object.
     * @return Returns a string representation of the current object in the specified format.
     */
    public abstract format(formatter: Formatter<T>): string;
}