export function Router(url) {
  const app = _A; // Assuming `_A` is a global application context object
  const newPage = app.config.routes[url].page;
  const currentRoute = app.route.new;
  const previousRoute = app.route.old;

  // Update route states
  app.route.old = currentRoute;
  app.route.new = {
    url: url,
    page: newPage,
  };

  // Update page visibility states
  app.is[currentRoute.page] = false;
  app.is[newPage] = true;

  if (previousRoute.page) {
    app.was[previousRoute.page] = false;
  }

  app.was[currentRoute.page] = true;
}
