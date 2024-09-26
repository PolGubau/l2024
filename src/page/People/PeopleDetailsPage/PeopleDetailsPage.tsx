import { redirect, useParams } from "react-router-dom";
import { people } from "../../../data/people";
import { Avatar, formatString, toast, Tooltip } from "pol-ui";
import { getLineInfo } from "../../../util/get-info";
import { People } from "../../../data/stops";

const PeopleDetailPage = () => {
  const { id } = useParams();

  const user = people.find((p) => p.id.toString() === id?.toString());

  if (!id || !user) {
    toast.error("This user doesn't exist");
    redirect("/people");
  }
  const u: People = user!;
  return (
    <main className="p-6 flex flex-col gap-6">
      <header className="flex items-center gap-2">
        <Avatar img={user?.avatar} size="lg" alt={user?.name} />
        <hgroup className="flex flex-col ">
          <h1 className="text-2xl">{formatString(u.name)}</h1>
          <h2 className="opacity-80 text-lg truncate">
            {formatString(u.surnames)}
          </h2>
        </hgroup>
      </header>

      <div className="flex gap-1 overflow-y-hidden overflow-x-auto">
        {user?.lines_done.map((l) => {
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
    </main>
  );
};

export default PeopleDetailPage;
