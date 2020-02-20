import ProductsList from '../api/product.json';

export const receiveProducts = () => {
    return async (dispatch)=>{
        const productdata=ProductsList;
        dispatch(
            {
                type: "ACTUAL_PRODUCTS",
                products:productdata
            }
        )
    }
};