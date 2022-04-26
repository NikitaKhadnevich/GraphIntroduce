/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

export default function EditBlock(props) {
  const {
    children: [
      showHide,
      user,
      usernameEdit,
      setEditAge,
      ageEdit,
      updateCurrent,
      showHideController,
      setEditUsername,
    ],
  } = props;

  const data = React.createElement('h1', null, 'Whare');

  const person = {
    name: 'max',
  };

  const { name: firstName } = person;

  console.log('children.length', firstName);

  return (
    <div
      className={+showHide === +user.id ? 'editMenu' : 'hideMenu'}
      key={`${user?.id}_editMenu`}
    >
      <Input
        value={usernameEdit}
        type='text'
        placeholder='Enter your Name'
        onChangeAction={setEditUsername}
      />
      <Input
        value={ageEdit}
        type='number'
        placeholder='Enter your age'
        onChangeAction={setEditAge}
      />
      <div className='actionBtn'>
        <Button
          id={user.id}
          butonName='Update'
          onClickFunction={updateCurrent}
        />
        <Button butonName='Hide' onClickFunction={showHideController} />
      </div>
    </div>
  );
}
