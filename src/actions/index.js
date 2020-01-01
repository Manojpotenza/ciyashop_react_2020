import ProductsList from '../api/product.json';

export const receiveProducts = () => {
    return async (dispatch)=>{
        const productdata=ProductsList;
        console.log('product =>',productdata)
        dispatch(
            {
                type: "ACTUAL_PRODUCTS",
                products:productdata
            }
        )
    }
};