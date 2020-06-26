import { Enum } from "../core";

export class TextColor extends Enum {
    public static readonly BLACK = new TextColor(0, "BLACK", 0, 2);
    public static readonly DARK_BLUE = new TextColor(1, "DARK_BLUE", 4, 2);
    public static readonly DARK_GREEN = new TextColor(2, "DARK_GREEN", 2, 2);
    public static readonly DARK_CYAN = new TextColor(3, "DARK_CYAN", 6, 2);
    public static readonly DARK_RED = new TextColor(4, "DARK_RED", 1, 2);
    public static readonly DARK_MAGENTA = new TextColor(5, "DARK_MAGENTA", 5, 2);
    public static readonly DARK_YELLOW = new TextColor(6, "DARK_YELLOW", 3, 2);
    public static readonly DARK_GRAY = new TextColor(7, "DARK_GRAY", 0, 1);
    public static readonly LIGHT_BLUE = new TextColor(8, "LIGHT_BLUE", 4, 1);
    public static readonly LIGHT_GREEN = new TextColor(9, "LIGHT_GREEN", 2, 1);
    public static readonly LIGHT_CYAN = new TextColor(10, "LIGHT_CYAN", 6, 1);
    public static readonly LIGHT_RED = new TextColor(11, "LIGHT_RED", 1, 1);
    public static readonly LIGHT_MAGENTA = new TextColor(12, "LIGHT_MAGENTA", 5, 1);
    public static readonly LIGHT_YELLOW = new TextColor(13, "LIGHT_YELLOW", 3, 1);
    public static readonly LIGHT_GRAY = new TextColor(14, "LIGHT_GRAY", 7, 2);
    public static readonly WHITE = new TextColor(15, "WHITE", 7, 1);

    public static get RESET(): string { return "\x1b[0m"; }

    private constructor(
        value: number,
        name: string,
        private readonly color: number,
        private readonly modifier: number) {
        super(value, name);
    }

    public toForeColor(): string {
        return `\x1b[${this.modifier}m\x1b[3${this.color}m`;
    }

    public toBackColor(): string {
        return `\x1b[${this.modifier}m\x1b[4${this.color}m`;
    }
}
