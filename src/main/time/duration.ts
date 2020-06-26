import { Comparable, Equatable, Formattable, Formatter } from "../core";
import { DefaultDurationFormatter } from ".";

export class Duration implements Comparable<Duration>, Equatable<Duration>, Formattable<Duration> {
    public readonly weeks: number = 0;
    public readonly days: number = 0;
    public readonly hours: number = 0;
    public readonly minutes: number = 0;
    public readonly seconds: number = 0;
    public readonly milliseconds: number = 0;
    public readonly totalWeeks: number = 0;
    public readonly totalDays: number = 0;
    public readonly totalHours: number = 0;
    public readonly totalMinutes: number = 0;
    public readonly totalSeconds: number = 0;

    public constructor(public readonly totalMilliseconds: number = 0) {
        [
            this.weeks,
            this.days,
            this.hours,
            this.minutes,
            this.seconds,
            this.milliseconds
        ] = this.initializeComponents(totalMilliseconds);

        [
            this.totalMilliseconds,
            this.totalSeconds,
            this.totalMinutes,
            this.totalHours,
            this.totalDays,
            this.totalWeeks
        ] = this.initializeTotals(totalMilliseconds);
    }

    public addDuration(duration: Duration): Duration {
        return new Duration(this.totalMilliseconds + duration.totalMilliseconds);
    }

    public compareTo(other: Duration): number {
        return Comparable.compare(this, other, duration => duration.totalMilliseconds);
    }

    public equals(other: Duration): boolean {
        return this.totalMilliseconds === other.totalMilliseconds;
    }

    public format(formatter: Formatter<Duration>): string {
        return formatter.format(this);
    }

    public toString(): string {
        return this.format(new DefaultDurationFormatter());
    }

    private initializeComponents(milliseconds: number): number[] {
        const result: number[] = [];

        [604800000, 86400000, 3600000, 60000, 1000, 1].forEach(n => {
            const remainder: number = milliseconds % n;
            result.push((milliseconds - remainder) / n);
            milliseconds = remainder;
        });

        return result;
    }

    private initializeTotals(milliseconds: number): number[] {
        const result: number[] = [];
        let last: number = milliseconds;

        [1, 1000, 60, 60, 24, 7].forEach(n => result.push(last /= n));

        return result;
    }

    public static between(start: Date, end: Date): Duration {
        return new Duration(end.getTime() - start.getTime());
    }
}
