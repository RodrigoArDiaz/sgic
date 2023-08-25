const estiloScrollbar = {
  "&::-webkit-scrollbar": {
    width: "0.25em",
  },
  "&::-webkit-scrollbar-track": {
    // boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    // webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    // backgroundColor: "rgba(0,0,0,0.1)",
    backgroundColor: "secondary.light100",
    "&:hover": {},
    // outline: "1px solid rgba(0,0,0,0.3)",
    borderRadius: "10px",
  },
};

export { estiloScrollbar };
