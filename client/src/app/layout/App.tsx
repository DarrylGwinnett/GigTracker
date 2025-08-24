import { useState } from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "./NavBar";
import GigDashboard from "../../features/Gigs/Dashboard/GigDashboard";
import { useGigs } from "../../lib/hooks/useGigs";

function App() {
  const [selectedGig, setSelectedGig] = useState<Gig | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const { gigs, isPending } = useGigs();

  const handleSelectGig = (id: string) => {
    setSelectedGig(gigs!.find((x) => x.id === id));
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
    /*if (gig.id) {
      setGigs(gigs!.map((x) => (x.id === gig.id ? gig : x)));
    } else {
      gig.id = gigs!.length.toString();
      setSelectedGig(gig);
      setGigs([...gigs!, gig]);
    }*/
    console.log(gig);
    setEditMode(false);
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3, ml: 3 }}>
        {!gigs || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
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
        )}
      </Container>
    </Box>
  );
}

export default App;
