import { Toaster } from "pol-ui";
import "./App.css";

import Board from "./components/Board";

function App() {
  return (
    <main className="relative w-screen h-screen ">
      <Board />
      <Toaster />
    </main>
  );
}

export default App;

/*
  // const lineByName = (name: string) =>
  //   linesData.find((line) => line.name === name);

  // const loadSample = async (lineName: string) => {
  //   const uri = `https://raw.githubusercontent.com/PolGubau/l2024/main/public/lines/${lineName}.gpx`;
  //   try {
  //     const response = await fetch(uri);
  //     const gpx = await response.blob();
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       const data = e.target?.result ?? undefined;
  //       console.log(data);

  //       // update the gpt data
  //       setLines((prev) =>
  //         prev.map((line) =>
  //           line.name === lineName ? { ...line, gpx: data } : line
  //         )
  //       );

  //       return data;
  //     };
  //     return reader.readAsText(gpx);
  //   } catch (error) {
  //     return console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   loadSample("L1");
  //   loadSample("L2");
  // }, []);


*/
