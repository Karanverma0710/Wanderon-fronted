import { toast } from 'react-toastify';
import { TOAST_TYPES } from '../utils/constants';

const useToast = () => {
  const showToast = (message, type = TOAST_TYPES.INFO) => {
    const options = {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    switch (type) {
      case TOAST_TYPES.SUCCESS:
        toast.success(message, options);
        break;
      case TOAST_TYPES.ERROR:
        toast.error(message, options);
        break;
      case TOAST_TYPES.WARNING:
        toast.warning(message, options);
        break;
      case TOAST_TYPES.INFO:
      default:
        toast.info(message, options);
        break;
    }
  };

  const success = (message) => showToast(message, TOAST_TYPES.SUCCESS);
  const error = (message) => showToast(message, TOAST_TYPES.ERROR);
  const warning = (message) => showToast(message, TOAST_TYPES.WARNING);
  const info = (message) => showToast(message, TOAST_TYPES.INFO);

  const dismiss = () => toast.dismiss();
  const dismissAll = () => toast.dismiss();

  return {
    showToast,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
  };
};

export default useToast;
