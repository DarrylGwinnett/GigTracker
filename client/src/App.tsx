import { useEffect, useState } from "react";
import "./App.css";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

function App() {
  const [gigs, setGigs] = useState<Gig[]>([]);

  useEffect(() => {
    axios.get<Gig[]>("https://localhost:5001/api/gigs")
      .then((response) => setGigs(response.data));
  }, []);
  const title = "welcome to react";
  return (
  <>
    <Typography variant="h3">{title}</Typography>
    <List>
      {gigs.map((gig) => (
        <ListItem key={gig.id}><ListItemText>{gig.title}</ListItemText></ListItem>
      ))}
    </List>
  </>
  )
}

export default App;
