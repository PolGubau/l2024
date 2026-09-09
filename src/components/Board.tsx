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
  DropdownCheckboxItem,
  DropdownPortal,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
  formatString,
} from "pol-ui";
import { useMemo, useState } from "react";
import {
  DropdownDescription,
  DropdownHeader,
} from "pol-ui/lib/esm/components/Dropdown/Dropdown";
import { TbFilterMinus, TbSettings } from "react-icons/tb";
import { linesData } from "../data/lines";
import { rawStops } from "../data/stops";
import { StopsObject } from "../types/stops";
import { LineName, LineNameEnum, LineType } from "../types/types";
import { Line } from "./Line";
import StopDrawer from "./StopDrawer/StopDrawer";
import { Stops } from "./stops";

const exclusionArgs = {
  paint: {
    "fill-extrusion-color": "hsl(196, 61%, 83%)",
    "fill-extrusion-height": { property: "render_height", type: "identity" },
    "fill-extrusion-base": { property: "render_min_height", type: "identity" },
    "fill-extrusion-opacity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      13.5,
      0,
      14,
      0.5,
      14.5,
      1,
    ],
  },
};

const metroStops: StopsObject = {
  type: "FeatureCollection",
  features: rawStops,
};

const extraOptions = ["hasElevation", "hasBuildings"] as const;
type ExtraOption = (typeof extraOptions)[number];

const Board = () => {
  const [selectedLine, setSelectedLine] = useState<LineType | null>(null);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const [extras, setExtras] = useState<Record<ExtraOption, boolean>>({
    hasElevation: false,
    hasBuildings: false,
  });

  const isThisLineSelected = (line: LineName) => {
    // if 0 lines selected, return true
    if (!selectedLine) return true;
    return selectedLine?.id === line;
  };
  const visibleLines = useMemo(
    () => (selectedLine ? [selectedLine] : linesData),
    [selectedLine]
  );

  return (
    <>
      <StopDrawer stop={selectedStop} setSelectedStop={setSelectedStop} />
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
            <DropdownLabel>Opciones</DropdownLabel>
            <DropdownDescription>Personaliza el mapa</DropdownDescription>
          </DropdownHeader>

          <Divider />

          <DropdownGroup>
            <DropdownSub>
              <DropdownSubTrigger>
                <span>Filtrar líneas</span>
              </DropdownSubTrigger>
              <DropdownPortal>
                <DropdownSubContent>
                  <DropdownItem
                    icon={TbFilterMinus}
                    onSelect={() => setSelectedLine(null)}
                  >
                    <span>Todas</span>
                  </DropdownItem>
                  {Object.keys(LineNameEnum).map((line) => (
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
                            alt={`Logotipo de la línea ${line}`}
                          />

                          {line}
                        </span>
                    </DropdownItem>
                  ))}
                </DropdownSubContent>
              </DropdownPortal>
            </DropdownSub>
          </DropdownGroup>
          <DropdownGroup>
            {extraOptions.map((extra) => (
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
          {visibleLines.map((line) => (
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
              // attributionControl: false,
              // maplibreLogo: false,
              center: { lat: 41.390205, lng: 2.154007 },
              style: "/map/schema.json",
              zoom: 12,
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
