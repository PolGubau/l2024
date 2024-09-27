import { Button, formatString, ImageCarousel, toast, Tooltip } from "pol-ui";
import { TbChevronLeft } from "react-icons/tb";
import { redirect, useParams } from "react-router-dom";
import { People, people } from "../../../data/people";
import { getAllImagesByUser, getLineInfo } from "../../../util/get-info";

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
          <img
            src={user?.avatar}
            alt={user?.name}
            width={80}
            height={80}
            className="object-cover rounded-full h-[80px] w-[80px]"
          />
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

        <h2 className="text-lg">{`${user?.name ?? "User"}'s lines gallery`}</h2>

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {getAllImagesByUser(u.id).map((img, i) => {
            return (
              <img
                key={i}
                loading="lazy"
                src={img}
                alt={`${u.name} ${i}`}
                className="rounded-xl"
              />
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default PeopleDetailPage;
