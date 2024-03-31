import { gql } from '@apollo/client';

export const GET_USER = gql`
    query getUser {
        user {
            _id
            username
            email
            dataPoints {
                _id
                concept
        }
    }}
`;

export const GET_DATAPOINT = gql`
    query getDataPoint($_id: ID!) {
        dataPoint(_id: $_id) {
            _id
            concept
            reference {
                _id
                reference
                scriptureLink
                quote
            }
        }
    }
`

export const GET_REFERENCE = gql`
    query getReferences($_id: ID!) {
        reference(_id: $_id) {
            _id
            reference
            scriptureLink
            quote
        }
    }
`