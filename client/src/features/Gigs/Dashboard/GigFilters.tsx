import { FilterList, Event } from "@mui/icons-material";
import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";

export default function GigFilters() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 3, borderRadius: 3 }}
    >
      <Paper sx={{ borderRadius: 3, p: 3 }}>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", mb: 2 , color: 'primary.main'}}
          >
            <FilterList sx={{ mr: 1 }} />
            Filters
          </Typography>
          <MenuList>
            <MenuItem>
              <ListItemText primary="All gigs" />
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm going" />
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm hosting" />
            </MenuItem>
          </MenuList>
        </Box>
      </Paper>
      <Box component={Paper} sx={{ borderRadius: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, alignItems: "center", color: 'primary.main' }}>
          <Event sx={{ mr: 1 }} />
          Select Date
        </Typography>
        <Calendar />
      </Box>
    </Box>
  );
}
