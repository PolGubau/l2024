import {
  MapLibreMap,
  MlFillExtrusionLayer,
  MlNavigationTools,
} from "@mapcomponents/react-maplibre";
import {
  Button,
  cn,
  Divider,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownLabel,
  DropdownSubContent,
  DropdownSubTrigger,
  formatString,
} from "pol-ui";
import {
  DropdownCheckboxItem,
  DropdownDescription,
  DropdownHeader,
  DropdownPortal,
  DropdownSub,
} from "pol-ui/lib/esm/components/Dropdown/Dropdown";
import { useState } from "react";
import { TbFilterMinus, TbSettings } from "react-icons/tb";
import { linesData } from "../data/lines";
import { rawStops } from "../data/stops";
import { StopsObject } from "../types/stops";
import { LineName, LineNameEnum, LineType } from "../types/types";
import { getStopInfo } from "../util/get-info";
import { Line } from "./Line";
import StopDrawer from "./StopDrawer/StopDrawer";
import { Stops } from "./stops";
const Board = () => {
  const exclusionArgs = {
    paint: {
      "fill-extrusion-color": "hsl(196, 61%, 83%)",
      "fill-extrusion-height": {
        property: "render_height",
        type: "identity",
      },
      "fill-extrusion-base": {
        property: "render_min_height",
        type: "identity",
      },
      "fill-extrusion-opacity": [
        "interpolate",
        // Set to interpoleta linearly between the pair of stops
        ["linear"],
        ["zoom"],
        // When zoom is 13.5, buildings will be 100% transparent.
        13.5,
        0,
        14,
        0.5,
        // When zoom is 15 or higher, buildings will be 100% opaque.
        14.5,
        1,
      ],
    },
  };
  const [selectedLine, setSelectedLine] = useState<LineType | null>(null);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);

  const metroStops: StopsObject = {
    type: "FeatureCollection",
    features: rawStops,
  };
  const [extras, setExtras] = useState({
    hasElevation: false,
    hasBuildings: false,
  });

  const isThisLineSelected = (line: LineName) => {
    // if 0 lines selected, return true
    if (!selectedLine) return true;
    return selectedLine?.id === line;
  };

  const thisStop = selectedStop ? getStopInfo(selectedStop) : null;
  return (
    <>
      <StopDrawer stop={thisStop} setSelectedStop={setSelectedStop} />
      <section className="relative gap-4 bg-secondary/20 p-2 ">
        <Dropdown
          className="z-50"
          trigger={
            <Button
              className="absolute w-[50px] h-[50px] bottom-4 z-20 left-4 bg-secondary-50 dark:bg-secondary-900 "
              rounded={"full"}
            >
              <TbSettings
                size={25}
                className="text-secondary-900 dark:text-secondary-50"
              />
            </Button>
          }
        >
          <DropdownHeader>
            <DropdownLabel>Options</DropdownLabel>
            <DropdownDescription>Customize the map</DropdownDescription>
          </DropdownHeader>

          <Divider />

          <DropdownGroup>
            <DropdownSub>
              <DropdownSubTrigger>
                <span>Filter Lines</span>
              </DropdownSubTrigger>
              <DropdownPortal>
                <DropdownSubContent>
                  <DropdownItem
                    icon={TbFilterMinus}
                    onSelect={() => setSelectedLine(null)}
                  >
                    <span>All</span>
                  </DropdownItem>
                  {Object.keys(LineNameEnum).map((line) => (
                    <>
                      <DropdownItem
                        className={cn(" transition-colors ", {
                          "bg-secondary/30": isThisLineSelected(
                            line as LineName
                          ),
                          "hover:bg-secondary/10": !isThisLineSelected(
                            line as LineName
                          ),
                        })}
                        key={line}
                        onSelect={() => {
                          const l = linesData.find((l) => l.id === line);
                          setSelectedLine(l ?? null);
                        }}
                      >
                        <span className="items-center flex gap-2">
                          <img
                            width={20}
                            height={20}
                            src={`/logos/${line}.svg`}
                            alt="logo"
                          />

                          {line}
                        </span>
                      </DropdownItem>{" "}
                    </>
                  ))}
                </DropdownSubContent>
              </DropdownPortal>
            </DropdownSub>
          </DropdownGroup>
          <DropdownGroup>
            {Object.keys(extras).map((extra) => (
              <DropdownCheckboxItem
                className="text-secondary-900 dark:text-secondary-50"
                key={extra}
                // label={formatString(extra)}
                checked={extras[extra]}
                onCheckedChange={() =>
                  setExtras((prev) => ({ ...prev, [extra]: !prev[extra] }))
                }
              >
                {formatString(extra)}
              </DropdownCheckboxItem>
            ))}
          </DropdownGroup>
          {/*  */}
        </Dropdown>

        <div className="relative w-full h-full overflow-hidden rounded-3xl">
          {extras.hasBuildings && <MlFillExtrusionLayer {...exclusionArgs} />}
          {linesData.map((line) => (
            <Line
              seeElevation={extras.hasElevation ?? false}
              line={line}
              key={line.id}
              isSelected={isThisLineSelected(line.id as LineNameEnum)}
            />
          ))}
          <Stops stops={metroStops} setSelectedStop={setSelectedStop} />
          <MapLibreMap
            options={{
              attributionControl: false,
              maplibreLogo: false,
              center: { lat: 41.390205, lng: 2.154007 },
              style: "/map/schema.json",
              zoom: 10,
              // maxBounds: [
            }}
            style={{
              minWidth: "100%",
              height: "100%",
            }}
          />

          <div className="hidden md:flex">
            <MlNavigationTools />
          </div>
        </div>
      </section>
    </>
  );
};

export default Board;
