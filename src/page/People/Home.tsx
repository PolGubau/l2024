import { people } from "../../data/people/people";

const PeoplePage = () => {
  return (
    <main>
      <h1>Who made this possible</h1>

      {people.map((p) => {
        return (
          <div>
            <header className="grid grid-cols-[160px,1fr] gap-2">
              {p.name}

              <ul className="flex gap-1 ">
                {p.lines_done.map((l) => {
                  return (
                    <img
                      width={20}
                      height={20}
                      src={`/logos/${l.name}.svg`}
                      alt="logo"
                    />
                  );
                })}
              </ul>
            </header>
          </div>
        );
      })}
    </main>
  );
};

export default PeoplePage;
