export const getToken = () => {
  let data = JSON.parse(localStorage.getItem("criminal-app"));
  if (data) {
    return data.token;
  } else {
    return null;
  }
};
