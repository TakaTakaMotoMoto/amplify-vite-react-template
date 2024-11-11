import React, { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      // 検索結果ページに遷移
      navigate(`/search-results?query=${query}`);
    }
  };

  return (
    <Container>
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <TextField
          label="検索"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mt: 2 }}>
          検索
        </Button>
      </Box>
    </Container>
  );
};

export default Search;
