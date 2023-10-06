import React from "react";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Box>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
