// Standardized API response class for consistent response structure across the application
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;  // Store the response payload (user data, results, etc.)
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
