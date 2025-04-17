import { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Box,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState({});

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem('favorites')) || [];
    const grouped = {};
    raw.forEach(item => {
      if (grouped[item.id]) {
        grouped[item.id].quantity += 1;
      } else {
        grouped[item.id] = { ...item, quantity: 1 };
      }
    });
    setFavoriteItems(grouped);
  }, []);

  const updateLocalStorage = items => {
    const flat = Object.values(items).flatMap(item =>
      Array(item.quantity).fill(item).map(i => {
        const { quantity, ...rest } = i;
        return rest;
      })
    );
    localStorage.setItem('favorites', JSON.stringify(flat));
  };

  const handleQuantityChange = (id, type) => {
    const updated = { ...favoriteItems };
    if (type === 'increment') {
      updated[id].quantity += 1;
    } else if (type === 'decrement') {
      updated[id].quantity -= 1;
      if (updated[id].quantity <= 0) {
        delete updated[id];
      }
    }
    setFavoriteItems(updated);
    updateLocalStorage(updated);
  };

  const handleDelete = id => {
    const updated = { ...favoriteItems };
    delete updated[id];
    setFavoriteItems(updated);
    updateLocalStorage(updated);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Favorilər
      </Typography>

      {Object.keys(favoriteItems).length === 0 ? (
        <Typography color="text.secondary">
          Heç bir favori yoxdur.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {Object.values(favoriteItems).map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: 180,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1,
                  boxShadow: 2,
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: 'contain',
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ flexGrow: 1 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: 200,
                        mb: 0.5,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                  </CardContent>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, 'decrement')}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>
                      Miqdar: {item.quantity}
                    </Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, 'increment')}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item.id)}
                      sx={{ ml: 'auto', color: 'error.main' }}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Favorites;
