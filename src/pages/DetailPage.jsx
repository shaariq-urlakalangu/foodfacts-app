import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )
        if (!cancelled) {
          setProduct(response.data.product)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load product details.')
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const isSaved = saved.some(p => p.code === barcode)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product: product })
    }
  }

  if (loading) return <div className="page"><p>Loading product details...</p></div>
  if (error) return <div className="page"><ErrorMessage message={error} /></div>
  if (!product) return <div className="page"><p>Product not found.</p></div>

  return (
    <div className="page detail-page">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>

      <div className="detail-header">
        {product.image_small_url && (
          <img src={product.image_small_url} alt={product.product_name} className="detail-image" />
        )}
        <div className="detail-info">
          <h2>{product.product_name || 'Unknown Product'}</h2>
          {product.brands && <p className="brand">{product.brands}</p>}
        </div>
      </div>

      <div className="nutrition-table">
        <h3>Nutrition per 100g</h3>
        <div className="nutrients-grid">
          {product.nutriments?.['energy-kcal_100g'] && (
            <div className="nutrient-item">
              <span className="nutrient-label">Calories</span>
              <span className="nutrient-value">{product.nutriments['energy-kcal_100g']} kcal</span>
            </div>
          )}
          {product.nutriments?.['proteins_100g'] && (
            <div className="nutrient-item">
              <span className="nutrient-label">Protein</span>
              <span className="nutrient-value">{product.nutriments['proteins_100g']}g</span>
            </div>
          )}
          {product.nutriments?.['carbohydrates_100g'] && (
            <div className="nutrient-item">
              <span className="nutrient-label">Carbs</span>
              <span className="nutrient-value">{product.nutriments['carbohydrates_100g']}g</span>
            </div>
          )}
          {product.nutriments?.['fat_100g'] && (
            <div className="nutrient-item">
              <span className="nutrient-label">Fat</span>
              <span className="nutrient-value">{product.nutriments['fat_100g']}g</span>
            </div>
          )}
          {product.nutriments?.['fiber_100g'] && (
            <div className="nutrient-item">
              <span className="nutrient-label">Fiber</span>
              <span className="nutrient-value">{product.nutriments['fiber_100g']}g</span>
            </div>
          )}
          {product.nutriments?.['sugars_100g'] && (
            <div className="nutrient-item">
              <span className="nutrient-label">Sugars</span>
              <span className="nutrient-value">{product.nutriments['sugars_100g']}g</span>
            </div>
          )}
        </div>
      </div>

      <button onClick={handleSaveToggle} className="save-button">
        {isSaved ? '★ Remove from Saved' : '☆ Save to My List'}
      </button>
    </div>
  )
}

export default DetailPage
