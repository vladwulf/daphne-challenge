import { useAppStore } from "~/store/app.store";

export const ScentPositionsRender = () => {
  const scentCoordinates = useAppStore((state) => state.scentCoordinates);
  if (scentCoordinates.length === 0) return null;
  return (
    <div>
      <h2>Detected Scents</h2>
      <ul className="mt-5">
        {scentCoordinates.map((scentCoordinate, index) => {
          return (
            <li key={index}>
              [{scentCoordinate.robotId}] x: {scentCoordinate.x} - y:{" "}
              {scentCoordinate.y}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
