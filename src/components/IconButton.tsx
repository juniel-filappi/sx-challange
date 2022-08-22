interface IconButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function IconButton({ children, onClick, className }: IconButtonProps) {
  return (
    <button
      className={`text-xl hover:bg-bluesx hover:text-black transition-all duration-200 rounded-full p-2 ${className}`}
    >
      {children}
    </button>
  );
}
