import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);  // 検索結果（例: 写真リスト）
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';

    // 検索APIやデータベースから検索結果を取得する処理
    if (query) {
      setLoading(true);
      // 例: API呼び出しで検索結果を取得する
      setTimeout(() => {
        setResults(['写真1', '写真2', '写真3']);  // ダミーの検索結果
        setLoading(false);
      }, 1000);
    }
  }, [location.search]);

  const handleViewPhoto = (photoId: string) => {
    navigate(`/photo/${photoId}`);  // 写真表示ページに遷移
  };

  return (
    <Container>
      <Box mt={4}>
        {loading ? (
          <Typography>読み込み中...</Typography>
        ) : (
          <>
            <Typography variant="h5">検索結果</Typography>
            {results.length === 0 ? (
              <Typography>結果がありません。</Typography>
            ) : (
              <Box mt={2}>
                {results.map((result, index) => (
                  <Box key={index} mb={2}>
                    <Button variant="outlined" onClick={() => handleViewPhoto(result)}>
                      {result} 詳細
                    </Button>
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default SearchResults;
