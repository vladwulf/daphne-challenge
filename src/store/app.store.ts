import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Coordinates, CoordinatesWithStatus, RobotInstruction } from "~/types";

interface RobotData {
  robotId: string;
  initialCoordinates: Coordinates;
  instructions: RobotInstruction[];
  coordinatesHistory: Array<CoordinatesWithStatus>;
  finalCoordinates: CoordinatesWithStatus;
}

interface AppState {
  selectedRobotHistory: string;
  scentCoordinates: Array<Coordinates & { robotId: string }>;
  activeRobots: RobotData[];
}

interface AppActions {
  registerNewRobot: (robotData: RobotData) => void;
  registerScent: (coordinates: Coordinates & { robotId: string }) => void;
  setSelectedRobotHistory: (robotId: string) => void;
}

const initialState: AppState = {
  selectedRobotHistory: "",
  activeRobots: [],
  scentCoordinates: [],
};

export const useAppStore = create<AppState & AppActions>()(
  devtools((set) => ({
    ...initialState,
    registerNewRobot(robotData) {
      set(
        (state) => ({
          activeRobots: [...state.activeRobots, robotData],
        }),
        false,
        "registerNewRobot"
      );
    },
    registerScent(coordinates) {
      set(
        (state) => ({
          scentCoordinates: [...state.scentCoordinates, coordinates],
        }),
        false,
        "registerScent"
      );
    },
    setSelectedRobotHistory(robotId) {
      set(
        () => ({
          selectedRobotHistory: robotId,
        }),
        false,
        "setSelectedRobotHistory"
      );
    },
  }))
);
