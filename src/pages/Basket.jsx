import { useEffect, useState } from "react"
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"

const Basket = () => {
  const [basketItems, setBasketItems] = useState({})

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("basket")) || []
    const grouped = {}

    raw.forEach((item) => {
      if (grouped[item.id]) {
        grouped[item.id].quantity += 1
      } else {
        grouped[item.id] = { ...item, quantity: 1 }
      }
    })

    setBasketItems(grouped)
  }, [])

  const updateLocalStorage = (updated) => {
    const flat = Object.values(updated).flatMap((item) =>
      Array(item.quantity).fill(item)
    )
    localStorage.setItem("basket", JSON.stringify(flat))
  }

  const handleQuantityChange = (id, type) => {
    const updated = { ...basketItems }

    if (type === "increment") {
      updated[id].quantity += 1
    } else if (type === "decrement") {
      updated[id].quantity -= 1
      if (updated[id].quantity <= 0) {
        delete updated[id]
      }
    }

    setBasketItems(updated)
    updateLocalStorage(updated)
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Səbət
      </Typography>

      {Object.keys(basketItems).length === 0 ? (
        <Typography color="text.secondary">Səbət boşdur.</Typography>
      ) : (
        <Grid container spacing={2}>
          {Object.values(basketItems).map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: 180,
                  display: "flex",
                  alignItems: "center",
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
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: 200,
                        mb: 0.5,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item.id, "decrement")
                        }
                        size="small"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>
                        Miqdar: {item.quantity}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item.id, "increment")
                        }
                        size="small"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default Basket
