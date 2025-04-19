import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textcolor: string;
  onClick?: () => void | Promise<void>; // Optional async function for click event
};

const NavigationLink = (props: Props) => {
  const handleClick = async (e: React.MouseEvent) => {
    if (props.onClick) {
      e.preventDefault(); // Prevent the default navigation if onClick is provided
      await props.onClick(); // Execute the onClick function
    }
  };

  return (
    <Link
      className="nav-link"
      to={props.to}
      style={{ background: props.bg, color: props.textcolor }}
      onClick={handleClick} // Attach the handleClick to the onClick event
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
