import Main from "../app/main";
import Product from "../app/product";

export default [
    {
        path: "/",
        element: <Main />
    },
    {
        path: "product/:id",
        element: <Product/>
    },
]
