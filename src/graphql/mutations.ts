// src/graphql/mutations.ts
import { gql } from '@apollo/client';

export const CREATE_INGREDIENT = gql`
  mutation CreateIngredient($name: String!, $quantity: Int!) {
    createIngredient(name: $name, quantity: $quantity) {
      id
      name
      quantity
    }
  }
`;

export const UPDATE_INGREDIENT = gql`
  mutation UpdateIngredient($id: ID!, $quantity: Int!) {
    updateIngredient(id: $id, quantity: $quantity) {
      id
      name
      quantity
    }
  }
`;

export const DELETE_INGREDIENT = gql`
  mutation DeleteIngredient($id: ID!) {
    deleteIngredient(id: $id)
  }
`;