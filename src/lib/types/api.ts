export type ApiResponse<T = void> = {
    statusCode: number;
    body: string; // JSON stringified response
};

export type ApiResponseBody<T = void> = {
    message: string;
    data?: T;
};

export type AppointmentData = {
    id: number;
    email: string;
    name: string;
    contactNumber: string;
    date: string;
    time: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
};

export type AvailableSlotsResponse = {
    availableSlots: string[];
};

export type ErrorResponse = {
    message: string;
};

// Helper function to create API response
export function createApiResponse<T>(
    statusCode: number,
    message: string,
    data?: T
): ApiResponse<T> {
    const responseBody: ApiResponseBody<T> = {
        message,
        ...(data && { data })
    };

    return {
        statusCode,
        body: JSON.stringify(responseBody)
    };
}

// Helper function to parse API response
export function parseApiResponse<T>(response: ApiResponse<T>): ApiResponseBody<T> {
    return JSON.parse(response.body);
} 