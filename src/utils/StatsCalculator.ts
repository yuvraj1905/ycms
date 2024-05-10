import React from 'react'
import { Product } from '../types/Product'


const StatsCalculator = (data: Product[]) => {
    console.log(data,'hook')
    if (!data || data?.length === 0) return null;
    let results:any={};
    const flagshipProducts=data.reduce((acc,curr)=>curr.price>3500?acc+1:acc,0);
    const outOfStockItems=data.reduce((acc,curr)=>!curr.inStock?acc+1:acc,0);
    const demandedBrandsCalc=data.reduce((acc:any,curr)=>{
        // console.log(acc.brand,typeof acc.brand)
        if(curr.brand in acc){
            return {...acc,[curr.brand]:acc[curr.brand]+1}
        }
        else{
            return {...acc,[curr.brand]:0}
        }
    },{})
    // console.log(demandedBrandsCalc,'demandedBrandsCalc')
    let max = -Infinity;
    let demandedBrand:string='';
    for (const key in demandedBrandsCalc) {
        // console.log(key)
        const value = demandedBrandsCalc[key];
         if (value > max) {
            max = value;
            demandedBrand=key
        }
    }
    const totalProducts=data.length;
    results={totalProducts,flagshipProducts,outOfStockItems,demandedBrand}
  return results
}

export default StatsCalculator