import { Toaster } from "pol-ui";

import React, { Suspense } from "react";
const Board = React.lazy(() => import("./components/Board"));
export default function App() {
  return (
    <main className="relative w-screen h-screen ">
      <Suspense fallback={"Loading"}>
        <Board />
      </Suspense>
      <Toaster />
    </main>
  );
}
