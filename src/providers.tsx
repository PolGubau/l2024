import { PoluiProvider, Toaster } from "pol-ui";
import { PropsWithChildren } from "react";
import { MapComponentsProvider } from "@mapcomponents/react-maplibre";

export default function AppProviders(props: PropsWithChildren<{}>) {
  return (
    <MapComponentsProvider>
      <PoluiProvider>
        {props.children}
        <Toaster />
      </PoluiProvider>
    </MapComponentsProvider>
  );
}
