import API_BASE_URL from '../config/axios';
import { toast } from 'react-toastify';
import axios from 'axios';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST,
  
});

export const resetPasswordSuccess = (formData) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload:formData
});

export const resetPasswordFailure = (error) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error,
});

export const startResetPassword = (formData,toggle,navigate) => {
  return async (dispatch) => {
    dispatch(resetPasswordRequest());
    try {
      const response = await axios.post( `${API_BASE_URL}/users/reset-password`, formData );
      console.log(response.data);
      dispatch(resetPasswordSuccess(response.data));
      toggle()
      toast.success(response.data.message) ;
      navigate('/login')
    } catch (error) {
        console.log(error)
      dispatch(resetPasswordFailure(error.response?.data?.message));
    }
  };
};