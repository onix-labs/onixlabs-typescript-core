import { Enum } from "../core";

export class TestStatus extends Enum {
    public static readonly PASSED: TestStatus = new TestStatus(1, "PASSED");
    public static readonly FAILED_ASSERTION: TestStatus = new TestStatus(2, "FAILED_ASSERTION");
    public static readonly FAILED_EXCEPTION: TestStatus = new TestStatus(3, "FAILED_EXCEPTION");
}
