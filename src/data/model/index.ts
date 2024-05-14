type GridCellResults = {
    results:GridCell[]
    id:number
    finalPosition:Coordinatates
}
type GridCell = {
    x:number
    y:number
    // finalCoordinates:FinalCoordinates[]
    moves:Coordinatates[]
}

type InputData = {
    position:string
    instructions:string
}

type FinalCoordinates = {
    id:number
    x:number
    y:number
    heading:'S' | 'N' | 'W' | 'E'
    moves:Coordinatates[]
}

type Coordinatates = {
    step:number
    x:number
    y:number
    heading:'S' | 'N' | 'W' | 'E'
}

