import React from 'react';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'store/index';
import Layout from 'components/layout/layout';
import App from 'containers/app/app';
import Search from 'containers/search/search';

const routes = (
  <ConnectedRouter history={history}>
    <Layout>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
      </Switch>
    </Layout>
  </ConnectedRouter>
);

export default routes;
