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
