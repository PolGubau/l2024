import { PoluiProvider, Toaster } from "pol-ui";
import type { ReactNode } from "react";
import { MapComponentsProvider } from "@mapcomponents/react-maplibre";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders(props: AppProvidersProps) {
  return (
    <MapComponentsProvider>
      <PoluiProvider>
        {props.children}
        <Toaster />
      </PoluiProvider>
    </MapComponentsProvider>
  );
}
