import { formatString, toast, Tooltip } from "pol-ui";
import { useEffect, useRef } from "react";
import { TbChevronLeft } from "react-icons/tb";
import { Link, Navigate, useParams } from "react-router-dom";
import LineImage from "../../../components/Image";
import { people } from "../../../data/people";
import { getAllImagesByUser, getLineInfo } from "../../../util/get-info";

const PeopleDetailPage = () => {
  const { id } = useParams();
  const user = people.find((p) => p.id.toString() === id?.toString());
  const hasNotified = useRef(false);

  useEffect(() => {
    if (!user && !hasNotified.current) {
      hasNotified.current = true;
      toast.error("El participante no existe");
    }
  }, [user]);

  if (!user) return <Navigate to="/people" replace />;

  return (
    <div className="flex justify-center">
      <main className="p-6 flex flex-col gap-6 max-w-5xl w-full">
        <Link
          to="/people"
          className="inline-flex w-fit items-center gap-1 rounded-lg px-3 py-2 hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          <TbChevronLeft aria-hidden="true" />
          Volver a participantes
        </Link>

        <header className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={`Foto de ${user.name}`}
            width={80}
            height={80}
            className="object-cover rounded-full h-[80px] w-[80px]"
          />
          <hgroup className="flex flex-col gap-1">
            <h1 className="text-3xl">{formatString(user.name)}</h1>
            <h2 className="opacity-80 text-xl truncate">
              {formatString(user.surnames)}
            </h2>
          </hgroup>
        </header>

        <ul className="flex gap-1 overflow-y-hidden overflow-x-auto flex-wrap">
          {user?.lines_done.map((l) => {
            const line = getLineInfo(l.name);
            return (
              <li key={l.name}>
                <Tooltip label={`${line?.metadata.distance} km`}>
                  <img
                    width={35}
                    height={35}
                    className="rounded-lg p-1"
                    style={{ backgroundColor: `${line?.metadata.color}` }}
                    src={`/logos/${l.name}.svg`}
                    alt={`Logotipo de la línea ${l.name}`}
                  />
                </Tooltip>
              </li>
            );
          })}
        </ul>

        <h2 className="text-lg">Galería de recorridos de {user.name}</h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {getAllImagesByUser(user.id).map((img, i) => {
            return (
              <LineImage
                key={i}
                image={img}
                alt={`Foto ${i + 1} del recorrido de ${user.name}`}
                className="h-full w-full rounded-xl"
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default PeopleDetailPage;
