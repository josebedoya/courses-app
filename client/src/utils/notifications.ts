import { notification } from 'antd';

type Types = {
  success: string;
  error: string;
  info: string;
  warning: string;
  warn: string;
  open: string;
};

export const showNotification = (
  type: keyof Types,
  message?: string,
  description?: string,
) => {
  notification[type]({ message, description, placement: 'bottomRight' });
};
