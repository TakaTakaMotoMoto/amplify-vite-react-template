import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const PhotoDisplay: React.FC = () => {
  const { photoId } = useParams<{ photoId: string }>();
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (photoId) {
      // 写真の詳細情報を取得する処理（例: API呼び出し）
      setTimeout(() => {
        setPhoto(`詳細な写真情報（ID: ${photoId}）`);  // ダミーの写真情報
      }, 1000);
    }
  }, [photoId]);

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h5">写真詳細ページ</Typography>
        {photo ? (
          <Typography>{photo}</Typography>
        ) : (
          <Typography>読み込み中...</Typography>
        )}
      </Box>
    </Container>
  );
};

export default PhotoDisplay;
