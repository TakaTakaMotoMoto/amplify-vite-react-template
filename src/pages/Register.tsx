import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
//import { getIngredientList, postCreateIngredient, patchCheckIngredient, patchIngredientQuantity, deleteIngredient, Ingredient } from '../api/ingredientService';
import { Ingredient } from '../api/ingredientService';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>()

const Register: React.FC = () => {
  //const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [ingredientList, setIngredientList] = useState<Schema["Ingredient"]["type"][]>([]);
  const [ingredientName, setIngredientName] = useState<string>('');
  const [ingredientQuantity, setIngredientQuantity] = useState<number | string>('');
  const [error, setError] = useState<string>('');

  const fetchIngredientList = async () => {
    const {data: items, errors} = await client.models.Ingredient.list();
    if (errors) {
      console.error("具材一覧を取得中にエラーが発生しました。:", errors)
    }
    setIngredientList(items);
  };

  useEffect(() => {
    fetchIngredientList();
  }, []);

  /*useEffect(() => {
    (async () => {
      const list = await getIngredientList();
      setIngredientList(list);
    })();
  }, []);*/

  // 入力フォームの変更処理
  const handleIngredientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientName(e.target.value);
  };

  const handleIngredientQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientQuantity(e.target.value);
  };

  // 新しい具材の作成処理
  const handleCreateIngredient = async () => {
    setError('');

    if (ingredientName === '') {
      setError('具材名を入力してください');
      return;
    }

    if (ingredientList.some((ingredient) => ingredient.name === ingredientName)) {
      setError('同じ名前の具材が既に存在します');
      return;
    }

    const normalizedQuantity = typeof ingredientQuantity === 'string'
      ? ingredientQuantity.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
      : ingredientQuantity;

    const parsedQuantity = typeof normalizedQuantity === 'string' ? parseFloat(normalizedQuantity) : normalizedQuantity;

    if (isNaN(parsedQuantity)) {
      setError('数量は数値で入力してください');
      return;
    }

    if (parsedQuantity < 1 || parsedQuantity > 100) {
      setError('数量は1から100までの間で入力してください');
      return;
    }

    //await postCreateIngredient(ingredientName, parsedQuantity);
    // ↑の代わりに以下で代用
    console.log("追加ボタンが押されました");
    try {
      const result = await client.models.Ingredient.create({
        name: ingredientName,
        quantity: parsedQuantity,
        checked: false,
      });
      console.log("成功しました:", result);
    } catch (error) {
      console.error("作成に失敗しました:", error);
    }
    //setIngredientList(await getIngredientList());
    setIngredientName('');
    setIngredientQuantity('');
    fetchIngredientList();
  };

  // 具材のチェック状態を更新
  const handleCheckIngredient = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientId = e.target.value;
    const checked = e.target.checked;
    updateIngredientList(ingredientId, { checked });
    //patchCheckIngredient(ingredientId, checked);
    // ↑の代わりに以下で代用
    console.log("チェック更新ボタンが押されました");
    try {
      const result = await client.models.Ingredient.update({
        id: ingredientId,
        checked: checked,
      });
      console.log("成功しました:", result);
    } catch (error) {
      console.error("チェック状態の更新に失敗しました:", error)
    }
  };

  // 具材の数量を更新
  const updateIngredientQuantity = async (id: string, quantity: number) => {
    updateIngredientList(id, { quantity });
    //patchIngredientQuantity(id, quantity);
    // ↑の代わりに以下で代用
    console.log("数量変更ボタンが押されました");
    try {
      const result = await client.models.Ingredient.update({
        id: id,
        quantity: quantity,
      });
      console.log("成功しました:", result);
    } catch (error) {
      console.error("数量の更新に失敗しました:", error)
    }
  };

  // 具材の数量を増減
  const handleQuantityChange = (id: string, increment: boolean) => {
    const ingredient = ingredientList.find((ingredient) => ingredient.id === id);
    if (ingredient && ingredient.quantity !== undefined && ingredient.quantity !== null) {
      const newQuantity = increment ? Math.min(ingredient.quantity + 1, 100) : Math.max(ingredient.quantity - 1, 1);
      updateIngredientQuantity(id, newQuantity);
    }
  };

  // 具材の削除
  const handleDeleteIngredient = async (id: string) => {
    setIngredientList((prevList) => prevList.filter((ingredient) => ingredient.id !== id));
    //deleteIngredient(id);
    // ↑の代わりに以下で代用
    console.log("削除ボタンが押されました");
    try {
      const result = await client.models.Ingredient.delete({
        id: id,
      });
      console.log("成功しました:", result);
    } catch (error) {
      console.error("具材の削除に失敗しました:", error)
    }
  };

  // ingredientListの更新処理を共通化
  const updateIngredientList = (id: string, updatedFields: Partial<Ingredient>) => {
    setIngredientList((prevList) =>
      prevList.map((ingredient) => (ingredient.id === id ? { ...ingredient, ...updatedFields } : ingredient))
    );
  };

  const handleSayHello = async () => {
    try {
      const result = await client.queries.sayHello({
        name: "Amplify"
      })
    } catch (error) {
      console.error("エラーが発生しました:", error)
    }
  }

  return (
    <Container maxWidth="xs">
      <Box display="flex" justifyContent="space-between" mt={4} mb={4}>
        <TextField
          label="具材名"
          variant="outlined"
          size="small"
          value={ingredientName}
          onChange={handleIngredientNameChange}
        />
        <TextField
          label="数量"
          variant="outlined"
          size="small"
          value={ingredientQuantity}
          onChange={handleIngredientQuantityChange}
        />
        {/* </Button>*<Button variant="contained" color="primary" onClick={handleCreateIngredient}> */}
        <Button variant="contained" color="primary" onClick={handleCreateIngredient}>
          作成
        </Button>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Box>
      <FormGroup>
        {ingredientList.map((ingredient) => (
          <Box key={ingredient.id} display="flex" justifyContent="space-between" mb={1}>
            <FormControlLabel
              control={
                <Checkbox
                  value={ingredient.id}
                  onChange={handleCheckIngredient}
                  checked={ingredient.checked ?? false}
                />
              }
              label={ingredient.name}
            />
            <Box display="flex" alignItems="center" ml="auto">
              <Button variant="outlined" onClick={() => handleQuantityChange(ingredient.id, false)}>
                -
              </Button>
              <Typography variant="body1" style={{ width: 60, textAlign: 'center' }}>
                {ingredient.quantity} 個
              </Typography>
              <Button variant="outlined" onClick={() => handleQuantityChange(ingredient.id, true)}>
                +
              </Button>
              <IconButton color="secondary" onClick={() => handleDeleteIngredient(ingredient.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </FormGroup>
      <Box mt={2}>  
        <Button variant="contained" color="secondary" onClick={handleSayHello}>  
          Say Hello  
        </Button>  
      </Box>  
    </Container>
  );
};

export default Register;