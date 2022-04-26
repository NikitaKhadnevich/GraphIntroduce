import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  fragment userFields on User {
    id
    username
    age
    posts {
      content
    }
  }

  query {
    getAllUsers {
      ...userFields
    }
  }
`;
// На данном примере мы запросили через FRAGMENT данные, тем самым ушли от потребности каждый раз ПЕРЕЧИСЛЯТЬ все поля

export const GET_ACCURATE_USER = gql`
  query getUser($id: ID) {
    getUser(id: $id) {
      id
      username
    }
  }
`;
