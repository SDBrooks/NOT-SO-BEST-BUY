import React, {useState, useEffect, useContext} from "react";
import { SearchResultsContext, SearchValueContext } from "../components/SearchContext";
import Products from "../components/Products";
import { Link, useParams } from "react-router-dom";
import "../styles/Product.css"
import Filter from '../components/Filter'
import '../styles/SearchResults.css'


const SearchResults = () => {

const {searchValue, setSearchValue} = useContext(SearchValueContext)
const {searchResults, setSearchResults} = useContext(SearchResultsContext)

let {id, val} = useParams()
const [catfilteredResults, setCatFilteredResults] = useState([])
const [pricefilteredResults, setPriceFilteredResults] = useState([])
const [view, setView] = useState(false)
useEffect(() => {
    let filtering = []
    if (val === "0" && id !== "0") {
        filtering = searchResults.filter((results) => {
            return results.Category_id === parseInt(id)
        })
    }
    else if (val !=="0" && id!== "0"){
        filtering = pricefilteredResults.filter((results) => {
            return results.Category_id === parseInt(id)
        })
    }
    setCatFilteredResults(filtering)
}, [id])

useEffect(() => {
    let filtering = []
    if (id ==="0" && val !== "0") {
        filtering = searchResults.filter((results) => {
        return results.Price <= parseInt(val)}
    )}
    else if (id !== '0' && val !== "0") {
        filtering = catfilteredResults.filter((results) => {
            return results.Price <= parseInt(val)
        })
    }
    setPriceFilteredResults(filtering)
    console.log(pricefilteredResults)
}, [val])

    return (
        <div className="container">
            <div>

            <Filter
                setView={setView}
                searchResults={searchResults}/>
            </div>
            <div className="searchResults">
            <h1>Search Results</h1>
                {id==="0" && val === "0" && searchResults.length !==0 && searchResults.map((value) => (
                    <div className="product-container" >
                        <Link to={`/product/${value.id}`}>
                        <Products
                            key={value.id}
                            Name={value.Name}
                            Image={value.Image}
                            Price={value.Price}/>
                        </Link>
                    </div>
                ))}

                {!view && catfilteredResults.length !==0 && catfilteredResults.map((value) => (
                                    <div className="product-container" >
                                        <Link to={`/product/${value.id}`}>
                                        <Products
                                            key={value.id}
                                            Name={value.Name}
                                            Image={value.Image}
                                            Price={value.Price}/>
                                        </Link>
                                    </div>
                                ))}
                {view && pricefilteredResults.length !==0 && pricefilteredResults.map((value) => (
                                    <div className="product-container" >
                                        <Link to={`/product/${value.id}`}>
                                        <Products
                                            key={value.id}
                                            Name={value.Name}
                                            Image={value.Image}
                                            Price={value.Price}/>
                                        </Link>
                                    </div>
                                ))}
                            </div>

            
        </div>
    );
}

export default SearchResults;