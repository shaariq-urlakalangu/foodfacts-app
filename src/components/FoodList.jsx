import FoodCard from './FoodCard'

function FoodList({ products }) {
  if (products.length === 0) {
    return <p>No results found. Try a different search.</p>
  }

  return (
    <div className="food-list">
      {products.map((product, ind) => (
        <FoodCard
          key={ind}
          product={product}
        />
      ))}
    </div>
  )
}

export default FoodList