import { Enum } from "../core";

export class Position extends Enum {
    public static readonly NONE: Position = new Position(0, "NONE");
    public static readonly ABSOLUTE: Position = new Position(1, "ABSOLUTE");
    public static readonly FIXED: Position = new Position(2, "FIXED");
    public static readonly RELATIVE: Position = new Position(3, "RELATIVE");
    public static readonly STATIC: Position = new Position(4, "STATIC");
}
