import Route from './Route';
import Block from '../core/Block';

interface OptionsInterface {
    'title': string;
    'data'?: unknown;
}

class Router {
  routes: Route[] | undefined;

  history: any;

  _currentRoute: Route | null | undefined;

  _rootQuery: string | null | undefined;

  private static __instance: Router | undefined;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: new (props: Record<string, any>) => Block, options: OptionsInterface) {
    const route = new Route(pathname, options.title, block, {
      data: options.data,
      rootQuery: this._rootQuery,
    });
    if (this.routes) {
      this.routes.push(route);
    }
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    // if (store.getState().user.id === undefined && ['/settings', '/change-password', '/messenger'].includes(pathname)) {
    //   this.go('/sign-in');
    //   return;
    // }

    if (route === undefined) {
      this.go('/404');
    } else {
      if (route) {
        document.title = route._title;
      }
      if (!route && this._currentRoute) {
        this._currentRoute.leave();
      }
      if (this._currentRoute) {
        this._currentRoute.leave();
      }
      this._currentRoute = route;

      if (route) {
        route.render();
      }
    }
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    if (this.routes) {
      const index = this.routes.findIndex((route) => route === this._currentRoute);
      this.go(this.routes[index - 1]._pathname);
    }
  }

  forward() {
    if (this.routes) {
      const index = this.routes.findIndex((route) => route === this._currentRoute);
      this.go(this.routes[index + 1]._pathname);
    }
  }

  getRoute(pathname: string) {
    if (this.routes) {
      return this.routes.find((route) => route.match(pathname));
    }
    return null;
  }
}

export default Router;
