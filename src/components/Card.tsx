import MockImage from "../assets/images/mock-image.png";
import MockImage1 from "../assets/images/mock-image-1.png";
import ICard from "../types/Card";

import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Card = ({ name, index }: ICard) => {
  return (
    <MuiCard>
      <CardMedia
        component="img"
        image={(index as number) % 2 ? MockImage : MockImage1}
        alt={name}
      />

      <CardContent>
        <Typography variant="h5" component="div" align="center">
          {name}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
