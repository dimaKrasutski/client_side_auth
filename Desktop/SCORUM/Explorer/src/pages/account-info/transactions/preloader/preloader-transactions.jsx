import React, { Fragment } from 'react';

export const PreloaderRow = () => (
  <tr className="preloader-transactions preloader-row">
    <td>
      <div className="preloader" />
    </td>
    <td>
      <div className="preloader" />
    </td>
    <td>
      <div className="preloader" />
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
