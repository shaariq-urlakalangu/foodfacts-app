import { useNavigate } from 'react-router-dom'

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate()

  if (saved.length === 0) {
    return (
      <div className="page">
        <h2>Saved Items</h2>
        <p>You haven't saved anything yet. Search for a food and save it from the detail page.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Saved Items ({saved.length})</h2>
      <div className="saved-items-container">
        {saved.map((product) => (
          <div key={product.code} className="saved-item">
            {product.image_small_url && (
              <img src={product.image_small_url} alt={product.product_name} className="saved-item-image" />
            )}
            <div className="saved-item-info">
              <h3>{product.product_name || 'Unknown Product'}</h3>
              {product.brands && <p className="brand">{product.brands}</p>}
            </div>
            <div className="saved-item-actions">
              <button
                onClick={() => navigate(`/product/${product.code}`)}
                className="view-details-button"
              >
                View Details
              </button>
              <button
                onClick={() => dispatch({ type: 'REMOVE', code: product.code })}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedPage
