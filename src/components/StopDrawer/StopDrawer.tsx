import { Drawer, formatString } from "pol-ui";
import { useState } from "react";
import { getImage } from "../../util/get-info";
import { StopData } from "../../types/stops";

interface StopDrawerProps {
  stop: StopData | null;
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
        {stop?.name && <h2 className=" text-xl">{formatString(stop?.name)}</h2>}
        <span className="opacity-80">{stop?.neighborhood}</span>
      </header>

      <div className="flex gap-4 items-center overflow-x-auto overflow-y-hidden">
        {stop?.lines.map((l) => {
          const url = getImage(l, stop.name);
          return (
            <div key={url}>
              <img
                src={url}
                alt={stop.name}
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
