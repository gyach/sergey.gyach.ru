type MaxIconProps = {
  size?: number;
  className?: string;
};

export function MaxIcon({ size = 20, className }: MaxIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M20.8 11.35c0 5.1-3.7 8.64-8.92 8.64-1.72 0-3.23-.38-4.48-1.08l-2.67 1.02c-1.02.39-2-.5-1.72-1.56l.86-3.27c-.48-1.04-.73-2.27-.73-3.67 0-5.1 3.75-8.42 8.88-8.42 5.11 0 8.78 3.29 8.78 8.34ZM8.78 14.04c.26.42.6.75 1.03.99.63.36 1.41.53 2.3.53 2.55 0 4.38-1.72 4.38-4.14 0-2.38-1.82-4.06-4.39-4.06-2.64 0-4.51 1.69-4.51 4.11 0 .61.11 1.17.33 1.66l-.38 1.45 1.24-.54Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
