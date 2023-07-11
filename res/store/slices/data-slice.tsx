import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { DataItem } from "../../types";

const data: DataItem[] = [
  {
    id: 1,
    name: "Apple",
    fullName: "Apple (Wow veggies, Diamond, Extra Extra Large)",
    brandId: 1,
    brandName: "Wow veggies",
    qualityId: 1,
    qualityName: "Diamond",
    sizeId: 1,
    sizeName: "Extra Extra Large"
  },
  {
    id: 2,
    name: "Apple",
    fullName: "Apple (Amazing fruits, Gold, Extra Large)",
    brandId: 2,
    brandName: "Amazing fruits",
    qualityId: 2,
    qualityName: "Gold",
    sizeId: 2,
    sizeName: "Extra Large"
  },
  {
    id: 3,
    name: "Apple",
    fullName: "Apple (Best Feggies, Silver, Large)",
    brandId: 3,
    brandName: "Best Feggies",
    qualityId: 3,
    qualityName: "Silver",
    sizeId: 3,
    sizeName: "Large"
  },
  {
    id: 4,
    name: "Apple",
    fullName: "Apple (Top, Bronze, Medium)",
    brandId: 4,
    brandName: "Top",
    qualityId: 4,
    qualityName: "Bronze",
    sizeId: 4,
    sizeName: "Medium"
  },
  {
    id: 5,
    name: "Apple",
    fullName: "Apple (Superior Produce, Diamond, Small)",
    brandId: 5,
    brandName: "Superior Produce",
    qualityId: 1,
    qualityName: "Diamond",
    sizeId: 5,
    sizeName: "Small"
  },
  {
    id: 6,
    name: "Apple",
    fullName: "Apple (First Class, Silver, Extra Small)",
    brandId: 6,
    brandName: "First Class",
    qualityId: 2,
    qualityName: "Silver",
    sizeId: 6,
    sizeName: "Extra Small"
  },
  {
    id: 7,
    name: "Apple",
    fullName: "Apple (Wow veggies, Gold, Medium)",
    brandId: 1,
    brandName: "Wow veggies",
    qualityId: 3,
    qualityName: "Gold",
    sizeId: 4,
    sizeName: "Medium"
  },
  {
    id: 8,
    name: "Apple",
    fullName: "Apple (Amazing fruits, Bronze, Large)",
    brandId: 2,
    brandName: "Amazing fruits",
    qualityId: 4,
    qualityName: "Bronze",
    sizeId: 3,
    sizeName: "Large"
  },
  {
    id: 9,
    name: "Apple",
    fullName: "Apple (Best Feggies, Diamond, Small)",
    brandId: 3,
    brandName: "Best Feggies",
    qualityId: 1,
    qualityName: "Diamond",
    sizeId: 5,
    sizeName: "Small"
  },
  {
    id: 10,
    name: "Apple",
    fullName: "Apple (Top, Gold, Extra Extra Large)",
    brandId: 4,
    brandName: "Top",
    qualityId: 2,
    qualityName: "Gold",
    sizeId: 1,
    sizeName: "Extra Extra Large"
  },
  {
    id: 11,
    name: "Apple",
    fullName: "Apple (Superior Produce, Bronze, Extra Large)",
    brandId: 5,
    brandName: "Superior Produce",
    qualityId: 4,
    qualityName: "Bronze",
    sizeId: 2,
    sizeName: "Extra Large"
  },
  {
    id: 12,
    name: "Apple",
    fullName: "Apple (First Class, Diamond, Large)",
    brandId: 6,
    brandName: "First Class",
    qualityId: 1,
    qualityName: "Diamond",
    sizeId: 3,
    sizeName: "Large"
  },
  {
    id: 13,
    name: "Apple",
    fullName: "Apple (Wow veggies, Silver, Medium)",
    brandId: 1,
    brandName: "Wow veggies",
    qualityId: 3,
    qualityName: "Silver",
    sizeId: 4,
    sizeName: "Medium"
  },
  {
    id: 14,
    name: "Apple",
    fullName: "Apple (Amazing fruits, Diamond, Small)",
    brandId: 2,
    brandName: "Amazing fruits",
    qualityId: 1,
    qualityName: "Diamond",
    sizeId: 5,
    sizeName: "Small"
  },
  {
    id: 15,
    name: "Apple",
    fullName: "Apple (Best Feggies, Gold, Extra Small)",
    brandId: 3,
    brandName: "Best Feggies",
    qualityId: 2,
    qualityName: "Gold",
    sizeId: 6,
    sizeName: "Extra Small"
  },
  {
    id: 16,
    name: "Apple",
    fullName: "Apple (Top, Bronze, Extra Extra Large)",
    brandId: 4,
    brandName: "Top",
    qualityId: 4,
    qualityName: "Bronze",
    sizeId: 1,
    sizeName: "Extra Extra Large"
  },
  {
    id: 17,
    name: "Apple",
    fullName: "Apple (Superior Produce, Diamond, Extra Large)",
    brandId: 5,
    brandName: "Superior Produce",
    qualityId: 1,
    qualityName: "Diamond",
    sizeId: 2,
    sizeName: "Extra Large"
  },
  {
    id: 18,
    name: "Apple",
    fullName: "Apple (First Class, Gold, Large)",
    brandId: 6,
    brandName: "First Class",
    qualityId: 2,
    qualityName: "Gold",
    sizeId: 3,
    sizeName: "Large"
  },
  {
    id: 19,
    name: "Apple",
    fullName: "Apple (Wow veggies, Bronze, Medium)",
    brandId: 1,
    brandName: "Wow veggies",
    qualityId: 4,
    qualityName: "Bronze",
    sizeId: 4,
    sizeName: "Medium"
  },
  {
    id: 20,
    name: "Apple",
    fullName: "Apple (Amazing fruits, Diamond, Small)",
    brandId: 2,
    brandName: "Amazing fruits",
    qualityId: 1,
    qualityName: "Diamond",
    sizeId: 5,
    sizeName: "Small"
  },
  {
    id: 21,
    name: "Apple",
    fullName: "Apple (Best Feggies, Silver, Extra Small)",
    brandId: 3,
    brandName: "Best Feggies",
    qualityId: 3,
    qualityName: "Silver",
    sizeId: 6,
    sizeName: "Extra Small"
  },
  {
    id: 22,
    name: "Apple",
    fullName: "Apple (Top, Diamond, Extra Extra Large)",
    brandId: 4,
    brandName: "Top",
    qualityId: null,
    qualityName: null,
    sizeId: 1,
    sizeName: "Extra Extra Large"
  },
  {
    id: 23,
    name: "Apple",
    fullName: "Apple (Superior Produce, Gold, Extra Large)",
    brandId: 5,
    brandName: "Superior Produce",
    qualityId: 2,
    qualityName: "Gold",
    sizeId: 2,
    sizeName: "Extra Large"
  },
  {
    id: 24,
    name: "Apple",
    fullName: "Apple (First Class, Bronze, Large)",
    brandId: 6,
    brandName: "First Class",
    qualityId: 4,
    qualityName: "Bronze",
    sizeId: null,
    sizeName: null
  },
  {
    id: 25,
    name: "Apple",
    fullName: "Apple (Wow veggies, Diamond, Medium)",
    brandId: 1,
    brandName: "Wow veggies",
    qualityId: 1,
    qualityName: "Diamond",
    sizeId: 4,
    sizeName: "Medium"
  },
  {
    id: 26,
    name: "Apple",
    fullName: "Apple (Amazing fruits, Silver, Small)",
    brandId: 2,
    brandName: "Amazing fruits",
    qualityId: 3,
    qualityName: "Silver",
    sizeId: 5,
    sizeName: "Small"
  },
  {
    id: 27,
    name: "Apple",
    fullName: "Apple (Best Feggies, Diamond, Extra Small)",
    brandId: 3,
    brandName: "Best Feggies",
    qualityId: 1,
    qualityName: "Diamond",
    sizeId: 6,
    sizeName: "Extra Small"
  },
  {
    id: 28,
    name: "Apple",
    fullName: "Apple (Top, Gold, Extra Extra Large)",
    brandId: 4,
    brandName: "Top",
    qualityId: 2,
    qualityName: "Gold",
    sizeId: 1,
    sizeName: "Extra Extra Large"
  },
  {
    id: 29,
    name: "Apple",
    fullName: "Apple (Superior Produce, Silver, Extra Large)",
    brandId: 5,
    brandName: "Superior Produce",
    qualityId: 3,
    qualityName: "Silver",
    sizeId: null,
    sizeName: null
  },
  {
    id: 30,
    name: "Apple",
    fullName: "Apple (First Class, Diamond, Large)",
    brandId: 6,
    brandName: "First Class",
    qualityId: 1,
    qualityName: "Diamond",
    sizeId: 3,
    sizeName: "Large"
  }
];

export const fetchData = createAsyncThunk<DataItem[], void>("data/fetchData", async (): Promise<DataItem[]> => {
  return new Promise<DataItem[]>((resolve, reject) => {
    resolve(data);
  });
});
  
  interface DataState {
    status: string;
    error?: any;
    data: DataItem[];
  }
  
  const initialState: DataState = {
    status: "idle",
    data: []
  };
  
  const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchData.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      });
  
      builder.addCase(fetchData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });
  
      builder.addCase(fetchData.fulfilled, (state, action) => {
        state.status = "ready";
        state.data = action.payload;
      });
    }
  });
  
  export default dataSlice.reducer;