import Swal from "sweetalert2";
import API from "../../api";
import { 
  setLoading, 
  setError, 
  setMessage, 
  setAuthentication, 
  setUser, 
  setRoles, 
  setUsers,
  clearAuth 
} from '../reducer/loginReducer';

export const loginAction = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearAuth());
  
  try {
    const response = await API.post('/login', credentials);
    console.log("Login response: ", response.data);
    
    if (response.status === 200) {
      const token = response.data.access_token;
      const user_role = response.data.role;
      
      if (response.data.role) {
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user_role", user_role);
        }
        
        dispatch(setAuthentication(true));
        dispatch(setUser(response.data.role));
        dispatch(setMessage(response.data.msg));
      } else {
        dispatch(setError("Failed to login"));
      }
    }
  } catch (error) {
    console.log("Login Error:", error);
    dispatch(setError(error.response?.data?.message || "Failed to login"));
    dispatch(setAuthentication(false));
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
};

export const initializeAuth = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      dispatch(setAuthentication(true));
      return true;
    } catch (error) {
      console.error("Token validation error: ", error);
      dispatch(setAuthentication(false));
      return false;
    }
  } else {
    dispatch(setAuthentication(false));
    return false;
  }
};

export const addUserAction = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await API.post('/register', userData);
    if (response.status === 200 || response.status === 201) {
      Swal.fire("User added successfully!!");
      dispatch(setMessage(response.data.message || "User added successfully"));
    } else {
      dispatch(setError(response.data.message || "Oops, Failed to add user!!"));
    }
  } catch (error) {
    console.log("Failed to add user", error);
    dispatch(setError(error.response?.data?.message || "Error in adding user"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchUserRoleAction = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await API.get('/getRoles');
    if (response.data && Array.isArray(response.data)) {
      dispatch(setRoles(response.data));
      dispatch(setMessage(response.data.message));
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    console.log("Error in fetching user roles", error);
    dispatch(setError(error.response?.data?.message || "Error while fetching data"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const showUserAction = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await API.get("/getUsersList");
    if (response.data && Array.isArray(response.data)) {
      dispatch(setUsers(response.data));
      dispatch(setMessage(response.data.message));
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    console.error('Fetch Users Error:', error);
    dispatch(setError(error.response?.data?.message || "Error while fetching users"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    dispatch(clearAuth());
    dispatch(setMessage("Logged out successfully"));
  } catch (error) {
    console.error("Logout error:", error);
    dispatch(setError("Error during logout"));
  }
};