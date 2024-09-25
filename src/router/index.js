import App from "../app";
import Product from "../app/product";

export default [
    {
        path: "/",
        element: <App />
    },
    {
        path: "product/:id",
        element: <Product/>
    },
]
