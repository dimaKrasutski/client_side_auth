import { compose, nAry } from 'ramda';
import { catchError } from 'rxjs/operators/catchError';
import { globalError } from '../actions/system';
import { actionsObservableOf } from '../helpers/redux-observable-helper';

export const getGlobalErrorObservable = compose(actionsObservableOf, nAry(3, globalError));

export const catchGlobalErrorWith = (errorMessageId, errorLinks) =>
  catchError(err => getGlobalErrorObservable(errorMessageId, err, errorLinks));
