import InputMask from "react-input-mask";

interface InputProps {
  name: string;
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  mask: string;
}

export function FormInputMask(props: InputProps) {
  return (
    <div className="flex flex-col relative">
      <label htmlFor={props.id} className="text-md mb-1">
        {props.label}
      </label>
      <InputMask
        {...props}
        className="bg-transparent border-[1px] border-white px-4 py-2 rounded-sm mx-1 mb-1 text-white hover:brightness-75 transition-all duration-200"
      />
      {props.error && <p className="text-red-500">{props.error}</p>}
    </div>
  );
}
