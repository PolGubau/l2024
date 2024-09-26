import { redirect, useParams } from "react-router-dom";
import { people } from "../../../data/people";
import { Avatar, Button, formatString, toast, Tooltip } from "pol-ui";
import { getLineInfo } from "../../../util/get-info";
import { People } from "../../../data/stops";
import { TbChevronLeft } from "react-icons/tb";

const PeopleDetailPage = () => {
  const { id } = useParams();

  const user = people.find((p) => p.id.toString() === id?.toString());

  if (!id || !user) {
    toast.error("This user doesn't exist");
    redirect("/people");
  }
  const u: People = user!;
  return (
    <div className="flex justify-center">
      <main className="p-6 flex flex-col gap-6 max-w-5xl w-full">
        <a href="/people" className="flex items-center gap-1">
          <Button variant={"ghost"} tabIndex={0}>
            <TbChevronLeft className="inline" />
            Back
          </Button>
        </a>

        <header className="flex items-center gap-3">
          <Avatar img={user?.avatar} size="lg" alt={user?.name} />
          <hgroup className="flex flex-col gap-1">
            <h1 className="text-3xl">{formatString(u.name)}</h1>
            <h2 className="opacity-80 text-xl truncate">
              {formatString(u.surnames)}
            </h2>
          </hgroup>
        </header>

        <ul className="flex gap-1 overflow-y-hidden overflow-x-auto flex-wrap">
          {user?.lines_done.map((l) => {
            const line = getLineInfo(l.name);
            return (
              <li>
                <Tooltip key={l.name} label={`${line?.metadata.distance} km`}>
                  <img
                    width={35}
                    height={35}
                    className="rounded-lg p-1"
                    style={{ backgroundColor: `${line?.metadata.color}` }}
                    src={`/logos/${l.name}.svg`}
                    alt="logo"
                  />
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default PeopleDetailPage;
