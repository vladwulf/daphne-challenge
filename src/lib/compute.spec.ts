jest.mock("../constants", () => ({
  VITE_GRID_X_MAX: 5,
  VITE_GRID_Y_MAX: 3,
}));

import {
  Coordinates,
  RobotInstruction,
  RobotOrientation,
  Status,
} from "~/types";
import { computePath } from "./compute";

describe("computePath", () => {
  describe("on valid path", () => {
    it("should return correct path", () => {
      const intialCoordinates: Coordinates = {
        x: 1,
        y: 1,
        orientation: RobotOrientation.E,
      };

      const robotPath = computePath(
        intialCoordinates,
        "FFLFF".split("") as RobotInstruction[],
        []
      );

      expect(robotPath.history.length).toEqual(6);
      expect(robotPath.coordinates).toEqual({
        x: 3,
        y: 3,
        orientation: RobotOrientation.N,
        status: Status.OK,
      });
    });
  });

  describe("on lost path", () => {
    describe("min grid overflow", () => {
      it("should handle overflow", () => {
        const intialCoordinates: Coordinates = {
          x: 1,
          y: 1,
          orientation: RobotOrientation.W,
        };

        const robotPath = computePath(
          intialCoordinates,
          "FFFF".split("") as RobotInstruction[],
          []
        );

        expect(robotPath.history.length).toEqual(2);
        expect(robotPath.coordinates).toEqual({
          x: 0,
          y: 1,
          orientation: RobotOrientation.W,
          status: Status.LOST,
        });
      });

      it("should handle scent detection", () => {
        const intialCoordinates: Coordinates = {
          x: 1,
          y: 1,
          orientation: RobotOrientation.W,
        };

        const robotPath = computePath(
          intialCoordinates,
          "FFFF".split("") as RobotInstruction[],
          [
            {
              x: 0,
              y: 1,
            },
          ]
        );

        expect(robotPath.history.length).toEqual(2);
        expect(robotPath.coordinates).toEqual({
          x: 0,
          y: 1,
          orientation: RobotOrientation.W,
          status: Status.IGNORED,
        });
      });
    });
    describe("max grid overflow", () => {
      it("should handle overflow", () => {
        const intialCoordinates: Coordinates = {
          x: 1,
          y: 1,
          orientation: RobotOrientation.N,
        };

        const robotPath = computePath(
          intialCoordinates,
          "FFFF".split("") as RobotInstruction[],
          []
        );

        expect(robotPath.history.length).toEqual(3);
        expect(robotPath.coordinates).toEqual({
          x: 1,
          y: 3,
          orientation: RobotOrientation.N,
          status: Status.LOST,
        });
      });

      it("should handle scent detection", () => {
        const intialCoordinates: Coordinates = {
          x: 1,
          y: 1,
          orientation: RobotOrientation.N,
        };

        const robotPath = computePath(
          intialCoordinates,
          "FFFF".split("") as RobotInstruction[],
          [
            {
              x: 1,
              y: 3,
            },
          ]
        );

        expect(robotPath.history.length).toEqual(3);
        expect(robotPath.coordinates).toEqual({
          x: 1,
          y: 3,
          orientation: RobotOrientation.N,
          status: Status.IGNORED,
        });
      });
    });
  });
});
