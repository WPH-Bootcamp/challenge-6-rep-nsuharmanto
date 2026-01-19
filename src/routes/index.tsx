import { lazy } from "react";

interface Router {
  path: string;
  element: React.LazyExoticComponent<React.FC>;
}

export const routes: Router[] = [
  {
    path: "/",
    element: lazy(() => import("../components/pages/homepage/Homepage")),
  },
  {
    path: "/movie/:id",
    element: lazy(() => import("../components/pages/detailpage/Detailpage")),
  },
  {
    path: "/favorites",
    element: lazy(() => import("../components/pages/favoritepage/Favoritepage")),
  },
];