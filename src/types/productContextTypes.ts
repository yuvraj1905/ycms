import { Product } from "./Product";
import { Action } from "../reducers/productsReducer";

export interface ProductsContextType {
    data: Product[];
    dispatch: React.Dispatch<Action>;
    productsDataFetcher:()=>Promise<any>;
}