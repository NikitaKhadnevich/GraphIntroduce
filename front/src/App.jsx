/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable no-ex-assign */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_USER, DELETE_USER, UPDATE_USER } from './mutations/user';
import { GET_ALL_USERS, GET_ACCURATE_USER } from './query/user';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import EditBlock from './components/EditBlock/EditBlock';

export default function App() {
  // 1. Тут просто. юзаем квери для получения всех юзеров, описание в папке query
  // И через юз эффек кладем все это дело уже в стейт менеджмент
  const { data, loading, refetch } = useQuery(GET_ALL_USERS, {
    // ОПЦИИ КАК У React Query
    // pollInterval: 5000, //  Отправляет запрос каждые пол секунды, тем самым не нужен рефетч
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    !loading ? setUsers(data.getAllUsers) : null;
  }, [data]);

  // _____________________________________________________ //
  // 1.2. Создаем перезапрос юзеров, через refetch - в React Query мы юзали поле enabled для подключени или отключения юзеров
  async function refetchUsersList(e) {
    e.preventDefault(e);
    try {
      await refetch();
    } catch (error) {
      error = new Error('Error on refetch step');
    }
  }

  // _____________________________________________________ //
  // 1.3. Получем одиночного пользователя
  const { data: unqData, loading: uniqLoading } = useQuery(GET_ACCURATE_USER, {
    variables: {
      id: 1, // Хардкодим айдишник для запроса, все похоже как на мутациях
    },
  });

  // ___________________M U T A T I O N S_______________________________ //
  // 2.1 ADD NEW ITEM

  // Тут работаем с мутациями. Собираем ончеджи с полей
  const [username, setUsername] = useState('');
  const [age, setAge] = useState();

  // Создаем массив-кортеж из функции мутейт
  const [newUser] = useMutation(CREATE_USER);

  // Юзаем функцию обертку над кортежем
  async function addUser(e) {
    e.preventDefault();
    try {
      await newUser({
        variables: {
          input: {
            username,
            age, // Тут мы описываем наш input - это то, что мы указали в файле папки mutation и то что мы добавляем (username, age id -  автоматом)
          },
        },
      });
      console.log({ data });
      await setUsername('');
      await setAge('');
    } catch (error) {
      error = new Error('Error on CreateUser Step');
    }
  }

  // 2.2 DELETE ITEM
  const [deleteUser] = useMutation(DELETE_USER);
  async function deleteCurrent(e) {
    e.preventDefault(e);
    try {
      await deleteUser({
        variables: {
          id: e.target?.id,
        },
      });
      await refetch(); //  Мождно и не писать
    } catch (error) {
      error = new Error('have problem with delete user');
    }
  }

  // 2.3 UPDATE ITEM
  const [usernameEdit, setEditUsername] = useState('');
  const [ageEdit, setEditAge] = useState();
  const [showHide, setShowHide] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER);
  async function updateCurrent(e) {
    e.preventDefault(e);
    try {
      await updateUser({
        variables: {
          input: {
            id: e.target?.id,
            username: usernameEdit,
            age: ageEdit,
          },
        },
      });
      await refetch();
      await setEditUsername('');
      await setEditAge('');
      await setShowHide(false);
    } catch (error) {
      error = new Error('have problem with delete user');
    }
  }

  const showHideController = (e) => {
    if (showHide === e?.target?.id || e?.target?.id.length === 0) {
      setShowHide(false);
    }
    setShowHide(e?.target?.id);
  };

  return (
    <>
      <div className='App'>
        <form>
          <Input
            value={username}
            type='text'
            placeholder='Enter your Name'
            onChangeAction={setUsername}
          />
          <Input
            value={age}
            type='number'
            placeholder='Enter your age, number please'
            onChangeAction={setAge}
          />
          <div className='actionBtn'>
            <Button butonName='Create' onClickFunction={addUser} />
            <Button butonName='Get' onClickFunction={refetchUsersList} />
          </div>
        </form>
        <div className='usersList'>
          {loading && <p>Loading...</p>}
          {users.map((user) => (
            <div className='userContainer' key={user.name}>
              <div className='userInfo' key={user.id}>
                <p>Content: {user.posts?.content}</p>
                <p>Name: {user.username}</p>
                <p>Age: {user.age}</p>
              </div>
              <div className='actionBtn'>
                <Button
                  id={user.id}
                  butonName='X'
                  onClickFunction={deleteCurrent}
                />
                <Button
                  id={user.id}
                  butonName='Edit User'
                  onClickFunction={showHideController}
                />
              </div>
              <EditBlock>
                {showHide}
                {user}
                {usernameEdit}
                {setEditAge}
                {ageEdit}
                {updateCurrent}
                {showHideController}
                {setEditUsername}
              </EditBlock>
            </div>
          ))}
        </div>
        <div className='uniqUser'>
          {uniqLoading && <p>Loading...</p>}
          {!uniqLoading && <p>Бог Тысячалетия: {unqData.getUser?.username}</p>}
        </div>
      </div>
    </>
  );
}
