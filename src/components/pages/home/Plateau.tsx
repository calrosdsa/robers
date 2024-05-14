import { Item } from "@/components/Item";
import { Button, Grid, TextField, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Plateau = (props: { columns: number; gridCells: GridCellResults[] }) => {
  return (
    <>
      {props.gridCells.map((item, idx) => {
        return (
          <div key={idx}>
            <Typography sx={{ mt: 2, mb: 2 }}>Rober {item.id} </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>Final Position 
            ({item.finalPosition.x} {item.finalPosition.y} {item.finalPosition.heading})</Typography>
            <Grid container columns={props.columns} sx={{ pt: 2 }}>
              {item.results.map((item, idx) => {
                return (
                  <Grid item xs={1} key={idx}>
                    <Item
                      sx={{
                        height: 70,
                      }}
                    >
                      <Grid container columns={item.moves.length}>
                        {item.moves.map((item, i) => {
                          return (
                            <Grid item xs={1} key={i}>
                              <Item
                                sx={{
                                  p: 1,
                                  height: 50,
                                }}
                              >
                                <div className="grid items-center place-items-center ">
                                  <span>Step:{item.step}</span>
                                  {item.heading == "E" && (
                                    <KeyboardArrowRightIcon fontSize="inherit" />
                                  )}
                                  {item.heading == "W" && (
                                    <KeyboardArrowLeftIcon fontSize="inherit" />
                                  )}
                                  {item.heading == "N" && (
                                    <KeyboardArrowUpIcon fontSize="inherit" />
                                  )}
                                  {item.heading == "S" && (
                                    <KeyboardArrowDownIcon fontSize="inherit"/>
                                  )}
                                  {item.x} {item.y} {item.heading}
                                </div>
                              </Item>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        );
      })}
    </>
  );
};

export default Plateau;
