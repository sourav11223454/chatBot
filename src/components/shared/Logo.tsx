
import { Link } from 'react-router-dom'; // Corrected the import
import Typography from '@mui/material/Typography';

const logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Link to="/">
        <img
          src="openai.png"
          alt="openai"
          width={30}
          height={30}
          className="image inverted"
        />
      </Link>{" "}
      <Typography
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
            marginRight: "auto",
            fontWeight: "800",
            textShadow: "2px 2px 200px #008",
          }}
        >
          <span style={{ fontSize: "20px" }}>MERN</span>-GPT
        </Typography>
    </div>
  );
};

export default logo;
