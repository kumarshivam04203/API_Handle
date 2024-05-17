import express from "express";
const app = express();

app.get("/api/products", (req, res) => {
  const products = 
    [
      {
        id: 1,
        name: "document",
        price: 19.99,
        image: "https://example.com/product_a.jpg",
      },
      {
        id: 2,
        name: "product_doc",
        price: 29.99,
        image: "https://example.com/product_b.jpg",
      },
      {
        id: 3,
        name: "img",
        price: 39.99,
        image: "https://example.com/product_c.jpg",
      },
      {
        id: 4,
        name: "last_img",
        price: 49.99,
        image: "https://example.com/product_d.jpg",
      },
    ]

    //https://localhost:3000/api/products?search=document

    if(req.query.search) {
        const filterProducts = products.filter(product => 
            product.name.includes(req.query.search)
        )
        res.send(filterProducts);
        return;
    }


    setTimeout(() => {
        res.send(products)
    }, 1000)

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
