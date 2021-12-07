 export const logIn = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const LogOut = () => {
  return {
    type: "LOGOUT",
  };
};

export const TODO = (data) => {
  return {
    type: "TODO",
    payload: data,
  };
};