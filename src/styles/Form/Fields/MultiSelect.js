const style = theme => materialUiTheme => {
  let element = {
    labelError: {
      color: theme.palette.danger + " !important"
    },
    labelReadOnly: {
      color: theme.palette.default.dark + " !important",
      fontWeight: "100 !important",
      background: "none",
      "&:focus": {
        background: "none"
      }
    },
    formControl: {
      width: "100%"
    },
    formControl: {
      width: "100%"
    },
    select: {
      "&:focus": { background: "rgba(0, 0, 0, 0)" }
    },
    input: {
      width: "100%",
      "&:hover:before": {
        borderBottom: "1px solid " + theme.palette.default + " !important"
      },
      "&:before": {
        borderBottom: "1px solid " + theme.palette.default + " !important"
      },
      "&:after": {
        borderBottom: "1px solid " + theme.palette.secondary + " !important"
      }
    },
    inputSuccess: {
      width: "100%",
      "&:hover:before": {
        borderBottom: "1px solid " + theme.palette.success + " !important"
      },
      "&:before": {
        borderBottom: "1px solid " + theme.palette.success + " !important"
      },
      "&:after": {
        borderBottom: "1px solid " + theme.palette.success + " !important"
      }
    },
    inputError: {
      width: "100%",
      "&:hover:before": {
        borderBottom: "1px solid " + theme.palette.danger + " !important"
      },
      "&:before": {
        borderBottom: "1px solid " + theme.palette.danger + " !important"
      },
      "&:after": {
        borderBottom: "1px solid " + theme.palette.danger + " !important"
      }
    },
    inputReadonly: {
      width: "100%",
      "&:hover:before": {
        borderBottom: "1px solid #fff !important"
      },
      "&:before": {
        borderBottom: "1px solid #fff !important"
      },
      "&:after": {
        borderBottom: "0px solid"
      }
    },
    chip: {
      height: "15px",
      margin: "2px 1px",
      backgroundColor: theme.palette.primary,
      color: "#fff"
    },
    danger: {
      color: theme.palette.danger
    },
    success: {
      color: theme.palette.success
    },
    default: {
      color: theme.palette.default
    },
    defaultLabel: {
      color: "inherit"
    }
  };
  return element;
};

export default style;
