import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
      id
      username
      age
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UserInput) {
    updateUser(input: $input) {
      id
      username
      age
    }
  }
`;

// По сути мы сначала через $ прописываем саму мутацию, что задали еще раньше, на бэке
// Потом мы проваливаемся в нее , словно оборачиваем в объект и уже прописываем ЕЩЕ РАЗ
// но уже с параметром $input input
