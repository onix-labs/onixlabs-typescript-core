import { Assert, display, test } from "../../main/test";
import { Person } from "../mock-data";
import { Action2 } from "../../main/core";
import { ObservableObject, Observable, PropertyChanged } from "../../main/data";

export class ObservableTests {

    @test()
    @display("Observable.subscribe should subscribe an observer.")
    public observable_subscribe(): void {
        const expected: string[] = ["Jack"];
        const actual: string[] = [];
        const observer: Action2<PropertyChanged<PropertyKey, unknown>, Person> = update => {
            actual.push(update.newValue as string);
        };

        const observable: ObservableObject<Person> = Observable.from({
            firstName: "John",
            lastName: "Smith",
            birthday: new Date(Date.parse("2000-05-01T00:00:00Z"))
        });

        observable.onPropertyChanged.subscribe(observer);
        observable.subject.firstName = "Jack";

        Assert.isEqual(expected, actual);
    }

    @test()
    @display("Observable.unsubscribe should unsubscribe an observer.")
    public observable_unsubscribe(): void {
        const expected: string[] = ["Jack"];
        const actual: string[] = [];
        const observer: Action2<PropertyChanged<PropertyKey, unknown>, Person> = update => {
            actual.push(update.newValue as string);
        };

        const observable: ObservableObject<Person> = Observable.from({
            firstName: "John",
            lastName: "Smith",
            birthday: new Date(Date.parse("2000-05-01T00:00:00Z"))
        });

        observable.onPropertyChanged.subscribe(observer);
        observable.subject.firstName = "Jack";

        observable.onPropertyChanged.unsubscribe(observer);
        observable.subject.firstName = "John";

        Assert.isEqual(expected, actual);
    }

    @test()
    @display("Observable.unsubscribeAll should unsubscribe an observer.")
    public observable_unsubscribeAll(): void {
        const expected: string[] = ["Jack"];
        const actual: string[] = [];
        const observer: Action2<PropertyChanged<PropertyKey, unknown>, Person> = update => {
            actual.push(update.newValue as string);
        };

        const observable: ObservableObject<Person> = Observable.from({
            firstName: "John",
            lastName: "Smith",
            birthday: new Date(Date.parse("2000-05-01T00:00:00Z"))
        });

        observable.onPropertyChanged.subscribe(observer);
        observable.subject.firstName = "Jack";

        observable.onPropertyChanged.unsubscribeAll();
        observable.subject.firstName = "John";

        Assert.isEqual(expected, actual);
    }
}
