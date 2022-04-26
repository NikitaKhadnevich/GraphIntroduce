/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Button({ onClickArgs, butonName, onClickFunction }) {
  return (
    <>
      <button onClick={() => onClickFunction(!showHide)}>{butonName}</button>
    </>
  );
}
