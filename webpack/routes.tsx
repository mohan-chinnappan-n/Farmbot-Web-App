import "./css/_index.scss";
import * as React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { store as _store } from "./redux/store";
import { history } from "./history";
import { Store } from "./redux/interfaces";
import { ready } from "./config/actions";
import { Session } from "./session";
import { attachToRoot } from "./util";
import { Callback } from "i18next";
import { topLevelRoutes } from "./route_config";

interface RootComponentProps { store: Store; }

export const attachAppToDom: Callback = () => {
  attachToRoot(RootComponent, { store: _store });
  _store.dispatch(ready());
};

export class RootComponent extends React.Component<RootComponentProps, {}> {
  componentWillMount() {
    const notLoggedIn = !Session.fetchStoredToken();
    const restrictedArea = window.location.pathname.includes("/app");
    (notLoggedIn && restrictedArea && Session.clear());
  }

  render() {
    return <Provider store={_store}>
      <Router history={history}>
        {topLevelRoutes}
      </Router>
    </Provider>;
  }
}
