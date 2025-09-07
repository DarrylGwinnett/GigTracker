import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();
  return (
    <Paper>
      {state?.error ? (
        <>
          <Typography
            variant="h3"
            color="secondary"
            gutterBottom
            sx={{ p: 4, pt: 2 }}
          >
            {state.error?.message || "There was a server error"}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ p: 4 }}>
            {state.error?.details || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" sx={{ p: 4, pt: 2 }}>
          No server error information available
        </Typography>
      )}
    </Paper>
  );
}
