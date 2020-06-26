import { Formatter, Keyed } from "../core";
import { Duration } from ".";

export class LongDurationFormatter extends Formatter<Duration> {
    public constructor(private readonly truncateEmptyEntries: boolean = false) {
        super();
    }

    public format(value: Duration): string {
        const entries: Keyed<number> = {
            weeks: value.weeks,
            days: value.days,
            hours: value.hours,
            minutes: value.minutes,
            seconds: value.seconds,
            milliseconds: value.milliseconds
        };

        return Object
            .keys(entries)
            .filter(key => !this.truncateEmptyEntries || entries[key] > 0)
            .map(key => `${entries[key]} ${key}`)
            .join(", ");
    }
}
