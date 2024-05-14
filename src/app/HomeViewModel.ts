"use client";
import { ChangeEvent, useEffect, useState } from "react";

export default function HomeViewModel() {
  const [gridCells, setGridCells] = useState<GridCellResults[]>([]);
  const [columns, setColumns] = useState(5);
  const [gridValues, setGridValues] = useState({
    w: "5",
    h: "5",
  });
  const [inputValues, setInputValues] = useState<InputData[]>([
    {
      position: "1 2 N",
      instructions: "LMLMLMLMM",
    },
    {
      position: "3 3 E",
      instructions: "MMRMMRMRRM",
    },
  ]);

  const [finalCoordinatates, setFinalCoordinates] = useState<
    FinalCoordinates[]
  >([]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGridValues({
      ...gridValues,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeInputValues = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    setGridValues({
      ...gridValues,
      [e.target.name]: e.target.value,
    });
    const n = inputValues.map((item, i) => {
      if (i == idx) {
        item = {
          ...item,
          [e.target.name]: e.target.value,
        };
      }
      return item;
    });
    console.log(n);
    setInputValues(n);
  };

  const addInputValue = () => {
    setInputValues((t) => [
      ...t,
      {
        position: "",
        instructions: "",
      },
    ]);
  };

  const removeInputValue = (idx:number)=>{
    const n = inputValues.filter((item,i)=>i != idx)
    setInputValues(n)
  }

  const generateData = () => {
    let output: FinalCoordinates[] = [];
    inputValues.map((item, idx) => {
      const res = getFinalCoordinates(item, idx);
      output.push(res);
    });
    setFinalCoordinates(output);
    generateCell(output);
  };

  const getFinalCoordinates = (
    item: InputData,
    idx: number
  ): FinalCoordinates => {
    const stringPosition = item.position.replace(/\s/g, "");
    // const heading = stringPosition[2]
    let currentPosition: FinalCoordinates = {
      id: idx,
      x: Number(stringPosition[0]),
      y: Number(stringPosition[1]),
      heading: stringPosition[2] as "S" | "N" | "W" | "E",
      moves: [],
    };
    let moves: Coordinatates[] = [];
    let currentMove: Coordinatates = {
      step: 1,
      x: currentPosition.x,
      y: currentPosition.y,
      heading: currentPosition.heading,
    };
    moves.push(currentMove);
    const instructions = item.instructions.replace(/\s/g, "");
    for (let i = 0; i < instructions.length; i++) {
      const { x, y, heading, step } = currentMove;
      const move = nextMove(x, y, heading, instructions[i], step + 1);
      //   console.log(instructions, move,i,instructions[i]);
      if (move != undefined) {
        currentMove = move;
        moves.push(move);
      }
    }
    if (moves.length == 0) return currentPosition;
    const lastMove = moves[moves.length - 1];
    console.log("moves", moves);
    currentPosition = {
      id: idx,
      x: lastMove.x,
      y: lastMove.y,
      heading: lastMove.heading,
      moves: moves,
    };

    return currentPosition;
  };

  const nextMove = (
    x: number,
    y: number,
    heading: string,
    instrcution: string,
    step: number
  ): Coordinatates | undefined => {
    switch (heading) {
      case "W":
        switch (instrcution) {
          case "M":
            return { y: y, x: x - 1, heading: "W", step: step };
          case "L":
            return { y: y, x: x, heading: "S", step: step };
          case "R":
            return { y: y, x: x, heading: "N", step: step };
        }
      case "N":
        switch (instrcution) {
          case "M":
            return { y: y + 1, x: x, heading: "N", step: step };
          case "L":
            return { y: y, x: x, heading: "W", step: step };
          case "R":
            return { y: y, x: x, heading: "E", step: step };
        }
      case "E":
        switch (instrcution) {
          case "M":
            return { y: y, x: x + 1, heading: "E", step: step };
          case "L":
            return { y: y, x: x, heading: "N", step: step };
          case "R":
            return { y: y, x: x, heading: "S", step: step };
        }
      case "S":
        switch (instrcution) {
          case "M":
            return { y: y - 1, x: x, heading: "S", step: step };
          case "L":
            return { y: y, x: x, heading: "E", step: step };
          case "R":
            return { y: y, x: x, heading: "W", step: step };
        }
    }
  };

  const generateCell = (finalCoordinatates: FinalCoordinates[]) => {
    setGridCells([]);
    const h = Number(gridValues.h);
    const w = Number(gridValues.w);
    console.log(h, w);
    let hightCol = h;

    let results: GridCellResults[] = [];

    finalCoordinatates.map((item) => {
      let cells: GridCell[] = [];
      for (let row = 0; row <= w; row++) {
        const currentY = hightCol - row;
        for (let col = 0; col <= h; col++) {
          let gridCell: GridCell = { y: currentY, x: col, moves: [] };
          cells.push(gridCell);
        }
      }

      item.moves.map(item=>{
        cells = cells.map(cell=>{
        if(cell.x == item.x && cell.y == item.y){
            cell = {
                ...cell,
                moves:[...cell.moves,item]
            }
        }
        return cell
    })
    })
      results.push({ results: cells, id: item.id,finalPosition:{
        x:item.x,
        y:item.y,
        heading:item.heading,
        step:0
      } });
    });
    setGridCells(results);
    setColumns(h + 1);
  };

  return {
    gridCells,
    generateData,
    onChange,
    gridValues,
    columns,
    inputValues,
    addInputValue,
    onChangeInputValues,
    finalCoordinatates,
    removeInputValue
  };
}
