import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { getUserProfile } from '../../api/userApi';

// Initial state
const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: !!localStorage.getItem('token'),
};

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLoggedIn: true,
      };
    case LOGOUT:
      return { ...state, token: null, user: null, isLoggedIn: false };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login function to set token, user profile, and update state
  const login = async (token) => {
    try {
      const userProfile = await getUserProfile(token); // Fetch user profile
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userProfile));
      dispatch({ type: LOGIN, payload: { token, user: userProfile } });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Logout function to clear token and user data
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT });
  };

  // Effect to fetch the user profile on initial load if token exists
  useEffect(() => {
    if (state.token) {
      // Fetch user profile if token exists in localStorage
      getUserProfile(state.token)
        .then((userProfile) => {
          dispatch({
            type: LOGIN,
            payload: { token: state.token, user: userProfile },
          });
        })
        .catch((error) => {
          console.error('Error fetching user profile on mount:', error);
        });
    }
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// import React, { createContext, useReducer, useContext } from 'react';

// // Initial state
// const initialState = {
//   token: localStorage.getItem('token') || null,
//   user: JSON.parse(localStorage.getItem('user')) || null,
//   isLoggedIn: !!localStorage.getItem('token'),
// };

// // Action types
// const LOGIN = 'LOGIN';
// const LOGOUT = 'LOGOUT';

// // Reducer function
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case LOGIN:
//       return {
//         ...state,
//         token: action.payload.token,
//         user: action.payload.user,
//         isLoggedIn: true,
//       };
//     case LOGOUT:
//       return { ...state, token: null, user: null, isLoggedIn: false };
//     default:
//       return state;
//   }
// };

// // Create context
// const AuthContext = createContext();

// // Provider component
// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   const login = (token, user) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));
//     dispatch({ type: LOGIN, payload: { token, user } });
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     dispatch({ type: LOGOUT });
//   };

//   return (
//     <AuthContext.Provider value={{ state, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
