import { Comparable, Comparer, Enum, Equatable, Formattable, Formatter, StringIndexed } from "./core";

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

    public static between(start: Date, end: Date): Duration {
        return new Duration(end.getTime() - start.getTime());
    }

    public addDuration(duration: Duration): Duration {
        return new Duration(this.totalMilliseconds + duration.totalMilliseconds);
    }

    public compareTo(other: Duration): number {
        return Comparer.compare(this, other, duration => duration.totalMilliseconds);
    }

    public equals(other: Duration): boolean {
        return this.totalMilliseconds === other.totalMilliseconds;
    }

    public format(formatter: Formatter<Duration> = new DefaultDurationFormatter()): string {
        return formatter.format(this);
    }

    public toString(): string {
        return this.format();
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
}

export class DefaultDurationFormatter implements Formatter<Duration> {
    public format(value: Duration): string {
        return `${value.weeks / 7 + value.days}.${value.hours}:${value.minutes}:${value.seconds}.${value.milliseconds}`;
    }
}

export class LongDurationFormatter implements Formatter<Duration> {
    public constructor(private readonly truncateEmptyEntries: boolean = false) { }

    public format(value: Duration): string {
        const entries: StringIndexed<number> = {
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

export class Day extends Enum {
    public static readonly MONDAY: Day = new Day(1, "MONDAY");
    public static readonly TUESDAY: Day = new Day(2, "TUESDAY");
    public static readonly WEDNESDAY: Day = new Day(3, "WEDNESDAY");
    public static readonly THURSDAY: Day = new Day(4, "THURSDAY");
    public static readonly FRIDAY: Day = new Day(5, "FRIDAY");
    public static readonly SATURDAY: Day = new Day(6, "SATURDAY");
    public static readonly SUNDAY: Day = new Day(7, "SUNDAY");
}

export class Month extends Enum {
    public static readonly JANUARY: Month = new Month(1, "JANUARY");
    public static readonly FEBRUARY: Month = new Month(2, "FEBRUARY");
    public static readonly MARCH: Month = new Month(3, "MARCH");
    public static readonly APRIL: Month = new Month(4, "APRIL");
    public static readonly MAY: Month = new Month(5, "MAY");
    public static readonly JUNE: Month = new Month(6, "JUNE");
    public static readonly JULY: Month = new Month(7, "JULY");
    public static readonly AUGUST: Month = new Month(8, "AUGUST");
    public static readonly SEPTEMBER: Month = new Month(9, "SEPTEMBER");
    public static readonly OCTOBER: Month = new Month(10, "OCTOBER");
    public static readonly NOVEMBER: Month = new Month(11, "NOVEMBER");
    public static readonly DECEMBER: Month = new Month(12, "DECEMBER");
}

// export enum DateTimeField {
//     Year,
//     Month,
//     Day,
//     Hour,
//     Minute,
//     Second,
//     Millisecond
// };

// export class DateTime implements Comparable<DateTime>, Equatable<DateTime> {
//     public constructor(
//         public readonly year: number = 1970,
//         public readonly month: number = 1,
//         public readonly day: number = 1,
//         public readonly hour: number = 0,
//         public readonly minute: number = 0,
//         public readonly second: number = 0,
//         public readonly millisecond: number = 0) {
//         Object.freeze(this);
//     }

//     public get date(): DateTime {
//         return new DateTime(this.year, this.month, this.day, 0, 0, 0, 0);
//     }

//     public get time(): DateTime {
//         return new DateTime(0, 0, 0, this.hour, this.minute, this.second, this.millisecond);
//     }

//     public static isLeapYear(year: number): boolean {
//         return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
//     }

//     public static getDaysInMonth(month: number | Month, year: number): number {
//         return month % 2 !== 0 ? 31 : month === Month.February ? DateTime.isLeapYear(year) ? 29 : 28 : 30;
//     }

//     private justGet(): DateTime {
//         return new DateTime(
//             this.year,
//             this.month,
//             this.day,
//             this.hour,
//             this.minute,
//             this.second,
//             this.millisecond
//         );
//     }
// }