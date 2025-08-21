import { useEffect, useState } from "react";
import { Container, CssBaseline, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";

function App() {
  const [gigs, setGigs] = useState<Gig[]>([]);

  useEffect(() => {
    axios
      .get<Gig[]>("https://localhost:5001/api/gigs")
      .then((response) => setGigs(response.data));
  }, []);
  return (
    <>
    <CssBaseline/>
      <NavBar />
      <Container maxWidth='xl' sx={{mt: 3, ml: 3}}>
      <List>
        {gigs.map((gig) => (
          <ListItem key={gig.id}>
            <ListItemText>{gig.title}</ListItemText>
          </ListItem>
        ))}
      </List>
      </Container>
    </>
  );
}

export default App;
