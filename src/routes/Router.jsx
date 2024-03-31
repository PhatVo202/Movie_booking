import React from "react";

import { useRoutes } from "react-router-dom";
import AdminGuard from "../guards/AdminGuard";
import AuthGuard from "../guards/AuthGuard";
import NoAuthGuard from "../guards/NoAuthGuard";
import { AdminLayout } from "layouts/admin/AdminLayout";
import HomeLayout from "layouts/home/HomeLayout";
import Booking from "pages/booking/Booking";
import HomePage from "pages/home/HomePage";
import Login from "pages/login/Login";
import MovieDetail from "pages/movie-detail/MovieDetail";
import MovieManagement from "pages/movie-management/MovieManagement";
import Register from "pages/register/Register";
import MovieForm from "pages/movie-form/MovieForm";
import MovieShowTime from "pages/movie-showtime/MovieShowTime";
import Profile from "pages/profile/Profile";
import UserList from "pages/userlist/UserList";
import UserForm from "pages/use-form/UserForm";
import EditFormUser from "pages/editformuser/EditFormUser";
import NotFound from "pages/notfound/NotFound";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/movie-detail/:id", // id: mã phim
          element: <MovieDetail />,
        },
        {
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/booking/:id", // id: mã lịch chiếu
              element: <Booking />,
            },
          ],
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/",
          element: <NoAuthGuard />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
          ],
        },
        {
          path: "/",
          element: <NoAuthGuard />,
          children: [
            {
              path: "/register",
              element: <Register />,
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
          element: <AdminGuard />,
          children: [
            {
              path: "/admin/userlist",
              element: <UserList />,
            },
            {
              path: "/admin/adduser",
              element: <UserForm />,
            },
            {
              path: "/admin/edituser",
              element: <EditFormUser />,
            },
            {
              path: "/admin/films",
              element: <MovieManagement />,
            },
            {
              path: "/admin/films/addnew",
              element: <MovieForm />,
            },
            {
              path: "/admin/films/edit/:id",
              element: <MovieForm />,
            },
            {
              path: "/admin/films/showtime/:id",
              element: <MovieShowTime />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routing;
}
