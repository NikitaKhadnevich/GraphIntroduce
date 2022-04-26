/* eslint-disable react/prop-types */
import React from 'react';

export default function Input({ value, onChangeAction, type, placeholder }) {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChangeAction(e.target.value)}
    />
  );
}
