import React, { Fragment } from 'react';

export const PreloaderRow = () => (
  <tr className="preloader-witnesses preloader-row">
    <td>
      <div className="preloader preloader-sm" />
    </td>
    <td>
      <div className="preloader" />
    </td>
    <td>
      <div className="preloader float-right" />
    </td>
  </tr>
);

export const PreloaderWitnesses = () => (
  <Fragment>
    <PreloaderRow />
    <PreloaderRow />
    <PreloaderRow />
  </Fragment>
);
