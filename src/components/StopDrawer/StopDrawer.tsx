import { Drawer, formatString } from "pol-ui";
import { useState } from "react";
import { StopFeatures } from "../../types/stops";
import { getImage } from "../../util/get-info";

interface StopDrawerProps {
  stop: StopFeatures | null;
  setSelectedStop: (stop: string | null) => void;
}

const StopDrawer = ({ stop, setSelectedStop }: StopDrawerProps) => {
  const snaps = ["670px", 1];
  const [snap, setSnap] = useState<number | string | null>(snaps[0]);

  return (
    <Drawer
      contentProps={{
        className: "z-[999] overflow-hidden",
      }}
      direction="bottom"
      snapPoints={snaps}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      withoutTrigger
      open={Boolean(stop)}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedStop(null);
        }
      }}
    >
      <header className="pb-8 flex flex-col gap-1">
        {stop?.properties.stop_name && (
          <h2 className=" text-xl">
            {formatString(stop?.properties.stop_name)}
          </h2>
        )}{" "}
        <span className="opacity-80">{stop?.properties.nom_barri}</span>
      </header>

      <div className="flex gap-4 items-center overflow-x-auto overflow-y-hidden">
        {stop?.properties.line.map((l) => {
          const url = getImage(l, stop.properties.stop_name);
          return (
            <div key={url}>
              <div className="w-[30px] aspect-square absolute bottom-2 left-2">
                hola
              </div>
              <img
                src={url}
                alt={stop.properties.stop_name}
                className="w-[220px] h-full object-cover rounded-3xl"
              />
            </div>
          );
        })}
      </div>
    </Drawer>
  );
};

export default StopDrawer;
