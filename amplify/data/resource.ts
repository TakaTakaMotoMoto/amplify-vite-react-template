import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates an Ingredient database table with a "name" and 
"quantity" field, as well as a "checked" boolean field. The authorization 
rule below specifies that any user authenticated via an API key can 
"create", "read", "update", and "delete" any "Ingredient" records.
=========================================================================*/

const schema = a.schema({
  Ingredient: a
    .model({
      name: a.string(),
      quantity: a.integer(),
      checked: a.boolean(),
    })
    .authorization(allow => [allow.owner()]), // オーナー認証を使用
});

export type Schema = ClientSchema<typeof schema>;

// Define the data model for deployment
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', // ユーザープール認証を使用
  },
});
