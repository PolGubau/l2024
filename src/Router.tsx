import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./page/Home/Home";
import PeoplePage from "./page/People/PeoplePage";
import { buttonVariants } from "pol-ui";
import PeopleDetailPage from "./page/People/PeopleDetailsPage/PeopleDetailsPage";
import StationsPage from "./page/Stations/StationsPage";

export const Router = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:id" element={<PeopleDetailPage />} />{" "}
          <Route path="stations" element={<StationsPage />} />
          <Route
            path="*"
            element={
              <div className="grid h-full place-items-center gap-2 p-10">
                <div className="justify-center flex items-center flex-col gap-4">
                  <h1 className="text-3xl font-bold">404</h1>
                  <Link to="/" className={buttonVariants()}>
                    Go Home
                  </Link>
                </div>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
