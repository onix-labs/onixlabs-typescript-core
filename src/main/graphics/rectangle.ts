import { Point, Size } from ".";
import { Equatable } from "../core";

/**
 * Represents a rectangular shape in a two-dimentional plane.
 */
export class Rectangle implements Equatable<Rectangle> {

    /**
     * Gets an empty rectangle.
     */
    public static get EMPTY(): Rectangle {
        return new Rectangle();
    }

    /**
     * Creates a new instance of this class.
     * @param x The horizontal starting point of the rectangle.
     * @param y The vertical starting point of the rectangle.
     * @param width The width of the rectangle.
     * @param height The height of the rectangle.
     */
    public constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 0,
        public height: number = 0) {
    }

    /**
     * The sum of the x and width coordinates.
     */
    public get right(): number {
        return this.x + this.width;
    }

    /**
     * The sum of the y and height coordinates.
     */
    public get bottom(): number {
        return this.y + this.height;
    }

    /**
     * Compares this object with the other object.
     * @param other The other object to compare with this object.
     * @returns Returns true if the objects are equal; otherwise, false.
     */
    public equals(other: Rectangle): boolean {
        return Equatable.equals(this, other);
    }

    /**
     * Gets the x and y coordinates of this rectangle as a new point.
     * @return Returns the x and y coordinates of this rectangle as a new point.
     */
    public getPoint(): Point {
        return new Point(this.x, this.y);
    }

    /**
     * Gets the width and height of this rectangle as a new size.
     * @return Returns the width and height of this rectangle as a new size.
     */
    public getSize(): Size {
        return new Size(this.width, this.height);
    }

    /**
     * Creates a new rectangle from a point and size.
     * @param point The x and y coordinates of the rectangle.
     * @param size The width and height coordinates of the rectangle.
     */
    public static fromPointAndSize(point: Point, size: Size): Rectangle {
        return new Rectangle(point.x, point.y, size.width, size.height);
    }
}
