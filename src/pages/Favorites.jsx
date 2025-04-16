import { useEffect, useState } from "react"
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardMedia,
} from "@mui/material"

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(data)
  }, [])

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Favorilər
      </Typography>
      {favorites.length === 0 ? (
        <Typography color="text.secondary">Heç bir favori yoxdur.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: "contain", p: 1 }}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {item.title}
                  </Typography>
                  <Typography>${item.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default Favorites
