import { buttonVariants, cn, DarkThemeToggle, formatString } from "pol-ui";
import { NavLink, Outlet } from "react-router-dom";

const routes = {
  map: "/",
  people: "/people",
} as const;

const classes = {
  common: buttonVariants({
    variant: "ghost",
  }),
  active: "bg-primary",
  pending: "opacity-50 animation-",
};

const NavItem = (props: typeof NavItem) => {
  return (
    <li>
      <NavLink
        {...props}
        className={({ isActive, isPending }) =>
          cn(
            classes.common,
            isActive && classes.active,
            isPending && classes.pending
          )
        }
      >
        {formatString(props.children)}
      </NavLink>
    </li>
  );
};

const Layout = () => {
  return (
    <main className="relative w-screen h-screen bg-secondary-50 dark:bg-secondary-900 text-secondary-900 dark:text-secondary-50 ">
      <DarkThemeToggle className="absolute top-4 right-4 z-40 bg-secondary-50 dark:bg-secondary-900" />
      <Outlet />
      <ul className="flex justify-center p-2  w-full bg-secondary-50">
        {Object.keys(routes).map((k) => {
          const v = routes[k];
          return <NavItem to={v}>{k}</NavItem>;
        })}
      </ul>
    </main>
  );
};

export default Layout;
