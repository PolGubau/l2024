import { Avatar, Card } from "pol-ui";
import { Link } from "react-router-dom";
import LineImg from "../../components/LineImg";
import { linesData } from "../../data/lines";
import { getPeopleByLine } from "../../util/get-info";

const StationsPage = () => {
  return (
    <div className="flex justify-center">
      <main className="p-6 flex flex-col gap-6 w-full max-w-5xl pt-16">
        <header className="flex justify-between gap-2">
          <h1 className="text-xl">Información de líneas</h1>
        </header>
        <ul className="flex gap-2 flex-col divide-y divide-secondary/40">
          {linesData.map((line) => {
            const percentMoreWalkedThanMetroDistance = Math.round(
              ((line.metadata.distance - line.metadata.metro_distance) /
                line.metadata.metro_distance) *
                100
            );

            return (
              <li key={line.id} className="p-0 w-full">
                <article className="flex gap-4 py-4">
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
                      {" "}
                      <time
                        dateTime={line.metadata.dateTime}
                        className="flex gap-2 items-center text-sm"
                      >
                        Recorrido el {new Date(line.metadata.dateTime).toLocaleDateString("es-ES")}
                      </time>
                      {/* <h2 className="text-2xl">{line.id}</h2> */}
                      <p className="text-lg ">{line.metadata.subtitle}</p>
                      <p className="opacity-85">
                        Estaciones: {line.metadata.stations}
                      </p>
                    </header>
                    {/* cards */}
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <Card childrenClass="py-2 px-4 gap-0">
                        <span className="text-lg">
                          {line.metadata.metro_distance} km
                        </span>
                        <small className="opacity-90">Distancia en metro</small>
                      </Card>
                      <Card childrenClass="py-2 px-4 gap-0">
                        <span className="text-lg flex gap-1 items-center">
                          {line.metadata.distance} km
                          <small>
                            ({percentMoreWalkedThanMetroDistance > 0 ? "+" : ""}
                            {percentMoreWalkedThanMetroDistance}%)
                          </small>
                        </span>
                        <small className="opacity-90">Distancia caminada</small>
                      </Card>
                      <Card childrenClass="py-2 px-4 gap-0">
                        <span className="text-lg">
                          {line.metadata.timeWalking}
                        </span>
                        <small className="opacity-90">Tiempo caminando</small>
                      </Card>
                      <Card childrenClass="py-2 px-4 gap-0">
                        <span className="text-lg flex gap-1 items-center">
                          {line.metadata.velocity} km/h
                        </span>
                        <small className="opacity-90">Velocidad media</small>
                      </Card>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3>Gracias a</h3>
                      <ul className="flex flex-col gap-2">
                        {getPeopleByLine(line.id).map((p) => (
                          <li key={p.name} className="flex gap-2 items-center">
                            <Link
                              to={`/people/${p.id}`}
                              className="flex gap-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                            >
                              <Avatar
                                img={p.avatar}
                                size="xs"
                                className="object-cover"
                              />
                              <span>{p.name}</span>
                              <span className="opacity-70">
                                {p.surnames}
                              </span>{" "}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
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
