import {
  MapLibreMap,
  MlFillExtrusionLayer,
  MlNavigationTools,
} from "@mapcomponents/react-maplibre";
import {
  Button,
  cn,
  Conveyor,
  Divider,
  Drawer,
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
import { useMemo, useState } from "react";
import { TbFilterMinus, TbSettings } from "react-icons/tb";
import { linesData, stops } from "../data/lines";
import { Stops as IStops } from "../types/stops";
import { LineName, LineNameEnum, LineType } from "../types/types";
import LineImage from "./Image";
import { Line } from "./Line";
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

  const metroStops: IStops = {
    type: "FeatureCollection",
    features: stops.features,
  };
  const [extras, setExtras] = useState({
    hasElevation: false,
    hasBuildings: false,
  });

  // each lines has different images x stop
  // we select a name as Trinitat-Nova
  // Multiple lines has a photo in Trinitat-Nova, search in all lines the ones that have a photo with that name

  // the selected Stop is a string for the name of the stop
  // all photos are called as 1.string.jpg delete the number and the .jpg

  // ex: selected stop is Trinitat-Nova
  // from all images, get /L3/1.Trinitat-Nova.jpg but also /L4/2.Trinitat-Nova.jpg ...

  const images: string[] = useMemo(() => {
    if (!selectedStop) return [];
    const preUrl = "/images";
    const postUrl = `${selectedStop}.jpg`;
    const tryAllLines = linesData.map((line) => {
      const image = `${preUrl}/${line.id}/${postUrl}`;
      return image;
    });

    return tryAllLines;
  }, [selectedStop]);

  const isThisLineSelected = (line: LineName) => {
    // if 0 lines selected, return true
    if (!selectedLine) return true;
    return selectedLine?.id === line;
  };

  const getStopInfo = (stop: string) => {
    return stops.features.find((s) => s.properties.stop_name === stop);
  };
  const snaps = ["750px", "1055px", 1];
  const [snap, setSnap] = useState<number | string | null>(snaps[0]);

  return (
    <>
      <Drawer
        contentProps={{
          className: "z-50",
        }}
        direction="bottom"
        snapPoints={snaps}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        withoutTrigger
        open={Boolean(selectedStop)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedStop(null);
            setSelectedLine(null);
          }
        }}
      >
        <header className="p-6 ">
          <h2 className="text-secondary-50 text-2xl ">{selectedStop}</h2>
        </header>
        {images.map((image, i) => (
          <LineImage image={image} key={i} />
        ))}
      </Drawer>
      <section className="relative gap-4 bg-secondary/20 p-2 ">
        <Dropdown
          className="z-50"
          trigger={
            <Button
              className="absolute w-[50px] h-[50px] bottom-8 z-20 left-8 bg-secondary-50 dark:bg-secondary-900 "
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
        {/* <div className="fixed top-2 left-2 z-10 p-2 gap-1 flex flex-col bg-secondary-50/70 dark:bg-secondary-900/70 backdrop-blur-sm rounded-br-2xl rounded-td-2xl">
        {Object.keys(extras).map((extra) => (
          <Switch
            size="sm"
            key={extra}
            label={formatString(extra)}
            checked={extras[extra]}
            onChange={() =>
              setExtras((prev) => ({ ...prev, [extra]: !prev[extra] }))
            }
          >
            {extra}
          </Switch>
        ))}
        <div className="flex flex-col gap-2 overflow-auto max-h-[80vh] relative">
          {selectedStop}
          {images.map((image, i) => (
            <LineImage image={image} key={i} />
          ))}
          <IconButton
            className="absolute top-1 right-1 bg-secondary-50 "
            onClick={() => setSelectedStop(null)}
          >
            X
          </IconButton>
        </div>
      </div> */}

        <div className="relative w-full h-full overflow-hidden rounded-3xl">
          {extras.hasBuildings && <MlFillExtrusionLayer {...exclusionArgs} />}
          {linesData.map((line) => (
            <Line
              seeElevation={extras.hasElevation}
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
