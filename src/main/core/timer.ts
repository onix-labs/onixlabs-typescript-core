import { Observable, Observer, NotifyDispatcher } from "../data";

export class Timer {

    public readonly onTick: Observable<Timer>;
    private readonly dispatcher: NotifyDispatcher<Timer>;
    private isRunning: boolean = false;

    public constructor() {
        this.dispatcher = new NotifyDispatcher<Timer>(this);
        this.onTick = this.dispatcher.createObservable();
    }

    /**
     * Starts the timer.
     * @param interval The interval between timer ticks in milliseconds.
     */
    public start(interval: number = 1000): void {
        if (!this.isRunning) {
            this.isRunning = true;
            (async () => {
                while (this.isRunning) {
                    this.dispatcher.notify(this.onTick, undefined);
                    await new Promise((resolve: () => void): number => setTimeout(resolve, interval));
                }
            })();
        }
    }

    /**
     * Stops the timer.
     */
    public stop(): void {
        this.isRunning = false;
    }

    /**
     * Starts a new timer.
     * @param interval The interval between timer ticks in milliseconds.
     * @param observer An observer which will receive subscription updates at regular intervals.
     * @returns Returns the newly created and started timer.
     */
    public static startNew(interval: number, observer: Observer<Timer>): Timer {
        const result: Timer = new Timer();
        result.onTick.subscribe(observer);
        result.start(interval);
        return result;
    }
}
