import { Assert, display, test } from "../../main/test";
import {
    NotImplementedError,
    InvalidArgumentError,
    InvalidOperationError,
    InvalidFormatError,
    OutOfRangeError,
    NotSupportedError,
    Constructor
} from "../../main/core";

export class ErrorTests {

    @test(NotImplementedError, "NotImplementedError", "Not implemented.")
    @test(InvalidArgumentError, "InvalidArgumentError", "Invalid argument.")
    @test(InvalidOperationError, "InvalidOperationError", "Invalid operation.")
    @test(InvalidFormatError, "InvalidFormatError", "Invalid format.")
    @test(OutOfRangeError, "OutOfRangeError", "Out of range.")
    @test(NotSupportedError, "NotSupportedError", "Not supported.")
    @display("Custom error should produce the expected name and error message")
    public error_constructor(ctor: Constructor<Error>, name: string, message: string): void {
        const error: Error = Assert.throws(ctor, () => { throw new ctor(); });
        Assert.isEqual(name, error.name);
        Assert.isEqual(message, error.message);
    }
}
