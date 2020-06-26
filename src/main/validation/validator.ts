export abstract class Validator<T> {

    public abstract isValid(subject: T): boolean;
}
