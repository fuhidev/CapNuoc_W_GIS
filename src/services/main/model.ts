export * from './user/model';

export interface Alert {
  message?: string
  type?: 'success' | 'error' | 'info' | 'warning'
};