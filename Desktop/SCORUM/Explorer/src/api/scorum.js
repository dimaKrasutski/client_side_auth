import api from '@scorum/scorum-js/lib/api';
import { compose, nAry } from 'ramda';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

window.api = api;

const callback = (err, res, observer) => {
  if (err) {
    observer.error(err);
  }
  observer.next(res);
  observer.complete();
};

export const getDynamicGlobalProperties = () =>
  Observable.create(observer =>
    api.getDynamicGlobalProperties((err, res) => callback(err, res, observer)));

export const getChainCapital = () =>
  Observable.create(observer =>
    api.getChainCapital((err, res) => callback(err, res, observer)));

export const getAccount = name =>
  Observable.create(observer =>
    api.getAccounts([name], (err, res) => callback(err, res, observer)));

export const getAccountCount = () =>
  Observable.create(observer =>
    api.getAccountCount((err, res) => callback(err, res, observer)));

export const getBlock = blockNumber =>
  Observable.create(observer =>
    api.getBlock(blockNumber, (err, res) => callback(err, res, observer)));

export const getBlocksHistory = (from = '-1', limit = '20') =>
  Observable.create(observer =>
    api.getBlocksHistory(from, limit, (err, res) => callback(err, res, observer)));

export const getTransfersHistory = (from = '-1', limit = '20') =>
  Observable.create(observer =>
    api.getOpsHistory(from, limit, 3, (err, res) => callback(err, res, observer)));

export const getOpsHistory = (from = '-1', limit = '20') =>
  Observable.create(observer =>
    api.getOpsHistory(from, limit, 1, (err, res) => callback(err, res, observer)));

export const getActiveWitnesses = () =>
  Observable.create(observer =>
    api.getActiveWitnesses((err, res) => callback(err, res, observer)));

export const getWitnessesByVote = (from = '', limit = 50) =>
  Observable.create(observer =>
    api.getWitnessesByVote(from, limit, (err, res) => callback(err, res, observer)));

/**
 * @param {string} username - see state.signIn.userName
 * @param {number} offset - use -1 to get transactions from last available index
 * @param {number} limit - should not be greater than offset. -1 offset is an exception
 */
export const getAccountTransactions = compose(fromPromise, nAry(3, api.getAccountScrToScrTransfersAsync));
