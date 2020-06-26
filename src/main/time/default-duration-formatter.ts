import { Formatter } from "../core";
import { Duration } from ".";

export class DefaultDurationFormatter extends Formatter<Duration> {
    public format(value: Duration): string {
        return `${value.weeks / 7 + value.days}.${value.hours}:${value.minutes}:${value.seconds}.${value.milliseconds}`;
    }
}
