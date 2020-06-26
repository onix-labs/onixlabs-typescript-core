import { Assert, display, test } from "../../main/test";
import { Version } from "../../main/core";

export class VersionTests {

    @test()
    @display("Version.constructor should construct a version.")
    public version_constructor(): void {
        const version: Version = new Version(1, 2, 3);
        const expected: string = "1.2.3";
        const actual: string = version.toString();
        Assert.isEqual(expected, actual);
    }

    @test(new Version(0, 0, 2), new Version(0, 0, 1), 1)
    @test(new Version(0, 0, 1), new Version(0, 0, 1), 0)
    @test(new Version(0, 0, 1), new Version(0, 0, 2), -1)
    @test(new Version(0, 2, 0), new Version(0, 1, 0), 1)
    @test(new Version(0, 1, 0), new Version(0, 1, 0), 0)
    @test(new Version(0, 1, 0), new Version(0, 2, 0), -1)
    @test(new Version(2, 0, 0), new Version(1, 0, 0), 1)
    @test(new Version(1, 0, 0), new Version(1, 0, 0), 0)
    @test(new Version(1, 0, 0), new Version(2, 0, 0), -1)
    @display("Version.compareTo should produce the expected result.")
    public version_compareTo(a: Version, b: Version, expected: number): void {
        const actual: number = a.compareTo(b);
        Assert.isEqual(expected, actual);
    }

    @test(new Version(1, 2, 3), new Version(1, 2, 3), true)
    @test(new Version(1, 2, 3), new Version(2, 3, 4), false)
    @display("Version.equals should produce the expected result.")
    public version_equals(a: Version, b: Version, expected: boolean): void {
        const actual: boolean = a.equals(b);
        Assert.isEqual(expected, actual);
    }

    @test(new Version(1, 0, 0), "1.0.0")
    @test(new Version(1, 2, 3), "1.2.3")
    @display("Version.toString should produce the expected result.")
    public version_toString(version: Version, expected: string): void {
        const actual: string = version.toString();
        Assert.isEqual(expected, actual);
    }

    @test("1.0.0", new Version(1, 0, 0))
    @test("1.2.3", new Version(1, 2, 3))
    @display("Version.parse should produce the expected result.")
    public version_parse(version: string, expected: Version): void {
        const actual: Version = Version.parse(version);
        Assert.isEqual(expected, actual);
    }
}
