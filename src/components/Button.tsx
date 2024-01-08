import { LoaderIcon } from "react-hot-toast";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  isLoading?: boolean;
}

function Button({
  variant = "solid",
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={props.disabled || isLoading}
      className={`py-[10px] px-8 max-md:py-[6px] max-sm:px-3 whitespace-nowrap border border-indigo-500 rounded-md ${
        variant === "solid" ? "bg-indigo-500 text-white" : ""
      } ${
        props.disabled ? "" : "hover:bg-indigo-700 hover:text-white"
      } shadow-md transition-all font-medium`}
      {...props}
    >
      {isLoading ? <LoaderIcon className="h-6 w-6 mx-auto" /> : props.children}
    </button>
  );
}
export default Button;
