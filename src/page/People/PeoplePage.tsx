import { Avatar, Card, formatString, Tooltip } from "pol-ui";
import { people } from "../../data/people";
import { getLineInfo } from "../../util/get-info";

const PeoplePage = () => {
  return (
    <main className="p-6 flex flex-col gap-6">
      <h1 className="text-xl">Who made this possible</h1>

      <ul className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {people.map((p) => {
          return (
            <li key={p.name}>
              <a href={`/people/${p.id}`}>
                <Card className="flex gap-3 flex-col">
                  <header className="flex items-center gap-2">
                    <Avatar img={p.avatar} alt={p.name} />
                    <hgroup className="flex flex-col ">
                      <h2>{formatString(p.name)}</h2>
                      <h3 className="opacity-80 text-sm truncate">
                        {formatString(p.surnames)}
                      </h3>
                    </hgroup>
                  </header>

                  <div className="flex gap-1 overflow-y-hidden overflow-x-auto">
                    {p.lines_done.map((l) => {
                      return (
                        <Tooltip
                          key={l.name}
                          label={`${getLineInfo(l.name)?.metadata.distance} km`}
                        >
                          <img
                            width={20}
                            height={20}
                            src={`/logos/${l.name}.svg`}
                            alt="logo"
                          />
                        </Tooltip>
                      );
                    })}
                  </div>

                  {/* {getTotalkmPerUser(p.surnames)} -
                  <span className="p-1">
                    {userStopAmount(p.surnames)} paradas -{" "}
                  </span>
                  <ul className="flex gap-1 ">
                    {p.lines_done.map((l) => {
                      return (
                        <li key={l.name} className="flex gap-1 items">
                          <Tooltip
                            label={`${
                              getLineInfo(l.name)?.metadata.distance
                            } km`}
                          >
                            <img
                              width={20}
                              height={20}
                              src={`/logos/${l.name}.svg`}
                              alt="logo"
                            />
                          </Tooltip>
                          <small>
                            {l.percent !== 100 && (
                              <span>
                                {l.percent}% of{" "}
                                {getLineInfo(l.name)?.metadata.distance}
                                km
                              </span>
                            )}
                          </small>
                        </li>
                      );
                    })}
                  </ul> */}
                </Card>
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default PeoplePage;
