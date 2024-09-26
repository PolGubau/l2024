import { Avatar, Card, Chip, formatString, IconButton, Tooltip } from "pol-ui";
import { useState } from "react";
import { people } from "../../data/people";
import { getLineInfo } from "../../util/get-info";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbArrowDown, TbArrowUp } from "react-icons/tb";

const PeoplePage = () => {
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const toggleDirection = () =>
    setDirection((prev) => (prev === "asc" ? "desc" : "asc"));

  const orderedPeople = people.sort((a, b) => {
    return direction === "asc" ? a.kms - b.kms : b.kms - a.kms;
  });

  return (
    <div className="flex justify-center">
      <main className="p-6 flex flex-col gap-6 w-full max-w-5xl pt-16">
        <header className="flex justify-between gap-2">
          <h1 className="text-xl">Who made this possible</h1>
          <IconButton onClick={toggleDirection} label="Sort by km">
            {direction === "asc" ? <TbArrowDown /> : <TbArrowUp />}
          </IconButton>
        </header>
        <ul className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
          {orderedPeople.map((p) => {
            return (
              <li key={p.id}>
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
                        const line = getLineInfo(l.name);
                        return (
                          <Tooltip
                            key={l.name}
                            label={`${line?.metadata.distance} km`}
                          >
                            <img
                              width={23}
                              height={23}
                              className="rounded-lg p-0.5"
                              style={{
                                backgroundColor: `${line?.metadata.color}`,
                              }}
                              src={`/logos/${l.name}.svg`}
                              alt="logo"
                            />
                          </Tooltip>
                        );
                      })}
                    </div>

                    <p className="flex items-center gap-1">
                      <Chip> {p.kms} km</Chip>
                      <Chip textClassName="flex items-center gap-1">
                        {p.stopsAmount} <HiOutlineLocationMarker />
                      </Chip>
                    </p>

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
    </div>
  );
};

export default PeoplePage;
