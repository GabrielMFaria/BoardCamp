export default function errorMiddleware(err, req, res, next) {
  console.error(err);

  if (err.type === "not_found") {
    return res.status(404).send(err.message);
  }

  if (err.type === "conflict") {
    return res.status(409).send(err.message);
  }

  if (err.type === "unprocessable_entity") {
    return res.status(422).send(err.message);
  }

  if (err.type === "bad_request") {
    return res.status(400).send(err.message);
  }

  return res.status(500).send("Internal Server Error");
}
