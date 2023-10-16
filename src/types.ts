export enum Status {
  LOST = "LOST",
  OK = "OK",
  IGNORED = "IGNORED",
}
export enum RobotOrientation {
  N = "N",
  E = "E",
  S = "S",
  W = "W",
}

export enum RobotInstruction {
  L = "L",
  R = "R",
  F = "F",
}

export interface Coordinates {
  x: number;
  y: number;
  orientation: RobotOrientation;
}

export interface CoordinatesWithStatus extends Coordinates {
  status: Status;
}
