import toast from 'react-hot-toast';

class ToastClass {
  success(message: string) {
    toast.success(message, {
      icon: null,
      style: {
        padding: '5px 8px',
        color: '#EBFFF6',
        background: '#2D8331',
        borderRadius: '4px',
        fontWeight: '500',
        width: 'auto',
        height: 'auto',
        textAlign: 'left',
        fontSize: '14px'
      }
    });
  }

  error(message: string) {
    toast.error(message, {
      icon: null,
      style: {
        padding: '5px 12px',
        color: '#fff',
        background: '#da072b',
        borderRadius: '4px',
        fontWeight: '500',
        width: 'auto',
        height: 'auto',
        textAlign: 'left',
        fontSize: '14px'
      }
    });
  }

  info(message: string) {
    toast.success(message, {
      icon: null,
      style: {
        padding: '5px 12px',
        color: '#fff',
        background: '#E83289',
        borderRadius: '4px',
        fontWeight: '500',
        width: 'auto',
        height: 'auto',
        textAlign: 'left',
        fontSize: '14px'
      }
    });
  }
}

export const Toast = new ToastClass();
