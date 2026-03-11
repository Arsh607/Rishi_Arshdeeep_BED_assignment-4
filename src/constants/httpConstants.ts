export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204, 

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401, // For authentication errors (invalid token)
    FORBIDDEN: 403, // For authorization errors (insufficient role)
    NOT_FOUND: 404,
    CONFLICT: 409, // For resource conflicts
    UNPROCESSABLE_ENTITY: 422, // For validation errors

    // Server error responses
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501, // For unimplemented features
    BAD_GATEWAY: 502, // For external service failures
    SERVICE_UNAVAILABLE: 503, // For temporary service outages
} as const;