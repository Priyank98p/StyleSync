// Higher-order function that wraps async route handlers to automatically catch promise rejections and pass them to error middleware
const asyncHandler = (requestHandler) => {
  // Return middleware function that executes the request handler and catches any errors
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error),
    );
  };
};
export {asyncHandler}