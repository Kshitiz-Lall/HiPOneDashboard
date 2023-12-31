import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',

  initialState: {
    data: {
      Total_Que_Count: 0,
      Positive_Count: 0,
      Negative_Count: 0,
      count_questions_dont_know: 0,
      unique_users: 0
    },
    conversationData: [],
    ContactUsData: []
  },

  reducers: {
    setData: (state, action) => {
      state.data = {
        Total_Que_Count: action.payload.Total_Que_Count || 0,
        Positive_Count: action.payload.Positive_Count || 0,
        Negative_Count: action.payload.Negative_Count || 0,
        count_questions_dont_know: action.payload.count_questions_dont_know || 0,
        unique_users: action.payload.unique_users || 0
      };
    },

    setConversationData: (state, action) => {
      state.conversationData = action.payload;
    },

    setContactUsData: (state, action) => {
      state.ContactUsData = action.payload;
    }
  }
});

export const { setData, setConversationData, setContactUsData } = dashboardSlice.actions;
export const getConversationData = (state) => state.dashboard.conversationData;
export const getContactUsData = (state) => state.dashboard.ContactUsData;

export default dashboardSlice.reducer;
