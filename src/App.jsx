import { useState } from 'react'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query) => {
  setLoading(true);

  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=10`
    const response = await fetch(url)
    const data = await response.json()

    // data.products is the array you need
    // set it into your results state
    // but filter out products with no name first
    const filteredData=data.products.filter((product)=>{product.product_name && product.product_name.trim()!==""});
    setResults(...filteredData);

  } catch (error) {
    console.error('Something went wrong:', error)
  } finally {
    setLoading(false)
  }
}

  return (
    <div>
      <h1>🥗 FoodFacts</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && (
        <p>Search for a food above to see its nutrition info.</p>
        )}
      <FoodList products={results} />
    </div>
  )
}

export default App