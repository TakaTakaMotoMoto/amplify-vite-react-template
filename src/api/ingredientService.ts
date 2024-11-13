import { ApolloClient, InMemoryCache } from '@apollo/client';
import {GET_INGREDIENTS} from '../graphql/queries';
import{  
  CREATE_INGREDIENT,
  UPDATE_INGREDIENT_CHECK,
  UPDATE_INGREDIENT_QUANTITY,
  DELETE_INGREDIENT} from '../graphql/mutations';

// Apollo Clientの設定
const client = new ApolloClient({
  uri: import.meta.env.VITE_API_BASE_URL as string,  // GraphQLのエンドポイントを設定
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY as string,  // 必要に応じてAPIキー
  },
});

// 材料リストを取得する
export const getIngredientList = async (): Promise<Ingredient[]> => {
  const { data } = await client.query({
    query: GET_INGREDIENTS,
  });
  return data.getIngredients;
};

// 新しい材料を作成する
export const postCreateIngredient = async (name: string, quantity: number) => {
  const { data } = await client.mutate({
    mutation: CREATE_INGREDIENT,
    variables: { name, quantity },
  });
  return data.createIngredient;
};

// 材料のチェック状態を更新する
export const patchCheckIngredient = async (id: number, checked: boolean) => {
  const { data } = await client.mutate({
    mutation: UPDATE_INGREDIENT_CHECK,
    variables: { id, checked },
  });
  return data.updateIngredientCheck;
};

// 材料の数量を更新する
export const patchIngredientQuantity = async (id: number, quantity: number) => {
  const { data } = await client.mutate({
    mutation: UPDATE_INGREDIENT_QUANTITY,
    variables: { id, quantity },
  });
  return data.updateIngredientQuantity;
};

// 材料を削除する
export const deleteIngredient = async (id: number) => {
  const { data } = await client.mutate({
    mutation: DELETE_INGREDIENT,
    variables: { id },
  });
  return data.deleteIngredient;
};

// Ingredientの型定義
export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  checked: boolean;
}
