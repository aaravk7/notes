import { ReactNode } from "react";

interface SelectProps {
  value: string;
  children: ReactNode;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

function Select(props: SelectProps) {
  return (
    <select
      className="w-full border rounded-md border-slate-300 outline-none focus:border-indigo-700 active:border-indigo-700 py-[10px] px-4 transition-all"
      value={props.value}
      required={props.required}
      onChange={(e) => props.onChange(e.currentTarget.value)}
    >
      <option value="" hidden>
        {props.placeholder}
      </option>
      {props.children}
    </select>
  );
}
export default Select;
