import { Enum, Equatable } from "./core";

export class Scale extends Enum {
    public static readonly PERCENT: Scale = new Scale(1, "PERCENT", "%");
    public static readonly CENTIMETER: Scale = new Scale(2, "CENTIMETER", "cm");
    public static readonly EPHEMERAL_UNIT: Scale = new Scale(3, "EPHEMERAL_UNIT", "em");
    public static readonly RELATIVE_EPHEMERAL_UNIT: Scale = new Scale(4, "RELATIVE_EPHEMERAL_UNIT", "rem");
    public static readonly INCH: Scale = new Scale(5, "INCH", "in");
    public static readonly MILLIMETER: Scale = new Scale(6, "MILLIMETER", "mm");
    public static readonly PICA: Scale = new Scale(7, "PICA", "pc");
    public static readonly POINT: Scale = new Scale(8, "POINT", "pt");
    public static readonly PIXEL: Scale = new Scale(9, "PIXEL", "px");
    public static readonly VIEWPORT_WIDTH: Scale = new Scale(10, "VIEWPORT_WIDTH", "vw");
    public static readonly VIEWPORT_HEIGHT: Scale = new Scale(11, "VIEWPORT_HEIGHT", "vh");
    public static readonly VIEWPORT_MIN: Scale = new Scale(12, "VIEWPORT_MIN", "vmin");
    public static readonly VIEWPORT_MAX: Scale = new Scale(13, "VIEWPORT_MAX", "vmax");
    public static readonly X_HEIGHT: Scale = new Scale(14, "X_HEIGHT", "ex");

    private constructor(value: number, name: string, public readonly symbol: string) {
        super(value, name);
    }
}

export class FontStyle extends Enum {
    public static readonly NORMAL: FontStyle = new FontStyle(1, "NORMAL");
    public static readonly LIGHT: FontStyle = new FontStyle(2, "LIGHT");
    public static readonly BOLD: FontStyle = new FontStyle(3, "BOLD");
    public static readonly ITALIC: FontStyle = new FontStyle(4, "ITALIC");
    public static readonly UNDERLINE: FontStyle = new FontStyle(5, "UNDERLINE");
    public static readonly OVERLINE: FontStyle = new FontStyle(6, "OVERLINE");
    public static readonly STRIKEOUT: FontStyle = new FontStyle(7, "STRIKEOUT");
}

export class Edge extends Enum {
    public static readonly NONE: Edge = new Edge(0, "NONE");
    public static readonly TOP: Edge = new Edge(1, "TOP");
    public static readonly RIGHT: Edge = new Edge(2, "RIGHT");
    public static readonly BOTTOM: Edge = new Edge(3, "BOTTOM");
    public static readonly LEFT: Edge = new Edge(4, "LEFT");
}

export class Position extends Enum {
    public static readonly NONE: Position = new Position(0, "NONE");
    public static readonly ABSOLUTE: Position = new Position(1, "ABSOLUTE");
    public static readonly FIXED: Position = new Position(2, "FIXED");
    public static readonly RELATIVE: Position = new Position(3, "RELATIVE");
    public static readonly STATIC: Position = new Position(4, "STATIC");
}

export class Point implements Equatable<Point> {

    public static get EMPTY(): Point {
        return new Point();
    }

    public constructor(public x: number = 0, public y: number = 0) {
    }

    public equals(other: Point): boolean {
        return Equatable.equals(this, other);
    }

    public toRectangle(size: Size): Rectangle {
        return new Rectangle(this.x, this.y, size.width, size.height);
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}

export class Size implements Equatable<Size> {

    public static get EMPTY(): Size {
        return new Size();
    }

    public constructor(public width: number = 0, public height: number = 0) {
    }

    public equals(other: Size): boolean {
        return Equatable.equals(this, other);
    }

    public toRectangle(point: Point): Rectangle {
        return new Rectangle(point.x, point.y, this.width, this.height);
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}

export class Rectangle implements Equatable<Rectangle> {

    public static get EMPTY(): Rectangle {
        return new Rectangle();
    }

    public constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 0,
        public height: number = 0) {
    }

    public get right(): number {
        return this.x + this.width;
    }

    public get bottom(): number {
        return this.y + this.height;
    }

    public equals(other: Rectangle): boolean {
        return Equatable.equals(this, other);
    }

    public getPoint(): Point {
        return new Point(this.x, this.y);
    }

    public getSize(): Size {
        return new Size(this.width, this.height);
    }

    public toString(): string {
        return JSON.stringify(this);
    }

    public static fromPointAndSize(point: Point, size: Size): Rectangle {
        return new Rectangle(point.x, point.y, size.width, size.height);
    }
}