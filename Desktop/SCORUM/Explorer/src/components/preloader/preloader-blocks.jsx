import React, { Fragment } from 'react';
import './preloader-blocks.scss';

export const PreloaderRow = () => (
  <tr className="preloader-blocks preloader-row">
    <td>
      <div className="preloader preloader-sm" />
    </td>
    <td>
      <div className="preloader preloader-date" />
    </td>
    <td>
      <div className="preloader" />
    </td>
    <td>
      <div className="preloader preloader-sm float-right" />
    </td>
  </tr>
);

export const PreloaderBlocks = () => (
  <Fragment>
    <PreloaderRow />
    <PreloaderRow />
    <PreloaderRow />
  </Fragment>
);
