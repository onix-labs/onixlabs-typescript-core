import { Action1 } from "../core";
import { StringBuilder } from ".";

export function buildString(action: Action1<StringBuilder>): string {
    const builder: StringBuilder = new StringBuilder();
    action(builder);
    return builder.toString();
}
