import { useAppStore } from "~/store/app.store";
import { clsx } from "clsx";
import { Status } from "~/types";

export const CoordinatesTable = () => {
  const activeRobots = useAppStore((state) => state.activeRobots);

  if (activeRobots.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>Robot</th>
            <th>Coordinates</th>
            <th>Status</th>
            <th>Scent Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activeRobots.map((robot) => (
            <tr key={robot.robotId} className="text-center">
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-12 h-12 mask mask-squircle">
                      <img
                        src={`https://robohash.org/${robot.robotId}.png`}
                        alt="robot avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{robot.robotId}</div>
                  </div>
                </div>
              </td>
              <td className="text-xl font-bold">
                {robot.finalCoordinates.status === Status.OK
                  ? `${robot.finalCoordinates.x} ${robot.finalCoordinates.y} ${robot.finalCoordinates.orientation}`
                  : "N/A"}
              </td>
              <td>
                <span
                  className={clsx("badge", {
                    "badge-success":
                      robot.finalCoordinates.status === Status.OK,
                    "badge-warning":
                      robot.finalCoordinates.status === Status.LOST,
                  })}
                >
                  {robot.finalCoordinates.status}
                </span>
              </td>
              <td className="text-xl font-bold">
                {robot.finalCoordinates.status === Status.LOST
                  ? `${robot.finalCoordinates.x} ${robot.finalCoordinates.y} ${robot.finalCoordinates.orientation}`
                  : "N/A"}
              </td>
              <td>
                <button className="btn btn-primary">View History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
