import { React, lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Loading from "../components/Loading";
import PageLoading from "../components/PageLoading";

const Navbar = lazy(() => import("../components/Navbar"));
const Gozleg = lazy(() => import("../pages/gozleg/Gozleg"));
const GozlegDetail = lazy(() => import("../pages/gozleg/GozlegDetail"));
const Admin = lazy(() => import("../pages/admin/Admin"));
const Login = lazy(() => import("../pages/login/Login"));
const Users = lazy(() => import("../pages/admin/components/Users"));
const Kanunlar = lazy(() => import("../pages/admin/components/Kanunlar"));
const Jenayatcylar = lazy(() =>
  import("../pages/admin/components/Jenayatcylar")
);

function Router() {
  let routes = useRoutes([
    {
      element: (
        <Suspense fallback={<Loading size="60px" />}>
          <Login />
        </Suspense>
      ),
      path: "/",
    },
    {
      element: (
        <Suspense fallback={<PageLoading size="60px" />}>
          <Navbar />
        </Suspense>
      ),
      children: [
        {
          path: "/gozleg",
          element: (
            <Suspense fallback={<Loading size="50px" />}>
              <Gozleg />
            </Suspense>
          ),
        },
        {
          path: "/gozleg/detail/:id",
          element: (
            <Suspense fallback={<Loading size="50px" />}>
              <GozlegDetail />
            </Suspense>
          ),
        },
        {
          path: "admin",
          element: (
            <Suspense fallback={<Loading size="50px" />}>
              <Admin />
            </Suspense>
          ),
          children: [
            {
              path: "ulanyjylar",
              element: (
                <Suspense fallback={<Loading size="50px" />}>
                  <Users />
                </Suspense>
              ),
            },
            {
              path: "kanunlar",
              element: (
                <Suspense fallback={<Loading size="50px" />}>
                  <Kanunlar />
                </Suspense>
              ),
            },
            {
              path: "jenayatcylar",
              element: (
                <Suspense fallback={<Loading size="50px" />}>
                  <Jenayatcylar />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      element: <Navigate to="/" />,
      path: "*",
    },
  ]);
  return routes;
}

export default Router;
