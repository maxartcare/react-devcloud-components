import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import Block from "../../components/Block";
import {
  Form,
  Text,
  Radio,
  Range,
  Date,
  MultiSelect,
  Select,
  Time
} from "../../components/Form";

class FormWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: false,
      values: {
        text: "Hallo ich bin ein Textfeld",
        radio: "",
        date: "",
        multiSelect: [],
        select: "",
        range: 0,
        time: ""
      },
      errors: {
        text: false,
        radio: false,
        date: false,
        multiSelect: false,
        select: false
      }
    };
  }
  render() {
    const actions = formActions => (
      <Grid container direction="row" justify="flex-end">
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            style={{ marginRight: "8px" }}
            color="default"
            onClick={e => {
              e.preventDefault();
              let newState = { ...this.state, readOnly: !this.state.readOnly };
              this.setState(newState);
            }}
          >
            read only
          </Button>
          <Button
            variant="contained"
            style={{ marginRight: "8px" }}
            color="default"
            onClick={e => {
              e.preventDefault();
              let newState = { ...this.state };
              newState.errors.text = this.state.errors.text
                ? false
                : "An error occurred...";
              newState.errors.radio = this.state.errors.radio
                ? false
                : "An error occurred...";
              newState.errors.multiSelect = this.state.errors.multiSelect
                ? false
                : "An error occurred...";
              newState.errors.range = this.state.errors.range
                ? false
                : "An error occurred...";
              newState.errors.date = this.state.errors.date
                ? false
                : "An error occurred...";
              newState.errors.select = this.state.errors.select
                ? false
                : "An error occurred...";
              newState.errors.time = this.state.errors.time
                ? false
                : "An error occurred...";
              this.setState(newState);
            }}
          >
            error
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={e => {
              e.preventDefault();
              formActions.togglePending();
              setTimeout(() => {
                formActions.togglePending();
              }, 5000);
            }}
          >
            pending
          </Button>
        </Grid>
      </Grid>
    );
    return (
      <Grid container spacing={8}>
        <Grid item xs={12} lg={6}>
          <Block label="Statisch" head={{ primary: false }}>
            <Form actions={actions}>
              <Text
                xs={12}
                sm={6}
                label="Text"
                value={this.state.values.text}
                readOnly={this.state.readOnly}
                onChange={value => {
                  let newState = { ...this.state };
                  newState.values.text = value;
                  this.setState(newState);
                }}
                error={this.state.errors.text}
              />
              <Text
                xs={12}
                sm={6}
                label="Text Strict"
                strict
                value={this.state.values.text}
                readOnly={this.state.readOnly}
                onChange={value => {
                  let newState = { ...this.state };
                  newState.values.text = value;
                  this.setState(newState);
                }}
                error={this.state.errors.text}
              />
              <Text
                xs={12}
                sm={6}
                label="Changer 4 readOnly"
                value={this.state.values.text}
                onChange={value => {
                  let newState = { ...this.state };
                  newState.values.text = value;
                  this.setState(newState);
                }}
                error={this.state.errors.text}
              />
              <Date
                xs={12}
                sm={6}
                label="Date"
                value={this.state.values.date}
                readOnly={this.state.readOnly}
                onChange={value => {
                  let newState = { ...this.state };
                  newState.values.date = value;
                  this.setState(newState);
                }}
                error={this.state.errors.date}
              />
              <MultiSelect
                xs={12}
                sm={6}
                label="Multiselect"
                options={["option 1", "option 2"]}
                value={this.state.values.multiSelect}
                readOnly={this.state.readOnly}
                onChange={value => {
                  console.log(value);
                  let newState = { ...this.state };
                  newState.values.multiSelect = value;
                  this.setState(newState);
                }}
                error={this.state.errors.radio}
              />
              <Select
                xs={12}
                sm={6}
                label="Select"
                options={["option 1", "option 2"]}
                value={this.state.values.select}
                readOnly={this.state.readOnly}
                onChange={value => {
                  console.log(value);
                  let newState = { ...this.state };
                  newState.values.select = value;
                  this.setState(newState);
                }}
                error={this.state.errors.radio}
              />
              <Time
                xs={12}
                sm={6}
                label="Start"
                value={this.state.values.time}
                readOnly={this.state.readOnly}
                onChange={value => {
                  console.log(value);
                  let newState = { ...this.state };
                  newState.values.time = value;
                  this.setState(newState);
                }}
                error={this.state.errors.time}
              />
              <Range
                xs={12}
                sm={6}
                label="Range"
                options={["option 1", "option 2"]}
                value={this.state.values.range}
                readOnly={this.state.readOnly}
                min={0}
                max={10}
                step={1}
                onChange={value => {
                  let newState = { ...this.state };
                  newState.values.range = value;
                  this.setState(newState);
                }}
                error={this.state.errors.range}
              />
              <Radio
                xs={12}
                sm={6}
                label="Text"
                options={[
                  { value: "radio 1", label: "option 1" },
                  { value: "radio 2", label: "option 2" }
                ]}
                value={this.state.values.radio}
                readOnly={this.state.readOnly}
                onChange={value => {
                  console.log(value);
                  let newState = { ...this.state };
                  newState.values.radio = value;
                  this.setState(newState);
                }}
                error={this.state.errors.radio}
              />
            </Form>
          </Block>
        </Grid>
      </Grid>
    );
  }
}

const style = theme => ({});

export default FormWrapper;
