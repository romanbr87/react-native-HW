import { configureStore } from '@reduxjs/toolkit'
import data from './slices/data-slice';
import { DataItem } from '../types';

export interface State {
  data: {
    data: DataItem[];
  }
}

export const store = configureStore({
    reducer: {
      data
    }
  })
  
  