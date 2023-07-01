import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Divider,
  Grid,
  styled,
  Paper,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import IconBox from "../components/iconBox";
import BadgeIcon from "@mui/icons-material/Badge";
import QuickFilteringGrid from "../components/carSelectionTable/carSelectionTable";
import CompoundSelect from "../components/compoundSelector";
import TrackSelection from "../components/trackSelection";
import TrackSelectionModal from "../components/trackSelectionModal";
import ImageBox from "../components/homepageTrack";
import SetupTable from "../components/setupCreator";

const SessionStartup: React.FC = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const ItemCentered = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedCompound, setSelectedCompound] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedCar.trim() !== "") {
      router.push(`/session?car=${selectedCar}`);
    }
  };

  const handleCarSelection = (car: string) => {
    setSelectedCar(car);
  };
  const handleCompoundSelection = (event: SelectChangeEvent) => {
    setCompound(event.target.value);
  };
  const handleTrackSelection = (track: string) => {
    setSelectedTrack(track);
  };
  const [compound, setCompound] = React.useState("");

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            backgroundColor: "#F6F6F6",
            height: "610px",
            width: 1000,
          }}
        >
          <div style={{ marginTop: 25 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Item>
                    <QuickFilteringGrid onSelectCar={handleCarSelection} />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <TrackSelectionModal onSelectTrack={handleTrackSelection} />
                    <ImageBox
                      Width={"400px"}
                      Height={"350px"}
                      MarginRight={"0px"}
                      MarginLeft={"0px"}
                      MarginTop={"0px"}
                      imageSrc={`/images/${selectedTrack}.svg`}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <ItemCentered>
                    <Box sx={{ minWidth: "100%" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Compound
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={compound}
                          label="Compound"
                          onChange={handleCompoundSelection}
                        >
                          <MenuItem value={"Comfort: Hard (CH)"}>
                            Comfort: Hard (CH)
                          </MenuItem>
                          <MenuItem value={"Comfort: Medium (CM)"}>
                            Comfort: Medium (CM)
                          </MenuItem>
                          <MenuItem value={"Comfort: Soft (CS)"}>
                            Comfort: Soft (CS)
                          </MenuItem>
                          <MenuItem value={"Sports: Hard (SH)"}>
                            Sports: Hard (SH)
                          </MenuItem>
                          <MenuItem value={"Sports: Medium (SM)"}>
                            Sports: Medium (SM)
                          </MenuItem>
                          <MenuItem value={"Sports: Soft (SS)"}>
                            Sports: Soft (SS)
                          </MenuItem>
                          <MenuItem value={"Racing: Hard (RH)"}>
                            Racing: Hard (RH)
                          </MenuItem>
                          <MenuItem value={"Racing: Medium (RM)"}>
                            Racing: Medium (RM)
                          </MenuItem>
                          <MenuItem value={"Racing: Soft (RS)"}>
                            Racing: Soft (RS)
                          </MenuItem>
                          <MenuItem value={"Racing: Super Soft (RSS)"}>
                            Racing: Super Soft (RSS)
                          </MenuItem>
                          <MenuItem value={"Racing: Intermediate (RI)"}>
                            Racing: Intermediate (RI)
                          </MenuItem>
                          <MenuItem value={"Racing: Heavy Wet (RH)"}>
                            Racing: Heavy Wet (RH)
                          </MenuItem>
                          <MenuItem value={"Dirt Tires"}>Dirt Tires</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </ItemCentered>
                </Grid>
                <Grid item xs={6}><Item><SetupTable/></Item></Grid>
              </Grid>
              <div>
                {selectedCar}
                {compound}
                {selectedTrack}
              </div>
              <Button
                type="submit"
                variant="contained"
                sx={{ mr: 2, width: "167px" }}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionStartup;
