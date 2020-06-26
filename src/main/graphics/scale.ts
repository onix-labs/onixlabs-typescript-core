import { Enum } from "../core";

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
