interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button(props: ButtonProps) {
  return (
    <button
      type={props.type || "button"}
      className={`
      border-none px-4 py-2 rounded-xl cursor-pointer mx-1 mb-1 text-black bg-bluesx hover:brightness-75 transition-all duration-200 ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
