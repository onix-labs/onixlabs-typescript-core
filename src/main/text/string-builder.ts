import { Equatable } from "../core";
import { Character } from ".";
import { TextColor } from "./text-color";

export class StringBuilder implements Equatable<StringBuilder> {

    public constructor(private readonly items: string[] = []) {
    }

    public append(...items: any[]): this {
        this.items.push(...items.map(item => item?.toString() ?? Character.EMPTY));
        return this;
    }

    public appendLine(...items: any[]): this {
        return this.append(...items, Character.CRLF);
    }

    public appendColor(item: any, foreColor: TextColor, backColor?: TextColor): this {
        return this.append(foreColor.toForeColor(), backColor?.toBackColor ?? Character.EMPTY, item, TextColor.RESET);
    }

    public appendColorLine(item: any, foreColor: TextColor, backColor?: TextColor): this {
        this.appendColor(item, foreColor, backColor);
        return this.appendLine();
    }

    public equals(other: StringBuilder): boolean {
        return Equatable.equals(this, other)
            || Equatable.orderedArrayEquals(this.items, other.items);
    }

    public toString(): string {
        return this.items.join(Character.EMPTY);
    }
}
