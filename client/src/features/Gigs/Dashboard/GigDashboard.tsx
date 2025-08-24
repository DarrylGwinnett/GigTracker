import { Grid2 } from "@mui/material";
import GigList from "./GigList";
import GigDetails from "../Details/GigDetails";
import GigForm from "../form/GigForm";

type Props = {
  gigs: Gig[];
  selectGig: (id: string) => void;
  cancelSelectGig: () => void;
  selectedGig?: Gig;
  editMode: boolean
  openForm: (id: string) => void;
  closeForm: () => void
  submitForm: (gig: Gig) => void
  deleteGig: (id: string) => void
};

export default function GigDashboard({
  gigs,
  selectGig,
  cancelSelectGig,
  selectedGig,
  editMode,
  openForm,
  closeForm,
  submitForm,
  deleteGig
}: Props) {
  return (
    <Grid2 container>
      <Grid2 size={7}>
        <GigList gigs={gigs} selectGig={selectGig} deleteGig={deleteGig}/>
      </Grid2>
      <Grid2 size={5}>
        {selectedGig && !editMode && (
          <GigDetails gig={selectedGig} cancelSelectGig={cancelSelectGig} openForm={openForm}  />
        )}
        {editMode &&<GigForm closeForm={closeForm} gig={selectedGig} submitForm={submitForm}/>}
      </Grid2>
    </Grid2>
  );
}
