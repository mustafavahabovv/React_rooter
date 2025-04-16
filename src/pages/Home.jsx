import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { Grid, Typography } from "@mui/material"

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  const addToLocal = (key, product) => {
    const existing = JSON.parse(localStorage.getItem(key)) || []
    localStorage.setItem(key, JSON.stringify([...existing, product]))
  }

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Məhsullar
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              product={product}
              onAddFavorite={() => addToLocal("favorites", product)}
              onAddBasket={() => addToLocal("basket", product)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Home
