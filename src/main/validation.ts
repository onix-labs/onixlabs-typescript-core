import { Enum } from "./core";

export class ValidationMode extends Enum {
    public static readonly DEFAULT: ValidationMode = new ValidationMode(1, "DEFAULT");
    public static readonly STOP_ON_ERROR: ValidationMode = new ValidationMode(2, "STOP_ON_ERROR");
    public static readonly EMULATION: ValidationMode = new ValidationMode(3, "EMULATION");
}