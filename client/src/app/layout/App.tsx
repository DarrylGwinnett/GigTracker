import { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import GigDashboard from "../../features/Gigs/Dashboard/GigDashboard";

function App() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [selectedGig, setSelectedGig] = useState<Gig | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Gig[]>("https://localhost:5001/api/gigs")
      .then((response) => setGigs(response.data));
  }, []);

  const handleSelectGig = (id: string) => {
    setSelectedGig(gigs.find((x) => x.id === id));
  };

  const handleCancelSelectGig = () => {
    setSelectedGig(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectGig(id);
    else handleCancelSelectGig();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleSubmitForm = (gig: Gig) => {
    if (gig.id) {
      setGigs(gigs.map((x) => (x.id === gig.id ? gig : x)));
    } else {
      gig.id = gigs.length.toString();
      setSelectedGig(gig);
      setGigs([...gigs, gig]);
    }
    setEditMode(false);
  };

  const handleDelete = (id: string) => {
    setGigs(gigs.filter((x) => x.id !== id));
    setEditMode(false);
    if (selectedGig?.id === id) {
      setSelectedGig(undefined);
    }
  };

  return (
    <>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3, ml: 3 }}>
        <GigDashboard
          gigs={gigs}
          selectGig={handleSelectGig}
          cancelSelectGig={handleCancelSelectGig}
          selectedGig={selectedGig}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteGig={handleDelete}
        />
      </Container>
    </>
  );
}

export default App;
