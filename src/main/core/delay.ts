import { Observable, Observer, NotifyDispatcher } from "../data";


export class Delay {

    public readonly onTick: Observable<Delay>;
    private readonly dispatcher: NotifyDispatcher<Delay>;
    private isRunning: boolean = false;

    public constructor() {
        this.dispatcher = new NotifyDispatcher<Delay>(this);
        this.onTick = this.dispatcher.createObservable();
    }

    /**
     * Starts the delay.
     * @param interval The interval in milliseconds before the delay raises a subscription update.
     */
    public start(timeout: number = 1000): void {
        if (!this.isRunning) {
            this.isRunning = true;
            (async () => {
                await new Promise((resolve: () => void): number => setTimeout(resolve, timeout));
                if (this.isRunning) this.dispatcher.notify(this.onTick, undefined);
            })();
        }
    }

    /**
     * Stops the delay.
     */
    public stop(): void {
        this.isRunning = false;
    }

    /**
     * Starts a new delay.
     * @param interval The interval in milliseconds before the delay raises a subscription update.
     * @param observer An observer which will receive a subscription update when the delay times out.
     * @returns Returns the newly created and started delay.
     */
    public static startNew(timeout: number, observer: Observer<Delay>): Delay {
        const result: Delay = new Delay();
        result.onTick.subscribe(observer);
        result.start(timeout);
        return result;
    }
}
