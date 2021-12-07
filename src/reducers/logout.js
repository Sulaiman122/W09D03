// the reducer has 2 parameters (state and actions)

const LogOut = (state = "", action) => {
  //distracture our action we passed from the action
  const { type } = action;

  // check for action perforemed and do its logic as mention below the case
  switch (type) {
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return state;
    default:
      // if no action found return initial/previous state
      return state;
  }
};

export default LogOut;
