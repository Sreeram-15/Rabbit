import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to Fetch Products by Collections and optioanal filters
export const fetchProductsByFilters=createAsyncThunk(
    "products/fetchByFilters",
    async({category,gender,color,size,material,brand,minPrice,maxPrice,sortBy,collection,limit,search,})=>{
        const query=new URLSearchParams();
        if(collection) query.append("collection",collection);
        if(gender) query.append("gender",gender);
        if(category) query.append("category",category);
        if(color) query.append("color",color);
        if(size) query.append("size",size);
        if(brand) query.append("brand",brand);
        if(material) query.append("material",material);
        if(maxPrice) query.append("maxPrice",maxPrice);
        if(minPrice) query.append("minPrice",minPrice);
        if(sortBy) query.append("sortBy",sortBy);
        if(limit) query.append("limit",limit);
        if(search) query.append("search",search);

        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
        );
        return response.data;
    }
);

// Async thunk to fetch a single product by ID
export const fetchProductDetails=createAsyncThunk(
    "products/fetchProductsDetails",
    async(id)=>{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        return response.data;
    }
);

// Async thunk to fetch similar products 
export const fetchSimilarProducts=createAsyncThunk(
    "products/fetchSimilarProducts",
    async(id)=>{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`);
        return response.data;
    }
);

// Async thunk to Update product
export const updateProduct=createAsyncThunk(
    "products/updateProduct",
    async({id,productData})=>{
        const response=await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            productData,{
                headers:{
                    authorization:`Bearer ${localStorage.getItem("userToken")}`,
                }
            }
        );
        return response.data;
    }
);

const productSlice=createSlice({
    name:"products",
    initialState:{
        products:[],
        selectedProduct:null,
        similarProducts:[],
        loading:false,
        error:null,
        filters:{
            category:"",
            size:"",
            color:"",
            brand:"",
            material:"",
            gender:"",
            minPrice:"",
            maxPrice:"",
            limit:"",
            collection:"",
            sortBy:"",
            search:"",
        },
    },
    reducers:{
        setFilters: (state,action)=>{
            state.filters={...state.filters,...action.payload};
        },
        clearFilters: (state,action)=>{
            state.filters={
                category:"",
                size:"",
                color:"",
                brand:"",
                material:"",
                gender:"",
                minPrice:"",
                maxPrice:"",
                limit:"",
                collection:"",
                brand:"",
                sortBy:"",
                search:"",
            };
        },
    },
    extraReducers:(builder)=>{
        // handle fetching products with filter
        builder
        .addCase(fetchProductsByFilters.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProductsByFilters.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=Array.isArray(action.payload)?action.payload:[];
            state.error=null;
        })
        .addCase(fetchProductsByFilters.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message||"Unkown error";
        })
        // handle fetching single product details
        .addCase(fetchProductDetails.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.selectedProduct=action.payload;
            state.error=null;
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message||"Unkown error";
        })
        // handle fetching similar products
        .addCase(fetchSimilarProducts.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchSimilarProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.similarProducts=Array.isArray(action.payload)?action.payload:[];
            state.error=null;
        })
        .addCase(fetchSimilarProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message||"Unkown error";
        })
        // handle updating a product
        .addCase(updateProduct.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading=false;
            const updatedProduct=action.payload;
            const index=state.products.findIndex((p)=>p._id===updatedProduct._id);
            if(index!==-1){
                state.products[index]=updatedProduct;
            }
            state.error=null;
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message||"Unkown error";
        });
    },
});

export const {setFilters,clearFilters}=productSlice.actions;

export default productSlice.reducer;