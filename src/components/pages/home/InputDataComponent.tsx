import { Button, IconButton, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
const InputDataComponent = (props: {
  inputValues: InputData[];
  gridValues: {
    w: string;
    h: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  generateData: () => void;
  addInputValue: () => void;
  onChangeInputValues: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => void;
  removeInputValue: (idx: number) => void;
}) => {
  return (
    <div className="mt-5">
      <Typography variant="h6">Generate Grid</Typography>
      <div className="flex flex-wrap space-x-3 mt-2">
        <TextField
          onChange={props.onChange}
          value={props.gridValues.w}
          size="small"
          label="Rows"
          name="w"
        />
        <TextField
          onChange={props.onChange}
          value={props.gridValues.h}
          size="small"
          label="Columns"
          name="h"
        />

        {/* <Button
              onClick={() => {
                props.generateGrid();
              }}
            >
              Generate grid
            </Button> */}
      </div>

      <div className="mt-2">
        {props.inputValues.map((item, idx) => {
          return (
            <div key={idx} className="mt-2">
              <Typography variant="h6">Rober {idx}</Typography>
              <div className="flex flex-wrap space-x-3 mt-1">
                <TextField
                  name="position"
                  label="Position"
                  onChange={(e) => props.onChangeInputValues(e, idx)}
                  value={item.position}
                  size="small"
                />
                <TextField
                  name="instructions"
                  label="Instructions"
                  onChange={(e) => props.onChangeInputValues(e, idx)}
                  value={item.instructions}
                  size="small"
                />
                {props.inputValues.length >1 &&
                <IconButton onClick={() => props.removeInputValue(idx)}>
                  <CloseIcon />
                </IconButton>
                }
              </div>
            </div>
          );
        })}
        <Button
          sx={{ mt: 1 }}
          onClick={() => {
            props.addInputValue();
            // generateGrid();
          }}
        >
          Add input
        </Button>
      </div>
      <Button
        sx={{ mt: 3 }}
        variant={"contained"}
        onClick={() => {
          props.generateData();
          // generateGrid();
        }}
      >
        Generate Data
      </Button>
    </div>
  );
};

export default InputDataComponent;
