//give it the initial state after first loading
const initialState = {
  todo: [],
};

// the reducer has 2 parameters (state and actions)
const TODO = (state = initialState, action) => {
  const { type, payload } = action;

  // check for action perforemed and do its logic as mention below the case
  switch (type) {
    case "TODO":
      console.log(payload);
      return payload;
    default:
      // if no action found return initial/previous state
      return state;
  }
};

export default TODO;
