/**
 * Defines the base class for implementing formatting.
 */
export abstract class Formatter<T> {

    /**
     * Formats the specified value.
     * @param value The value to format.
     * @return Returns a formatted string representation of the specified value.
     */
    public abstract format(value: T): string;
}
