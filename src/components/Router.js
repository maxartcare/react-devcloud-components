import React, { Component } from "react";
import { Switch, Route, BrowserRouter, withRouter } from "react-router-dom";
import Layouter from "./Layouter";
import Container from "../container/Router";

class Router extends Component {
  getVisibleLinks(group, pages) {
    return pages.reduce((links, link) => {
      if (
        (group && link.group && group.indexOf(link.group) === -1) ||
        link.inMenu === false
      )
        return [...links];
      else
        return [
          ...links,
          {
            path: link.path,
            name: link.name,
            icon: link.icon
          }
        ];
    }, []);
  }
  renderRoutes(group, pages) {
    return (
      <Switch>
        {pages.reduce((routes, page, index) => {
          if (group && page.group && group.indexOf(page.group) === -1)
            return [...routes];
          const content = withRouter(props => {
            return (
              <Layouter
                {...this.props.layouter || {}}
                layout={page.layout}
                links={this.getVisibleLinks(group, pages)}
                content={page.component}
                icon={page.icon}
                page={page.name}
                contentProps={page.props || {}}
                routing={props}
              />
            );
          });
          return [
            ...routes,
            <Route
              exact={true}
              key={"switch-" + index}
              path={page.path}
              component={content}
            />,
            (page.aliasPath || []).map((alias, i) => {
              return (
                <Route
                  exact={true}
                  key={"switch-alias-" + index + "-" + i}
                  path={alias}
                  component={content}
                />
              );
            })
          ];
        }, [])}
      </Switch>
    );
  }
  render() {
    const { group, pages } = this.props;
    return <BrowserRouter>{this.renderRoutes(group, pages)}</BrowserRouter>;
  }
}

export default Container(Router);
