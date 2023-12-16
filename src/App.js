import { useEffect, useRef, useState } from 'react';
import './App.css';
import Product from './Product';
// import axios from 'axios';

function App() {
  const [products, setProducts] = useState({})
  const [currPage, setCurrPage] = useState(1)
  const perPage = useRef(6);
  const total = useRef(0)
  console.log(currPage);
  const getProducts = async ()=>{
    const data = await fetch("https://dummyjson.com/products?limit="+perPage.current+"&skip="+(currPage-1)*perPage.current);
    const json = await data.json()
    setProducts(json)
    total.current = json.total
    // const a = axios.get("https://dummyjson.com/products").then(({data}) => console.log(data));
  }
  useEffect(()=>{
    getProducts()
  },[currPage])
  return (
    <div>
      <div className="App">
        {products["products"] &&
          products.products.map((prod) => {
            return <Product key={prod.id} product={prod} />;
          })}
      </div>
      <div className="page-wrapper">
        <div
          className={currPage === 1 ? "page disable" : "page"}
          onClick={() => setCurrPage(currPage - 1)}
        >
          Prev
        </div>
        {[...Array(Math.ceil(total.current / perPage.current))].map(
          (val, index) => {
            return (
              <div
                className={currPage === index + 1 ? "page current" : "page"}
                key={index + 1}
                onClick={() => setCurrPage(index + 1)}
              >
                {index + 1}
              </div>
            );
          }
        )}
        <div
          className={
            currPage === Math.ceil(total.current / perPage.current)
              ? "page disable"
              : "page"
          }
          onClick={() => setCurrPage(currPage + 1)}
        >
          Next
        </div>
      </div>
    </div>
  );
}

export default App;
