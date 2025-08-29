import Swal from 'sweetalert2';

export const showConfirmationDialog = (options) => {
  const {
    title = 'هل أنت متأكد؟',
    text = 'لا يمكن التراجع عن هذه العملية',
    confirmButtonText = 'تأكيد',
    cancelButtonText = 'تراجع',
    confirmButtonColor = '#EF4444',
    cancelButtonColor = '#1B4166',
    onConfirm = () => {},
    onCancel = () => {}
  } = options;

  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    cancelButtonColor,
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) onConfirm();
    else onCancel();
  });
};

export const showSuccessMessage = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#1B4166',
  });
};

export const showErrorMessage = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#EF4444',
  });
};
