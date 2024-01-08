import { Link, LinkProps } from "wouter";

function MyLink(props: LinkProps & { href: string }) {
  return (
    <Link
      className="font-medium text-indigo-500 hover:text-indigo-700 hover:underline"
      href={props.href}
    >
      {props.children}
    </Link>
  );
}
export default MyLink;
