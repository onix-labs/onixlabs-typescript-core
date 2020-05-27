import { Equatable, Action1, Enum } from "./core";

export class StringBuilder implements Equatable<StringBuilder> {
    public static get EMPTY_STRING(): string { return ""; }
    public static get BACK_SPACE(): string { return "\u0008"; }
    public static get TAB(): string { return "\u0009"; }
    public static get LINE_FEED(): string { return "\u000A"; }
    public static get VERTICAL_TAB(): string { return "\u000B"; }
    public static get FORM_FEED(): string { return "\u000C"; }
    public static get CARRIAGE_RETURN(): string { return "\u000D"; }
    public static get SPACE(): string { return "\u0020"; }
    public static get DOUBLE_QUOTE(): string { return "\u0022"; }
    public static get SINGLE_QUOTE(): string { return "\u0027"; }
    public static get BACK_SLASH(): string { return "\u005C"; }
    public static get NON_BREAKING_SPACE(): string { return "\u00A0"; }
    public static get LINE_SEPARATOR(): string { return "\u2028"; }
    public static get PARAGRAPH_SEPARATOR(): string { return "\u2029"; }
    public static get BYTE_ORDER_MARK(): string { return "\uFEFF"; }
    public static get CRLF(): string { return "\u000D\u000A"; }
    public static get RESET_COLOR(): string { return "\x1b[0m"; }

    public constructor(private readonly items: string[] = []) {
    }

    public append(...items: any[]): this {
        items.forEach(item => this.items.push(item?.toString() ?? StringBuilder.EMPTY_STRING));
        return this;
    }

    public appendLine(...items: any[]): this {
        this.append(...items);
        this.items.push(StringBuilder.CRLF);
        return this;
    }

    public appendColor(item: any, foreColor: TextColor, backColor?: TextColor): this {
        return this.append(
            foreColor.toForeColor(),
            backColor?.toBackColor() ?? StringBuilder.EMPTY_STRING,
            item,
            StringBuilder.RESET_COLOR
        );
    }

    public appendColorLine(item: any, foreColor: TextColor, backColor?: TextColor): this {
        this.appendColor(item, foreColor, backColor);
        this.items.push(StringBuilder.CRLF);
        return this;
    }

    public equals(other: StringBuilder): boolean {
        return Equatable.equals(this, other);
    }

    public toString(): string {
        return this.items.join("");
    }
}

export function buildString(action: Action1<StringBuilder>): string {
    const builder: StringBuilder = new StringBuilder();
    action(builder);
    return builder.toString();
}

export class TextColor extends Enum {
    public static readonly BLACK = new TextColor(0, "BLACK", 30, 40, 2);
    public static readonly DARK_BLUE = new TextColor(1, "DARK_BLUE", 34, 44, 2);
    public static readonly DARK_GREEN = new TextColor(2, "DARK_GREEN", 32, 42, 2);
    public static readonly DARK_CYAN = new TextColor(3, "DARK_CYAN", 36, 46, 2);
    public static readonly DARK_RED = new TextColor(4, "DARK_RED", 31, 41, 2);
    public static readonly DARK_MAGENTA = new TextColor(5, "DARK_MAGENTA", 35, 45, 2);
    public static readonly DARK_YELLOW = new TextColor(6, "DARK_YELLOW", 33, 43, 2);
    public static readonly DARK_GRAY = new TextColor(8, "DARK_GRAY", 30, 40, 1);
    public static readonly LIGHT_BLUE = new TextColor(9, "LIGHT_BLUE", 34, 44, 1);
    public static readonly LIGHT_GREEN = new TextColor(10, "LIGHT_GREEN", 32, 33, 1);
    public static readonly LIGHT_CYAN = new TextColor(11, "LIGHT_CYAN", 36, 46, 1);
    public static readonly LIGHT_RED = new TextColor(12, "LIGHT_RED", 31, 41, 1);
    public static readonly LIGHT_MAGENTA = new TextColor(13, "LIGHT_MAGENTA", 35, 45, 1);
    public static readonly LIGHT_YELLOW = new TextColor(14, "LIGHT_YELLOW", 33, 43, 1);
    public static readonly LIGHT_GRAY = new TextColor(7, "LIGHT_GRAY", 37, 47, 2);
    public static readonly WHITE = new TextColor(15, "WHITE", 37, 47, 1);

    private constructor(
        value: number,
        name: string,
        private readonly foreColor: number,
        private readonly backColor: number,
        private readonly modifier: number) {
        super(value, name);
    }

    public toForeColor(): string {
        return `\x1b[${this.modifier}m\x1b[${this.foreColor}m`;
    }

    public toBackColor(): string {
        return `\x1b[${this.modifier}m\x1b[${this.backColor}m`;
    }
}