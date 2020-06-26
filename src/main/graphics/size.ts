import { Equatable } from "../core";

/**
 * Represents the size of a two-dimentional shape;
 */
export class Size implements Equatable<Size> {

    /**
     * Gets an empty size.
     */
    public static get EMPTY(): Size {
        return new Size();
    }

    /**
     * Creates a new instance of this class.
     * @param width The width of the two-dimentional shape.
     * @param height The height of the two-dimentional shape.
     */
    public constructor(public width: number = 0, public height: number = 0) {
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: Size): boolean {
        return Equatable.equals(this, other);
    }
}
