import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("home", "routes/home.tsx"),
  route("auth/login", "routes/auth/login.tsx"),
  route("events/:slug", "routes/events/$slug.tsx"),
] satisfies RouteConfig;
