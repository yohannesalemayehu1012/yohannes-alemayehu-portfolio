export const getErrorMessage = (error, fallback = "Something went wrong.") => {
  if (!error) {
    return fallback;
  }

  if (error.code === "ECONNABORTED") {
    return "The request took too long. Please try again.";
  }

  if (error.response) {
    return error.response.data?.message || fallback;
  }

  if (error.request) {
    return "Unable to connect to the server.";
  }

  return fallback;
};
