import { bind } from 'ramda';
import { ActionsObservable } from 'redux-observable';

/**
 * Helper function that allows using actions observable of operator in compose chains
 */
export const actionsObservableOf = bind(ActionsObservable.of, ActionsObservable);
