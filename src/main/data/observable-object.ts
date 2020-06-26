import { Observable, PropertyDefined, PropertyChanged, PropertyDeleted } from ".";

/**
 * Represents an observable object.
 */
export type ObservableObject<S, P = unknown> = {
    readonly subject: S;
    readonly onPropertyDefined: Observable<S, PropertyDefined<PropertyKey, P>>;
    readonly onPropertyChanged: Observable<S, PropertyChanged<PropertyKey, P>>;
    readonly onPropertyDeleted: Observable<S, PropertyDeleted<PropertyKey, P>>;
};
