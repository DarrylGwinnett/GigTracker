import { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import GigDashboard from "../../features/Gigs/Dashboard/GigDashboard";

function App() {
  const [gigs, setGigs] = useState<Gig[]>([]);

  useEffect(() => {
    axios
      .get<Gig[]>("https://localhost:5001/api/gigs")
      .then((response) => setGigs(response.data));
  }, []);
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3, ml: 3 }}>
<GigDashboard gigs={gigs}/>

      </Container>
    </>
  );
}

export default App;
