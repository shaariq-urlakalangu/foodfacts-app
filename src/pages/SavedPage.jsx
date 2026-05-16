import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../store/savedSlice'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function SavedPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const savedItems = useSelector(state => state.saved.items)

  if (savedItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={800}>
          Saved Items
        </Typography>
        <Typography color="text.secondary">
          You haven't saved anything yet. Search for a food and save it from the detail page.
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={800}>
        Saved Items ({savedItems.length})
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {savedItems.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {product.image_small_url && (
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image_small_url}
                  alt={product.product_name}
                  sx={{ objectFit: 'contain', p: 1 }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.product_name || 'Unknown Product'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.brands || 'Unknown Brand'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    navigate(`/product/${product.id}`, { state: { product } })
                  }
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => dispatch(removeItem(product.id))}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default SavedPage
