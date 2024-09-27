import { Button, Dialog, DialogClose, Drawer, formatString } from "pol-ui";
import { useState } from "react";
import { getImage, getStopInfo } from "../../util/get-info";
import LineImg from "../LineImg";

interface StopDrawerProps {
  stop: string | null;
  setSelectedStop: (stop: string | null) => void;
}

const StopDrawer = ({ stop: stopName, setSelectedStop }: StopDrawerProps) => {
  const stop = stopName ? getStopInfo(stopName) : null;

  const snaps = ["780px", 1];
  const [snap, setSnap] = useState<number | string | null>(snaps[0]);

  return (
    <Drawer
      contentProps={{
        className:
          "z-[999] overflow-hidden text-secondary-900 dark:text-secondary-50",
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
      <header className="pb-8 flex flex-col gap-1 h-[120px] ">
        {stop?.name && <h2 className=" text-xl">{formatString(stop?.name)}</h2>}
        <span className="opacity-80">{stop?.neighborhood}</span>
        <ul className="flex gap-1 flex-wrap pt-4">
          {stop?.lines.map((l) => (
            <LineImg l={l} />
          ))}
        </ul>
      </header>

      <div className="flex gap-4 items-center overflow-x-auto overflow-y-hidden h-[300px]">
        {stop?.lines.map((l) => {
          const url = getImage(l, stop.name);

          return (
            <div key={url} className="relative">
              <div className="absolute bottom-2 left-2">
                <LineImg l={l} />
              </div>

              <div className="w-[220px] h-full bg-secondary/50 overflow-hidden rounded-3xl">
                <Dialog
                  contentProps={{
                    className: "w-[80vw] max-w-3xl h-[80dvh] p-0  z-[999999]",
                  }}
                  trigger={
                    <img
                      src={url}
                      alt={stop.name}
                      className="w-[220px] h-full object-cover"
                    />
                  }
                >
                  {/* <div className="relative"> */}
                  <img
                    src={url}
                    alt={stop.name}
                    className="w-full h-full object-contain"
                  />
                  {/* <DialogClose>
                      <Button className="absolute bottom-3 right-3">
                        Close
                      </Button>
                    </DialogClose> */}
                  {/* </div> */}
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
};

export default StopDrawer;
