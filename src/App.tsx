import "./App.css";
import {
  MapLibreMap,
  MlFillExtrusionLayer,
  MlGpxViewer,
} from "@mapcomponents/react-maplibre";
const args = {
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
      // When zoom is 15 or higher, buildings will be 100% opaque.
      14.5,
      1,
    ],
  },
};
function App() {
  return (
    <main className="relative w-screen h-screen flex flex-col ">
      <nav className="bg-slate-300 text-3xl p-4">L2024 Project</nav>

      <section className="flex gap-8 bg-red-300 p-4 h-full">
        <div className="w-96">options</div>
        <div className="relative w-full h-full overflow-hidden rounded-3xl">
          <MlFillExtrusionLayer {...args} />
          <MlGpxViewer gpxData={ } />
          <MapLibreMap
            options={{
              center: { lat: 41.390205, lng: 2.154007 },
              style: "/map/schema.json",
              zoom: 12,
            }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
