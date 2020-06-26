export class Character {
    public static get EMPTY(): string { return ""; }
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

    private constructor() {
    }
}
