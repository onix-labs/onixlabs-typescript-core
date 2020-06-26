import { Equatable } from "../core";

/**
 * Represents a point in a two-dimentional plane.
 */
export class Point implements Equatable<Point> {

    /**
     * Gets an empty point.
     */
    public static get EMPTY(): Point {
        return new Point();
    }

    /**
     * Creates a new instance of this class.
     * @param x The horizontal coordinate of the point.
     * @param y The vertical coordinate of the point.
     */
    public constructor(public x: number = 0, public y: number = 0) {
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: Point): boolean {
        return Equatable.equals(this, other);
    }
}
