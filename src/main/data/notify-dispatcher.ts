import { Action2 } from "../core";
import { Observable } from ".";

/**
 * The symbol used to refer to observerables of a notify dispatcher.
 */
const OBSERVABLES: unique symbol = Symbol();

/**
 * Represents a dispatcher for objects that handle mutliple observables.
 */
export class NotifyDispatcher<S> {
    private readonly [OBSERVABLES]: Map<Observable<S, any>, Action2<S, any>> = new Map();

    /**
     * Creates a new instance of this class.
     * @param subject The subject of the observable subscription update; usually the object generating the update.
     */
    public constructor(private readonly subject: S) {
    }

    /**
     * Creates a new observable and registers its notify function to the notify dispatcher.
     */
    public createObservable<D>(): Observable<S, D> {
        const observables: Map<Observable<S, D>, Action2<S, D>> = this[OBSERVABLES];
        return new (class extends Observable<S, D> {
            public constructor() {
                super();
                observables.set(this, this.notify);
            }
        })();
    }

    /**
     * Notifies all observers of an update to the state of the specified observable.
     * @param observable The observable whose observers will be notified of a subscription update.
     * @param data The subscription update data to be observed by all observers.
     */
    public notify<D>(observable: Observable<S, D>, data: D): void {
        this[OBSERVABLES].get(observable as Observable<S, D>)?.call(observable, this.subject, data);
    }
}
