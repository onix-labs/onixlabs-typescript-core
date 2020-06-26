import { NotifyDispatcher, Observer, ObservableObject, PropertyDefined, PropertyChanged, PropertyDeleted } from ".";
import { Equatable } from "../core";

/**
 * The symbol used to refer to the observers of an observable.
 */
const OBSERVERS: unique symbol = Symbol();

/**
 * The symbol used to refer to a template in an observable object.
 */
// const TEMPLATE: unique symbol = Symbol();

/**
 * Represents the base class for implementing observables.
 */
export abstract class Observable<S, D = undefined> {
    private readonly [OBSERVERS]: Set<Observer<S, D>> = new Set();

    /**
     * Subscribes to this observable.
     * @param observer The observer which will receive subscription updates to this observable.
     */
    public subscribe(observer: Observer<S, D>): void {
        this[OBSERVERS].add(observer);
    }

    /**
     * Unsubscribes from this observable.
     * @param observer The observer which will no longer receive subscription updates to this observable.
     */
    public unsubscribe(observer: Observer<S, D>): void {
        this[OBSERVERS].delete(observer);
    }

    /**
     * Unsubscribes all observers from this observable.
     */
    public unsubscribeAll(): void {
        this[OBSERVERS].clear();
    }

    /**
     * Notifies all observers of an update to the state of this observable.
     * @param subject The sibject of the observable subscription update; usually the object generating the update.
     * @param data The subscription update data to be observed by all observers.
     */
    protected notify(subject: S, data: D): void {
        for (const observer of this[OBSERVERS]) {
            observer(data, subject);
        }
    }

    /**
     * Creates an observable object from the specified template.
     * @param template The template to make observable.
     * @returns Returns an object on which property definitions, changes and deletions may be observed.
     */
    public static from<T extends object, P = unknown>(template: T): ObservableObject<T, P> {
        return new (class {
            public readonly subject: T;
            public readonly onPropertyDefined: Observable<T, PropertyDefined<PropertyKey, P>>;
            public readonly onPropertyChanged: Observable<T, PropertyChanged<PropertyKey, P>>;
            public readonly onPropertyDeleted: Observable<T, PropertyDeleted<PropertyKey, P>>;
            private readonly dispatcher: NotifyDispatcher<T>;

            public constructor() {
                this.dispatcher = new NotifyDispatcher(template);
                this.onPropertyDefined = this.dispatcher.createObservable();
                this.onPropertyChanged = this.dispatcher.createObservable();
                this.onPropertyDeleted = this.dispatcher.createObservable();

                const hasOwn: Function = Object.prototype.hasOwnProperty;
                const observable: this = this;

                this.subject = new Proxy(template, {
                    defineProperty(target: T, key: PropertyKey, descriptor: TypedPropertyDescriptor<P>): boolean {
                        if (hasOwn.call(target, key)) {
                            if (!Equatable.equals((target as any)[key], descriptor.value)) {
                                observable.dispatcher.notify(
                                    observable.onPropertyChanged,
                                    new PropertyChanged(key, (target as any)[key], descriptor.value)
                                );
                            }
                        } else {
                            observable.dispatcher.notify(
                                observable.onPropertyDefined,
                                new PropertyDefined(key, descriptor?.value as P)
                            );
                        }

                        return Reflect.defineProperty(target, key, descriptor);
                    },
                    deleteProperty(target: T, key: PropertyKey): boolean {
                        observable.dispatcher.notify(
                            observable.onPropertyDeleted,
                            new PropertyDeleted(key, (target as any)[key])
                        );

                        return Reflect.deleteProperty(target, key);
                    },
                    set(target: T, key: PropertyKey, value: P, receiver: any): boolean {
                        if (!hasOwn.call(target, key)) {
                            return Reflect.set(target, key, value, receiver);
                        }

                        if (!Equatable.equals((target as any)[key], value)) {
                            observable.dispatcher.notify(
                                observable.onPropertyChanged,
                                new PropertyChanged(key, (target as any)[key], value)
                            );
                        }

                        return Reflect.set(target, key, value);
                    }
                });
            }
        })();
    }
}
