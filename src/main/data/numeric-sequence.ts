import { Sequence } from ".";

/**
 * Represents a sequence of numbers.
 */
export type NumericSequence = Sequence<number> & {
    average(): number;
    minimum(): number;
    maximum(): number;
    sum(): number;
};
