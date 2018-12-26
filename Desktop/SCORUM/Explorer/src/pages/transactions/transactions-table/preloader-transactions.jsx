import React, { Fragment } from 'react';
import './preloader-transactions.scss';

export const PreloaderRow = () => (
  <tr className="preloader-transactions preloader-row">
    <td>
      <div className="preloader preloader-hash" />
    </td>
    <td>
      <div className="preloader preloader-username" />
    </td>
    <td />
    <td>
      <div className="preloader preloader-username" />
    </td>
    <td>
      <div className="preloader preloader-sm" />
    </td>
    <td>
      <div className="preloader float-right" />
    </td>
  </tr>
);

export const PreloaderTransactions = () => (
  <Fragment>
    <PreloaderRow />
    <PreloaderRow />
    <PreloaderRow />
  </Fragment>
);
