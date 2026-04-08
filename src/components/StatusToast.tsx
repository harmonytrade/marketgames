interface StatusToastProps {
  tone: 'success' | 'info' | 'error';
  message: string;
}

export const StatusToast = ({ tone, message }: StatusToastProps) => (
  <div className={`status-toast status-toast--${tone}`} role="status" aria-live="polite">
    <span>{message}</span>
  </div>
);
