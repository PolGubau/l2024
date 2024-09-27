import { buttonVariants, cn, DarkThemeToggle, formatString } from "pol-ui";
import { IconType } from "react-icons";
import { TbBusStop, TbMap, TbUsers } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
interface Route {
  to: string;
  icon: IconType;
  label: string;
}
const routes: Route[] = [
  {
    to: "/",
    icon: TbMap,
    label: "map",
  },
  {
    to: "/people",
    icon: TbUsers,
    label: "people",
  },
  {
    to: "/stations",
    icon: TbBusStop,
    label: "stations",
  },
];

const classes = {
  common: cn(
    buttonVariants({
      variant: "outline",
    }),
    "rounded-none border-x-none"
  ),
  active: "bg-primary",
  pending: "opacity-50 ",
  first: "rounded-l-2xl rounded-r-none border-r-0",
  last: "rounded-r-2xl rounded-l-none border-l-0",
};

interface NavItemProps extends Route {
  idx: number;
  amount: number;
}
const NavItem = (props: NavItemProps) => {
  const { icon: Icon } = props;

  const isFirst = props.idx === 0;
  const isLast = props.idx === props.amount - 1;

  return (
    <li>
      <NavLink
        to={props.to}
        title={props.label}
        className={({ isActive, isPending }) =>
          cn(
            "items-center",
            classes.common,
            isActive && classes.active,
            isPending && classes.pending,
            isFirst && classes.first,
            isLast && classes.last
          )
        }
      >
        <Icon size={18} />
        {formatString(props.label)}
      </NavLink>
    </li>
  );
};

const Layout = () => {
  return (
    <>
      <DarkThemeToggle className="absolute top-4 right-4 z-40 bg-secondary-50 dark:bg-secondary-900" />
      <main className="relative w-screen min-h-[100dvh] overflow-hidden grid grid-rows-[1fr,auto] bg-secondary-50 dark:bg-secondary-900 text-secondary-900 dark:text-secondary-50 pb-10">
        <Outlet />
        <ul className="flex justify-center p-2  w-full bg-secondary-50 dark:bg-secondary-900 fixed bottom-0 left-0 ">
          {routes.map((k, i) => {
            return <NavItem {...k} key={i} idx={i} amount={routes.length} />;
          })}
        </ul>
      </main>
    </>
  );
};

export default Layout;
