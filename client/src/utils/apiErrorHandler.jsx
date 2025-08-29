import { toast } from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

export const handleApiError = (error, customMessage = 'حدث خطأ في الاتصال') => {
  console.error('API Error:', error);
  
  if (error.response?.status === 401) {
    // Unauthorized - clear token and redirect
    localStorage.removeItem('token');
    toast.error('انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى');
    window.location.href = '/';
    return 'unauthorized';
  } else if (error.response?.status === 404) {
    toast.error('البيانات غير موجودة');
    return 'not_found';
  } else if (error.response?.status === 403) {
    toast.error('ليس لديك صلاحية للقيام بهذا الإجراء');
    return 'forbidden';
  } else if (error.response?.status >= 500) {
    toast.error('خطأ في الخادم، يرجى المحاولة لاحقاً');
    return 'server_error';
  } else {
    const message = error.response?.data?.message || customMessage;
    toast.error(message);
    return 'general_error';
  }
};

// Higher order function for API calls with error handling
export const withErrorHandling = async (apiCall, successCallback, errorCallback) => {
  try {
    const response = await apiCall();
    if (response.data.success) {
      successCallback?.(response.data);
      return { success: true, data: response.data };
    } else {
      toast.error(response.data.message || 'حدث خطأ غير متوقع');
      errorCallback?.(response.data);
      return { success: false, error: response.data };
    }
  } catch (error) {
    const errorType = handleApiError(error);
    errorCallback?.(error);
    return { success: false, error, errorType };
  }
};