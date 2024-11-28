function status(request, response) {
  response.status(200).json({
    ola: "mundo",
  });
}

export default status;
