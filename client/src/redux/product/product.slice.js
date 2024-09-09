import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (farmerId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${farmerId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (response.ok) {
                return result;
            }
            return rejectWithValue(result);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (data, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            // Append fields to the FormData object
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('stocks', data.stocks);

            // Append image if available
            if (data.image) {
                formData.append('image', data.image);
            }
            const response = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                headers: {
                    "Authorization": data.token,
                },
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                return result;
            }
            return rejectWithValue(result);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (_id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (response.ok) {
                return result;
            }
            return rejectWithValue(result);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    products: [],
    status: "idle",
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.products = action.payload.data.products;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });

        builder.addCase(addProduct.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.products.push(action.payload.data.product);
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });

        builder.addCase(deleteProduct.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.products = state.products.filter((product) => product._id !== action.payload.data._id);
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;