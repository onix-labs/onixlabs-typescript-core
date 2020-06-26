import { Enum } from "../core";

export class Day extends Enum {
    public static readonly MONDAY: Day = new Day(1, "MONDAY");
    public static readonly TUESDAY: Day = new Day(2, "TUESDAY");
    public static readonly WEDNESDAY: Day = new Day(3, "WEDNESDAY");
    public static readonly THURSDAY: Day = new Day(4, "THURSDAY");
    public static readonly FRIDAY: Day = new Day(5, "FRIDAY");
    public static readonly SATURDAY: Day = new Day(6, "SATURDAY");
    public static readonly SUNDAY: Day = new Day(7, "SUNDAY");
}
