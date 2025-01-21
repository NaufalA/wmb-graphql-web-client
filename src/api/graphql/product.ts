
import { graphql } from 'react-relay';

export const productCreateMutation = graphql`
  mutation productCreateMutation($input: CreateProductInput!) {
    createProduct(input: $input) {
      id,
      productName,
      price,
      stock,
      stockUnit,
      createTime,
    }
  }`

export const productDetailFragment = graphql`
  fragment productDetailFragment on Product {
    id,
    productName,
    price,
    stock,
    stockUnit,
    createTime,
    updateTime,
  }`

export const productGetQuery = graphql`
  query productGetQuery($id: ID!) {
    getProduct(id: $id) {
      ...productDetailFragment
    }
  }`


export const productPaginationFragment = graphql`
  fragment productPaginationFragment on Query
  @refetchable(queryName: "productPaginationQuery")
  @argumentDefinitions(
      first: { type: "Int", defaultValue: 10 }
      after: { type: "String" }
    )
  {
    listProducts(first: $first, after: $after, search: $search)
    @connection(key: "ProductConnection_listProducts") {
      edges {
        cursor,
        node {
          ...productDetailFragment,
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

export const productListQuery = graphql`
  query productListQuery($search: String) {
      ...productPaginationFragment
  }`

export const productUpdateMutation = graphql`
  mutation productUpdateMutation($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id,
      productName,
      price,
      stock,
      stockUnit,
      createTime,
    }
  }`

export const productDeleteMutation = graphql`
  mutation productDeleteMutation($id: ID!) {
    deleteProduct(id: $id)
  }`