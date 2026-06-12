export const errorHandler = (err, req, res, next) => {
  const defaultMessage =
    process.env.NODE_ENV === "production"
      ? "Something went wrong"
      : err.message;

  const { status = 500, message = defaultMessage } = err;

  res.status(status).json({ message });
};
