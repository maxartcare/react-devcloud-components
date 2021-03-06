import React, { Component } from "react";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import Admin from "./layouts/Admin";
import EmptyPage from "./layouts/EmptyPage";
import AppBarOnly from "./layouts/AppBarOnly";
import { CircularProgress } from "@material-ui/core";
import CenterElements from "../CenterElements";
import Container from "../../container/Layouter";

import Theme from "../Theme";
import defaultStyle from "../../styles/Layouter";

class Layouter extends Component {
  constructor(props) {
    super(props);
    const loadContentAsync = typeof props.content === "function";
    this.state = {
      content: {
        pending: loadContentAsync,
        toCreate: !loadContentAsync ? props.content : null,
        error: false
      }
    };
    this.loadContent = this.loadContent.bind(this);

    if (loadContentAsync) this.loadContent();
    else this.props.dispatch(this.props.on, "contentLoaded");
  }
  async loadContent() {
    const module = await this.props.content();
    const content = {
      ...this.state.content,
      pending: false,
      error: false,
      toCreate: module.default
    };
    this.props.dispatch(this.props.on, "contentLoaded");
    this.setState({ ...this.state, content });
  }

  getLayout(name, params) {
    const { on, signOut } = this.props;
    switch (name) {
      case "admin":
        return (
          <Admin
            {...params}
            signOut={() => this.props.dispatch(this.props.on, "signOut")}
          />
        );
      case "emptyPage":
        return <EmptyPage {...params} />;
      case "appBarOnly":
        return (
          <AppBarOnly
            {...params}
            signOut={() => this.props.dispatch(this.props.on, "signOut")}
          />
        );
    }
  }

  renderPendingContent() {
    const { classes } = this.props;
    return (
      <div className={classes.pendingIconWrapper}>
        <CenterElements textAlign="center">
          <CircularProgress size={60} />
        </CenterElements>
      </div>
    );
  }

  render() {
    const { layout, page, links, contentProps, routing } = this.props;
    const { content } = this.state;

    return (
      <MuiThemeProvider theme={Theme.convert("material-ui")}>
        <div>
          {this.getLayout(layout, {
            page: page || "",
            links: links || [],
            content: !content.pending
              ? React.createElement(content.toCreate, { ...contentProps })
              : this.renderPendingContent(),
            routing
          })}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(Theme.getStyle("Layouter", defaultStyle))(
  Container(Layouter)
);

export { Admin };
