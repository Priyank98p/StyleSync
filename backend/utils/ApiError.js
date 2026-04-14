// Custom error class for standardized API error responses
class ApiError extends Error {
  constructor(
    statusCode, 
    message = "Something went wrong",
    errors = [], // Array of validation or detailed error objects
    stack = "", // Optional custom stack trace
  ) {
    super(message);

    // Store the HTTP status code for the error response
    this.statusCode = statusCode;

    // Placeholder for additional response data (not currently used)
    this.data = null;

    this.message = message;

    // Store validation or additional errors
    this.errors = errors;

    // Flag indicating the request was unsuccessful
    this.success = false;

    // Use provided stack trace or auto-generate one from constructor call
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
