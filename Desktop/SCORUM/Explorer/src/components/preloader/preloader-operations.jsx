import React, { Fragment } from 'react';
import './preloader-operations.scss';

export const PreloaderRow = () => (
  <tr className="preloader-operations preloader-row">
    <td>
      <div className="preloader preloader-hash" />
    </td>
    <td>
      <div className="preloader preloader-date" />
    </td>
    <td>
      <div className="preloader" />
    </td>
  </tr>
);

export const PreloaderOperations = () => (
  <Fragment>
    <PreloaderRow />
    <PreloaderRow />
    <PreloaderRow />
  </Fragment>
);
