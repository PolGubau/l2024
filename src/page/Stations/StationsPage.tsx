import TimeAgo from "react-timeago";
import LineImg from "../../components/LineImg";
import { linesData } from "../../data/lines";

const StationsPage = () => {
  return (
    <div className="flex justify-center">
      <main className="p-6 flex flex-col gap-6 w-full max-w-5xl pt-16">
        <header className="flex justify-between gap-2">
          <h1 className="text-xl">Lines Information</h1>
        </header>
        <ul className="flex gap-2 flex-col divide-y divide-secondary-500/20">
          {linesData.map((line) => {
            const percentMoreWalkedThanMetroDistance = Math.round(
              ((line.metadata.distance - line.metadata.metro_distance) /
                line.metadata.metro_distance) *
                100
            );

            return (
              <li key={line.id} className="p-0 w-full">
                <article className="flex gap-2 py-4">
                  <div
                    className="p-1 rounded-lg"
                    style={{
                      backgroundColor: line.metadata.color,
                    }}
                  >
                    <div className="sticky top-0">
                      <LineImg l={line.id} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <header className="flex flex-col gap-1">
                      {/* <h2 className="text-2xl">{line.id}</h2> */}
                      <p className="text-lg opacity-85">
                        {line.metadata.subtitle}
                      </p>
                      <time dateTime={line.metadata.dateTime}>
                        {new Date(line.metadata.dateTime).toLocaleString()}
                        <TimeAgo date="Aug 29, 2014" />
                      </time>
                    </header>

                    {/* cards */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <p className="flex flex-col bg-secondary-500/20 py-1 px-4 rounded-lg">
                        <span className="text-lg">
                          {line.metadata.metro_distance} km
                        </span>
                        <small className="opacity-90">Distance in metro</small>
                      </p>
                      <p className="flex flex-col bg-secondary-500/20 py-1 px-4 rounded-lg">
                        <span className="text-lg flex gap-1 items-center">
                          {line.metadata.distance} km
                          <small>
                            ({percentMoreWalkedThanMetroDistance > 0 ? "+" : ""}
                            {percentMoreWalkedThanMetroDistance}%)
                          </small>
                        </span>
                        <small className="opacity-90">Distance in metro</small>
                      </p>
                    </div>

                    <p>Stations: {line.metadata.stations}</p>

                    <p>Time walking: {line.metadata.timeWalking}</p>
                    <p>Speed walking: {line.metadata.velocity}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default StationsPage;
