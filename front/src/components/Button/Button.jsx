/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Button({ id, args, butonName, onClickFunction }) {
  return (
    <>
      <button id={id} onClick={(e) => onClickFunction(e, args)}>
        {butonName}
      </button>
    </>
  );
}
