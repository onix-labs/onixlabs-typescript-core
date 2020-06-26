import { Comparable, Equatable } from ".";

/**
 * Represents a version number.
 */
export class Version implements Comparable<Version>, Equatable<Version> {

    /**
     * Creates a new instance of this class.
     * @param major The major component of the version number.
     * @param minor The minor component of the version number.
     * @param patch The patch component of the version number.
     */
    public constructor(
        public major: number = 0,
        public minor: number = 0,
        public patch: number = 0) {
    }

    /**
     * Compares two objects that implement Comparable.
     * @param other The other object to compare with this object.
     * @returns Returns a numeric value indicating the relative order of the left object to the right object.
     */
    public compareTo(other: Version): number {
        if (this.major > other.major) return 1;
        if (this.major < other.major) return -1;
        if (this.minor > other.minor) return 1;
        if (this.minor < other.minor) return -1;
        if (this.patch > other.patch) return 1;
        if (this.patch < other.patch) return -1;
        return 0;
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: Version): boolean {
        return Equatable.equals(this, other);
    }

    /**
     * Returns a string representing this object.
     * @returns Returns a string representing this object.
     */
    public toString(): string {
        return [this.major, this.minor, this.patch].join(".");
    }

    /**
     * Parses a string into a MutableVersion instance.
     * @param value The value to parse into a MutableVersion instance.
     * @returns Returns a new MutableVersion instance parsed from the specified value.
     */
    public static parse(value: string): Version {
        const values: number[] = value.split(".", 3).map(n => Number(n));
        return new Version(values[0], values[1], values[2]);
    }
}
