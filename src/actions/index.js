import ProductsList from '../api/product.json';

export const  fetchProducts = (product, times) => (
     setTimeout(() => product(ProductsList), times || 150)
)

export const ProductsData = () => dispatch => {
    dispatch({
        type: "GET_PRODUCTS_VALUE"
    });
    fetchProducts(products => {
        dispatch({
            type: "ACTUAL_PRODUCTS",
            products
        });
        return products;
    })
}