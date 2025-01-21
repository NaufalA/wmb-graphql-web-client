
import { graphql } from 'react-relay';

export const userCreateMutation = graphql`
  mutation userCreateMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id,
      fullName,
      email,
      role,
      createTime,
    }
  }`

export const userDetailFragment = graphql`
  fragment userDetailFragment on User {
    id,
    fullName,
    email,
    role,
    createTime,
    updateTime,
  }`

export const userGetQuery = graphql`
  query userGetQuery($id: ID!) {
    getUser(id: $id) {
      ...userDetailFragment
    }
  }`


export const userPaginationFragment = graphql`
  fragment userPaginationFragment on Query
  @refetchable(queryName: "userPaginationQuery")
  @argumentDefinitions(
      first: { type: "Int", defaultValue: 10 }
      after: { type: "String" }
    )
  {
    listUsers(first: $first, after: $after)
    @connection(key: "UserConnection_listUsers") {
      edges {
        cursor,
        node {
          ...userDetailFragment,
        }
      },
      pageInfo {
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage
      }
    }
  }`

export const userListQuery = graphql`
  query userListQuery {
      ...userPaginationFragment
  }`

export const userUpdateMutation = graphql`
  mutation userUpdateMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id,
      fullName,
      email,
      role,
      createTime,
    }
  }`

export const userDeleteMutation = graphql`
  mutation userDeleteMutation($id: ID!) {
    deleteUser(id: $id)
  }`