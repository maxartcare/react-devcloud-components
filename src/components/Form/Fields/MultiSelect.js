import React, { Component } from "react";
import classNames from "classnames";
import {
  CircularProgress,
  Input,
  InputLabel,
  FormControl,
  Select,
  Chip,
  MenuItem
} from "@material-ui/core";
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationCircle,
  faLockAlt
} from "@fortawesome/pro-light-svg-icons";
import settings from "./../settings";

import Theme from "../../Theme";
import defaultStyle from "../../../styles/Form/Fields/MultiSelect";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
let MenuProps = {
  PaperProps: {
    style: {
      border: "1px solid #ececec",
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      whiteSpace: "normal"
    }
  }
};
class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      pending: false,
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    MenuProps.onExiting = e => {
      this.handleClose(e);
    };
  }
  componentWillUnmount() {
    if (this.timer) window.clearTimeout(this.timer);
  }
  handleChange(e) {
    this.setState({
      ...this.state,
      value: e.target.value
    });
  }
  handleClose(e) {
    const value = this.state.value;
    this.setState({
      ...this.state,
      success: false,
      pending: !!this.props.instant
    });
    if (this.timer) window.clearTimeout(this.timer);
    if (!!this.props.instant)
      this.timer = window.setTimeout(async () => {
        const success = await Promise.resolve(
          this.props.onChange(value || null)
        );
        this.setState({ ...this.state, success, pending: false });
        if (this.state.success) {
          window.setTimeout(() => {
            this.setState({ ...this.state, success: false });
          }, settings.successTime);
        }
      }, settings.delay);
    else this.props.onChange(value);
  }
  render() {
    const { classes, xs, sm, md, lg, readOnly } = this.props;
    const hasError =
      this.props.error && !this.props.readOnly && !this.state.pending;
    const isSuccess =
      this.state.success && !this.props.readOnly && !this.state.pending;
    const hasValues =
      (readOnly && this.props.value.length) ||
      (!readOnly && this.state.value.length)
        ? true
        : false;
    return (
      <Grid item {...{ xs, sm, md, lg }}>
        <div className="instant-form-control">
          <FormControl className={classes.formControl}>
            <InputLabel
              className={classNames([
                isSuccess ? classes.success : "",
                hasError ? classes.danger : ""
              ])}
            >
              {this.props.label}
              {this.state.pending && (
                <CircularProgress
                  className={classes.default}
                  style={{ marginLeft: "5px", display: "inline-block" }}
                  size={13}
                />
              )}
              {readOnly && (
                <FontAwesomeIcon
                  className={classes.default}
                  style={{ marginLeft: "5px" }}
                  icon={faLockAlt}
                />
              )}
              {hasError && (
                <FontAwesomeIcon
                  className={classes.danger}
                  style={{ marginLeft: "5px" }}
                  icon={faExclamationCircle}
                />
              )}
              {isSuccess && (
                <FontAwesomeIcon
                  className={classes.success}
                  style={{ marginLeft: "5px" }}
                  icon={faCheck}
                />
              )}
            </InputLabel>
            <Select
              style={{
                whiteSpace: "normal"
              }}
              classes={{ selectMenu: classes.select }}
              multiple
              value={readOnly ? this.props.value : this.state.value}
              readOnly={readOnly}
              onChange={this.handleChange}
              onClose={this.handleClose}
              input={
                <Input
                  className={classNames([
                    isSuccess
                      ? classes.inputSuccess
                      : hasError
                      ? classes.inputError
                      : readOnly
                      ? classes.inputReadonly
                      : classes.input
                  ])}
                />
              }
              renderValue={selected => (
                <div>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {this.props.options.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {hasError && (
            <Typography
              className={classNames([hasError ? classes.danger : ""])}
              variant="body2"
              gutterBottom
              style={{ display: "inline" }}
            >
              {this.props.error}
            </Typography>
          )}
        </div>
      </Grid>
    );
  }
}

export default withStyles(Theme.getStyle("Form/Fields/MultiSelect", defaultStyle))(
  MultiSelect
);
