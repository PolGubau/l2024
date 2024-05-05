import {
  MapLibreMap,
  MlFillExtrusionLayer,
  MlNavigationTools,
} from "@mapcomponents/react-maplibre";
import { IconButton, Switch, formatString } from "pol-ui";
import { useMemo, useState } from "react";
import { linesData, stops } from "../data/lines";
import { Stops as IStops } from "../types/stops";
import { LineNameEnum, LineType } from "../types/types";
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
    console.log("selectedStop", selectedStop);

    const preUrl = "/images";

    const postUrl = `${selectedStop}.jpg`;

    const tryAllLines = linesData.map((line) => {
      const image = `${preUrl}/${line.id}/${postUrl}`;
      console.log("image", image);
      return image;
    });

    return tryAllLines;
  }, [selectedStop]);

  return (
    <section className=" gap-4 bg-neutral-200 h-full grid ">
      <div className="fixed top-2 left-2 z-10 p-2 gap-1 flex flex-col bg-secondary-50/70 backdrop-blur-sm rounded-xl">
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
      </div>

      <ol className="w-fit min-w-10 fixed bottom-2 left-2 z-20 flex gap-2 items-center">
        {Object.keys(LineNameEnum).map((line) => (
          <button
            key={line}
            className="overflow-hidden rounded-md h-[50px] w-[50px]"
            onClick={() =>
              setSelectedLine(
                linesData.find((l) => l.id === (line as LineNameEnum)) || null
              )
            }
          >
            <img width={50} height={50} src={`/logos/${line}.svg`} alt="logo" />
          </button>
        ))}
      </ol>

      <div className="relative w-full h-full overflow-hidden rounded-3xl">
        {extras.hasBuildings && <MlFillExtrusionLayer {...exclusionArgs} />}
        {linesData.map((line) => (
          <Line
            seeElevation={extras.hasElevation}
            line={line}
            key={line.id}
            isSelected={selectedLine?.id === line.id || !selectedLine}
            setSelectedLine={setSelectedLine}
          />
        ))}
        <Stops stops={metroStops} setSelectedStop={setSelectedStop} />
        <MapLibreMap
          options={{
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
  );
};

export default Board;
