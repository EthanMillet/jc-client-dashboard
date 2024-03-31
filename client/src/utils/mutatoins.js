import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
    }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_DATAPOINT = gql`
    mutation addDataPoint($concept: String!) {
      addDataPoint(concept: $concept) {
            _id
            concept
        }
    }
`

export const ADD_REFERENCE = gql`
    mutation addReference($reference: String!, $scriptureLink: String!, $quote: String!, $conceptID: String!) {
      addReference(reference: $reference, scriptureLink: $scriptureLink, quote: $quote, conceptID: $conceptID) {
            _id
            reference
            scriptureLink
            quote
            conceptID {
              _id
            }
        }
    }
`