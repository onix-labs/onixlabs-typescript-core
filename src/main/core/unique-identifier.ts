import { Comparable, Equatable, Func1, Random } from ".";

/**
 * Represents a unique identifier.
 */
export class UniqueIdentifier implements Comparable<UniqueIdentifier>, Equatable<UniqueIdentifier> {

    /**
     * An empty unique identifier.
     * @returns Returns an empty unique identifier.
     */
    public static get EMPTY(): UniqueIdentifier {
        return new UniqueIdentifier();
    }

    /**
     * Creates a new instance of this class.
     * @param value The value of the unique identifier.
     */
    private constructor(private readonly value: number[] = Random.integerArray(16, 0, 0)) {
        Object.freeze(this);
    }

    /**
     * Compares two objects that implement Comparable.
     * @param other The other object to compare with this object.
     * @returns Returns a numeric value indicating the relative order of the left object to the right object.
     */
    public compareTo(other: UniqueIdentifier): number {
        function computeHash(values: number[]): number {
            const prime: number = 16777619;
            let hash: number = 2166136261;

            values.forEach(value => {
                hash ^= value;
                hash *= prime;
            });

            return hash;
        }

        return Comparable.compare(this, other, uid => computeHash(uid.value));
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: UniqueIdentifier): boolean {
        return Equatable.equals(this, other);
    }

    /**
     * Gets the value of this unique identifier as an array.
     * @returns Returns the value of this unique identifier as an array.
     */
    public toArray(): number[] {
        return this.value;
    }

    /**
     * Returns a string representing this object.
     * @returns Returns a string representing this object.
     */
    public toString(): string {
        const positions: number[] = [4, 6, 8, 10];
        const toHexByte: Func1<number, string> = (index: number) => ("0" + this.value[index].toString(16)).slice(-2);
        return this.value.map((_, index) => `${positions.includes(index) ? "-" : ""}${toHexByte(index)}`).join("");
    }

    /**
     * Generates a random version 4 unique identifier.
     * @returns Returns a random unique identifier.
     */
    public static random(): UniqueIdentifier {
        const value: number[] = Random.integerArray(16, 0, 255);

        value[6] &= 0x0F;
        value[6] |= 0x40;
        value[8] &= 0x3F;
        value[8] |= 0x80;

        return new UniqueIdentifier(value);
    }
}
