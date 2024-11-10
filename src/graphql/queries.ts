import { gql } from '@apollo/client';

// 具材一覧を取得するクエリ
export const GET_INGREDIENTS = gql`
  query GetIngredients {
    getIngredients {
      id
      name
      quantity
      checked
    }
  }
`;

// 新しい具材を作成するミューテーション
export const CREATE_INGREDIENT = gql`
  mutation CreateIngredient($name: String!, $quantity: Int!) {
    createIngredient(name: $name, quantity: $quantity) {
      id
      name
      quantity
      checked
    }
  }
`;

// 具材のチェックを更新するミューテーション
export const UPDATE_INGREDIENT_CHECK = gql`
  mutation UpdateIngredientCheck($id: ID!, $checked: Boolean!) {
    updateIngredientCheck(id: $id, checked: $checked) {
      id
      checked
    }
  }
`;

// 具材の数量を更新するミューテーション
export const UPDATE_INGREDIENT_QUANTITY = gql`
  mutation UpdateIngredientQuantity($id: ID!, $quantity: Int!) {
    updateIngredientQuantity(id: $id, quantity: $quantity) {
      id
      quantity
    }
  }
`;

// 具材を削除するミューテーション
export const DELETE_INGREDIENT = gql`
  mutation DeleteIngredient($id: ID!) {
    deleteIngredient(id: $id) {
      id
    }
  }
`;
