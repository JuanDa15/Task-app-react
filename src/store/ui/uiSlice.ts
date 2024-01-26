import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload.loading
    }
  }
})

export const { setLoading } = uiSlice.actions
