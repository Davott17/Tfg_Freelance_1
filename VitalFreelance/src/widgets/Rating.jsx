import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating() {
  const [value, setValue] = React.useState(3);

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#00f8ff',
    },
    '& .MuiRating-iconHover': {
      color: '#00f8ff',
    },
  });
  return (
    <Box>
      <Typography component="legend">Puntuación</Typography>
      <StyledRating name="read-only"  value={value} readOnly  size="large"/>
    </Box>
  );
}
