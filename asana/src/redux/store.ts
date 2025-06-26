import { configureStore } from '@reduxjs/toolkit';
// import signupReducer from './signupSlice';
// import authReducer from './signupSlice';
// import loginReducer from './loginSlice'
// import userReducer from './groupSlice';
// import groupReducer from './createGroupSlice';
// import groupsReducer from './useringroupSlice';
// import groupExpenseReducer from './groupExpenseSlice'
import authReducer from './signup-slice'

export const store = configureStore({
  reducer: {
    
    // auth: authReducer,
    // login: loginReducer,
    // user: userReducer,
    // group: groupReducer,
    //  groups: groupsReducer,
    //   groupExpense: groupExpenseReducer,
    auth:authReducer

    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;