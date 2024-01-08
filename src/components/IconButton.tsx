type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
function IconButton(props: IconButtonProps) {
  return (
    <button className="text-slate-600 hover:text-indigo-700" {...props}>
      {props.children}
    </button>
  );
}
export default IconButton;
