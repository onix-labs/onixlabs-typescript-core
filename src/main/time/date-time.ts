import { Comparable, Equatable } from "../core";
import { Month } from ".";

export class DateTime implements Comparable<DateTime>, Equatable<DateTime> {

    public static get EMPTY(): DateTime {
        return new DateTime();
    }

    public constructor(
        public readonly year: number = 1970,
        public readonly month: number = 1,
        public readonly day: number = 1,
        public readonly hour: number = 0,
        public readonly minute: number = 0,
        public readonly second: number = 0,
        public readonly millisecond: number = 0) {
        Object.freeze(this);
    }

    public get date(): DateTime {
        return new DateTime(this.year, this.month, this.day, 0, 0, 0, 0);
    }

    public get time(): DateTime {
        return new DateTime(0, 0, 0, this.hour, this.minute, this.second, this.millisecond);
    }

    public compareTo(other: DateTime): number {
        return other.millisecond; // TODO FIX!
    }

    public equals(other: DateTime): boolean {
        return Equatable.equals(this, other);
    }

    public static isLeapYear(year: number): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    public static getDaysInMonth(month: number | Month, year: number): number {
        return month.valueOf() % 2 !== 0 ? 31 : month === Month.FEBRUARY ? DateTime.isLeapYear(year) ? 29 : 28 : 30;
    }
}
