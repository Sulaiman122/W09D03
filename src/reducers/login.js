//give it the initial state after first loading
const initialState = {
  token: localStorage.getItem('token'),
  role: "user",
};

// the reducer has 2 parameters (state and actions)
const SignIn = (state = initialState, action) => {
  //distracture our action we passed from the action
  const { type, payload } = action;

  // check for action perforemed and do its logic as mention below the case
  switch (type) {
    case "LOGIN":
      const { token, role } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      // make sure to return the new state
      return { token, role };

    default:
      // if no action found return initial/previous state
      return state;
  }
};





export default SignIn;
