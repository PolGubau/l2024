"use client";

import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import GpxParser from "gpxparser";

const MapBcn = () => {
  const gpx = new GpxParser();
  const gpxData = gpx.parse("/.l1.gpx");

  console.log(gpxData);
  const positions =
    gpxData?.tracks[0].points.map((p: any) => [p.lat, p.lon]) ?? [];
  return (
    <MapContainer
      zoomControl={false}
      center={[40.8054, -74.0241]}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <Marker position={[40.8054, -74.0241]} draggable={true}>
        <Popup>Hey ! you found me</Popup>
      </Marker>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline
        pathOptions={{ fillColor: "red", color: "blue" }}
        positions={positions}
      />
    </MapContainer>
  );
};

export default MapBcn;
