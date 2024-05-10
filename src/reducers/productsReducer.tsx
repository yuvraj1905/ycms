import { Product } from "../types/Product";

export interface Action {
    type: string;
    payload?: any;
}

export const initialState: Product[] = [];

export const productsReducer = (state: Product[], action: Action): Product[] => {
    switch (action.type) {
        case 'dataSetter':{
            console.log(action.payload,'action payloadd')
            return [...action.payload]
        }

        case 'dataRemover':
            return []
        case 'DeleteProduct':{
            const updatedData=state.filter(
                (prevProduct) => prevProduct.productId !==action.payload
            )
            if(updatedData?.length>0){
                return [...updatedData]
            }
            else return []

        }

        case 'toggleInStock':{
            const updatedData=state.map((product) =>
                  product.productId === action.payload ? { ...product, inStock: !product.inStock } : product
                )
                return [...updatedData]
        }

        default:
            return state;
        
    }
};