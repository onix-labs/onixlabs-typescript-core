import { Enum } from "../core";

export class FontStyle extends Enum {
    public static readonly NORMAL: FontStyle = new FontStyle(1, "NORMAL");
    public static readonly LIGHT: FontStyle = new FontStyle(2, "LIGHT");
    public static readonly BOLD: FontStyle = new FontStyle(3, "BOLD");
    public static readonly ITALIC: FontStyle = new FontStyle(4, "ITALIC");
    public static readonly UNDERLINE: FontStyle = new FontStyle(5, "UNDERLINE");
    public static readonly OVERLINE: FontStyle = new FontStyle(6, "OVERLINE");
    public static readonly STRIKEOUT: FontStyle = new FontStyle(7, "STRIKEOUT");
}
