import React from 'react';
import ReactDOM from "react-dom";
import './loading.scss';

export default function Loading() {
  return ReactDOM.createPortal((
    <>
      <div className="loading"><span>Loading...</span></div>
    </>
  ), document.body);
}
