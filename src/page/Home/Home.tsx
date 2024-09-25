import React, { Suspense } from "react";
const Board = React.lazy(() => import("../../components/Board"));
const HomePage = () => {
  return (
    <Suspense fallback={"Loading"}>
      <Board />
    </Suspense>
  );
};

export default HomePage;
