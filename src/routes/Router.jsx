import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import AuthGuard from "../guards/AuthGuard";
import NoAuthGuard from "../guards/NoAuthGuard";
import AdminLayout from "layouts/admin/AdminLayout";
import HomeLayout from "layouts/home/HomeLayout";
import AdminGuard from "guards/AdminGuard";

const EditFormUser = lazy(() => import("pages/editformuser/EditFormUser"));
const UserForm = lazy(() => import("pages/use-form/UserForm"));
const UserList = lazy(() => import("pages/userlist/UserList"));
const Profile = lazy(() => import("pages/profile/Profile"));
const MovieShowTime = lazy(() => import("pages/movie-showtime/MovieShowTime"));
const MovieManagement = lazy(() =>
  import("pages/movie-management/MovieManagement")
);
const MovieForm = lazy(() => import("pages/movie-form/MovieForm"));
const Login = lazy(() => import("pages/login/Login"));
const Register = lazy(() => import("pages/register/Register"));
const MovieDetail = lazy(() => import("pages/movie-detail/MovieDetail"));
const Booking = lazy(() => import("pages/booking/Booking"));
const HomePage = lazy(() => import("pages/home/HomePage"));
const NotFound = lazy(() => import("pages/notfound/NotFound"));

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "/movie-detail/:id", // id: mã phim
          element: (
            <Suspense>
              <MovieDetail />
            </Suspense>
          ),
        },
        {
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/booking/:id", // id: mã lịch chiếu
              element: (
                <Suspense>
                  <Booking />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "/profile",
          element: (
            <Suspense>
              <Profile />
            </Suspense>
          ),
        },
        {
          path: "/",
          element: <NoAuthGuard />,
          children: [
            {
              path: "/login",
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "/",
          element: <NoAuthGuard />,
          children: [
            {
              path: "/register",
              element: (
                <Suspense>
                  <Register />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: (
            <Suspense>
              <AdminGuard />
            </Suspense>
          ),
          children: [
            {
              path: "/admin/userlist",
              element: (
                <Suspense>
                  <UserList />
                </Suspense>
              ),
            },
            {
              path: "/admin/adduser",
              element: (
                <Suspense>
                  <UserForm />
                </Suspense>
              ),
            },
            {
              path: "/admin/edituser",
              element: (
                <Suspense>
                  <EditFormUser />
                </Suspense>
              ),
            },
            {
              path: "/admin/films",
              element: (
                <Suspense>
                  <MovieManagement />
                </Suspense>
              ),
            },
            {
              path: "/admin/films/addnew",
              element: (
                <Suspense>
                  <MovieForm />
                </Suspense>
              ),
            },
            {
              path: "/admin/films/edit/:id",
              element: (
                <Suspense>
                  <MovieForm />
                </Suspense>
              ),
            },
            {
              path: "/admin/films/showtime/:id",
              element: (
                <Suspense>
                  <MovieShowTime />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      ),
    },
  ]);

  return routing;
}
