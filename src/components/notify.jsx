import { Component } from 'react';
import { toast } from 'react-toastify';

class Notify extends Component {
  static success(message) {
    toast(message, { type: toast.TYPE.SUCCESS });
  }

  static error(message) {
    toast(message, { type: toast.TYPE.ERROR });
  }

  static warning(message) {
    toast(message, { type: toast.TYPE.WARNING });
  }

  static info(message) {
    toast(message, { type: toast.TYPE.INFO });
  }
}

export default Notify;
