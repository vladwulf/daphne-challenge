import { computePath } from "~/lib/compute";
import { genRobotId } from "~/lib/utils";
import { useAppStore } from "~/store/app.store";
import { RobotInstruction, RobotOrientation, Status } from "~/types";

interface FormData {
  x: string;
  y: string;
  orientation: RobotOrientation;
  command: string;
}

export const CoordinatesForm = () => {
  const scentCoordinates = useAppStore((state) => state.scentCoordinates);
  const registerNewRobot = useAppStore((state) => state.registerNewRobot);
  const registerScent = useAppStore((state) => state.registerScent);

  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as unknown as FormData;
    const initialCoordinates = {
      x: +data.x,
      y: +data.y,
      orientation: data.orientation,
    };
    const robotPath = computePath(
      initialCoordinates,
      data.command.split("") as RobotInstruction[],
      scentCoordinates
    );
    const robotId = genRobotId();
    if (robotPath.coordinates.status === Status.LOST) {
      registerScent({
        robotId,
        x: robotPath.coordinates.x,
        y: robotPath.coordinates.y,
        orientation: robotPath.coordinates.orientation,
      });
    }

    registerNewRobot({
      robotId,
      initialCoordinates,
      instructions: data.command.split("") as RobotInstruction[],
      coordinatesHistory: robotPath.history,
      // keep last OR or LOST coordinate but not IGNORED
      finalCoordinates: robotPath.history
        .filter((c) => c.status !== Status.IGNORED)
        .slice(-1)[0],
    });
  }

  return (
    <div>
      <form className="block max-w-md space-y-6" onSubmit={handleOnSubmit}>
        <div>
          <h2 className="mb-4">Initial Coordinates</h2>
          <div className="flex w-full max-w-sm gap-10">
            <div className="w-full">
              <label className="label label-text">X</label>
              <input
                name="x"
                type="number"
                className="w-full input input-bordered"
                min={0}
                max={100}
                defaultValue={1}
                required
              />
            </div>
            <div className="w-full">
              <label className="label label-text">Y</label>
              <input
                name="y"
                type="number"
                className="w-full input input-bordered"
                min={0}
                max={100}
                defaultValue={1}
                required
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label label-text">Orientation</label>
            <select
              className="w-full select select-bordered"
              name="orientation"
              required
            >
              <option disabled defaultValue={RobotOrientation.N}>
                Select the initial robot orientation
              </option>
              <option value={RobotOrientation.N}>{RobotOrientation.N}</option>
              <option value={RobotOrientation.S}>{RobotOrientation.S}</option>
              <option value={RobotOrientation.W}>{RobotOrientation.W}</option>
              <option value={RobotOrientation.E}>{RobotOrientation.E}</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className="mb-4">Execution Command</h2>
          <div className="form-control">
            <label className="label label-text">
              Execution Command (only F,R,L commands accepted)
            </label>
            <input
              name="command"
              className="input input-bordered"
              type="text"
              placeholder="Enter the command to execute"
              minLength={0}
              required
              pattern="^[FRL]*$"
            />
          </div>
        </div>
        <div className="my-10">
          <button type="submit" className="btn btn-primary">
            Execute
          </button>
        </div>
      </form>
    </div>
  );
};
