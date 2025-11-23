import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  layout('./routes/home.tsx', [
    index('./routes/start-page.tsx'),
    route('user', './routes/user.tsx'),
    route('toll-calculator', './routes/toll-calculator.tsx'),
    route('toll-history', './routes/toll-history.tsx'),
  ]),
  layout('./routes/auth/auth-layout.tsx', [
    route('login', './routes/auth/login.tsx'),
    route('logout', './routes/auth/logout.tsx'),
  ]),
  route('*', './routes/$.tsx'),
] satisfies RouteConfig
