import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <span className={css.error}>{error} </span>;
};

export default ErrorMessage;
