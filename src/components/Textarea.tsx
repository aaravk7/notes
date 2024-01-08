interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

function TextArea(props: TextAreaProps) {
  return (
    <textarea
      className="w-full border rounded-md border-slate-300 outline-none focus:border-indigo-700 active:border-indigo-700 py-[10px] px-4 transition-all"
      value={props.value}
      minLength={props.minLength}
      maxLength={props.maxLength}
      required={props.required}
      onChange={(e) => props.onChange(e.currentTarget.value)}
      placeholder={props.placeholder}
    />
  );
}
export default TextArea;
