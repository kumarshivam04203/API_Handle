import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // const [products, error, loading ] = customReactQuery('/api/products')

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("/api/products?search=" + search, {
          signal: controller.signal,
        });
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
          return;
        }
        setError(error);
        setLoading(false);
      }
    })();
    //cleanUp
    return () => {
      controller.abort();
    };
  }, [search]);

  // if(error){
  //   return <h3>Something want wrong</h3>
  // }
  // if(loading) {
  //   return <h3>Loading...</h3>
  // }

  return (
    <>
      <h1>API handle in react</h1>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <h3>Loading...</h3>}
      {error && <h3>Something want wrong</h3>}

      <p>Number products : {products.length} </p>
    </>
  );
}

export default App;

//setup reactQuery
// const customReactQuery = (urlPath) => {
//   return [products, error, loading];
// };
