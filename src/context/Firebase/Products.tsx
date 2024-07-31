import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  Action,
  initialState,
  productsReducer,
} from "../../reducers/productsReducer";
import { Product } from "../../types/Product";
import { useFirebaseProvider } from "./Firebase";
import { ProductsContextType } from "../../types/productContextTypes";

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [data, dispatch] = useReducer(productsReducer, initialState);
  const firebase = useFirebaseProvider();
  const productsDataFetcher = async () => {
    if (firebase?.data?.user?.email) {
      try {
        const productsSnapshot: any = await firebase?.listProducts();
        if (productsSnapshot?.docs?.length > 0) {
          let productsData: any[] = await Promise.all(
            productsSnapshot?.docs?.map(async (doc: any) => {
              const product = await doc.data();
              console.log(product, "singleProduct");

              if (firebase?.data?.user?.email === product?.userEmail) {
                let url = "";
                if (product?.image) {
                  url = await firebase.getImageUrl(product.image, product);
                }
                return { ...product, productId: doc.id, image: url };
              }
              return null;
            })
          );
          productsData = productsData?.filter((prod: any) => prod !== null);
          if (productsData && productsData[0]) {
            dispatch({ type: "dataSetter", payload: productsData });
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    productsDataFetcher();
  }, [firebase?.data]);

  return (
    <ProductsContext.Provider value={{ data, dispatch, productsDataFetcher }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "useProducts must be used within a ProductsContextProvider"
    );
  }
  return context;
};
