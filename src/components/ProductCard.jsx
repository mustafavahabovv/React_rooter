import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
} from "@mui/material"

const ProductCard = ({ product, onAddFavorite, onAddBasket }) => {
  return (
    <Card sx={{ maxWidth: 300, marginBottom: 2, boxShadow: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        style={{ objectFit: "contain", padding: 10 }}
      />
      <CardContent>
        <Typography variant="h6" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onAddFavorite} variant="outlined">
          Favori
        </Button>
        <Button size="small" onClick={onAddBasket} variant="contained">
          Səbətə at
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
