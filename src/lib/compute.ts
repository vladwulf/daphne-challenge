import { VITE_GRID_X_MAX, VITE_GRID_Y_MAX } from "~/constants";
import {
  Coordinates,
  RobotOrientation,
  RobotInstruction,
  CoordinatesWithStatus,
  Status,
} from "~/types";

/**
 * Returns the final coordinates and the history of coordinates of a robot after executing a list of instructions.
 */
export function computePath(
  initialCoordinates: Coordinates,
  instructions: RobotInstruction[],
  scentCoordinates: Array<Omit<Coordinates, "orientation">>
) {
  const coordinatesHistory: CoordinatesWithStatus[] = [
    {
      x: initialCoordinates.x,
      y: initialCoordinates.y,
      orientation: initialCoordinates.orientation,
      status: Status.OK,
    },
  ];

  for (const instr of instructions) {
    // get last coordinate
    const lastCoordinates = coordinatesHistory.slice(-1)[0];

    const newOrientation = getNewOrientation(
      lastCoordinates.orientation,
      instr
    );
    const newCoordinates = getNewCoordinates(
      {
        x: lastCoordinates.x,
        y: lastCoordinates.y,
      },
      newOrientation,
      instr
    );

    const isInScent = scentCoordinates.find(
      (coord) => coord.x === lastCoordinates.x && coord.y === lastCoordinates.y
    );

    // handle scent
    if (
      isInScent &&
      (newCoordinates.x > +VITE_GRID_X_MAX ||
        newCoordinates.y > +VITE_GRID_Y_MAX ||
        newCoordinates.x < 0 ||
        newCoordinates.y < 0)
    ) {
      coordinatesHistory[coordinatesHistory.length - 1].status = Status.IGNORED;
      continue;
    }

    // handle grid overflow
    if (
      newCoordinates.x > +VITE_GRID_X_MAX ||
      newCoordinates.y > +VITE_GRID_Y_MAX ||
      newCoordinates.x < 0 ||
      newCoordinates.y < 0
    ) {
      coordinatesHistory[coordinatesHistory.length - 1].status = Status.LOST;
      break;
    }

    coordinatesHistory.push({
      ...newCoordinates,
      orientation: newOrientation,
      status: Status.OK,
    });
  }
  return {
    history: coordinatesHistory,
    coordinates: coordinatesHistory[coordinatesHistory.length - 1],
  };
}

/**
 * Returns new coordinates of a robot after executing an instruction
 */
function getNewCoordinates(
  coordinates: Omit<Coordinates, "orientation">,
  orientation: RobotOrientation,
  instruction: RobotInstruction
) {
  switch (orientation) {
    case RobotOrientation.N:
      return {
        x: coordinates.x,
        y:
          instruction === RobotInstruction.F
            ? coordinates.y + 1
            : coordinates.y,
      };
    case RobotOrientation.E:
      return {
        x:
          instruction === RobotInstruction.F
            ? coordinates.x + 1
            : coordinates.x,
        y: coordinates.y,
      };
    case RobotOrientation.W:
      return {
        x:
          instruction === RobotInstruction.F
            ? coordinates.x - 1
            : coordinates.x,
        y: coordinates.y,
      };
    case RobotOrientation.S:
      return {
        x: coordinates.x,
        y:
          instruction === RobotInstruction.F
            ? coordinates.y - 1
            : coordinates.y,
      };
  }
}

/**
 * Returns new orientation of a robot after executing an instruction.
 */
function getNewOrientation(
  orientation: RobotOrientation,
  instruction: RobotInstruction
): RobotOrientation {
  switch (orientation) {
    case RobotOrientation.N:
      switch (instruction) {
        case RobotInstruction.L:
          return RobotOrientation.W;
        case RobotInstruction.R:
          return RobotOrientation.E;
        default:
          return RobotOrientation.N;
      }

    case RobotOrientation.E:
      switch (instruction) {
        case RobotInstruction.L:
          return RobotOrientation.N;
        case RobotInstruction.R:
          return RobotOrientation.S;
        default:
          return RobotOrientation.E;
      }

    case RobotOrientation.S:
      switch (instruction) {
        case RobotInstruction.L:
          return RobotOrientation.E;
        case RobotInstruction.R:
          return RobotOrientation.W;
        default:
          return RobotOrientation.S;
      }

    case RobotOrientation.W:
      switch (instruction) {
        case RobotInstruction.L:
          return RobotOrientation.S;
        case RobotInstruction.R:
          return RobotOrientation.N;
        default:
          return RobotOrientation.W;
      }

    default:
      return orientation;
  }
}
