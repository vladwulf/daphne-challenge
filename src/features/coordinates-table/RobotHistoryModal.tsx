import { useMemo } from "react";
import { useAppStore } from "~/store/app.store";

export const RobotHistoryModal = () => {
  const activeRobots = useAppStore((state) => state.activeRobots);
  const selectedRobotHistory = useAppStore(
    (state) => state.selectedRobotHistory
  );

  const history = useMemo(() => {
    return activeRobots.find((robot) => robot.robotId === selectedRobotHistory)
      ?.coordinatesHistory;
  }, [activeRobots, selectedRobotHistory]);

  return (
    <dialog id="robot_history_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold text-center">
          [{selectedRobotHistory}] Robot History
        </h3>
        <p className="py-4">
          <pre>{JSON.stringify(history, null, 2)}</pre>
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
