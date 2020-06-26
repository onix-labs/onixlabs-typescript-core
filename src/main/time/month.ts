import { Enum } from "../core";

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
