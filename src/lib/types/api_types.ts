export type ApiResponse<T = void> = {
    statusCode: number;
    body: string; // JSON stringified response
};

export type ApiResponseBody<T = void> = {
    message: string;
    data?: T;
};

export type UserData = {
    id: number;
    name: string;
    email: string;
    age: number;
    phoneNumber?: string;
    address?: string;
    medicalHistory?: string;
    emergencyContact?: string;
    createdAt: string;
    updatedAt: string;
};

export type AppointmentData = {
    id: number;
    userId: number;
    date: string;
    time: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    patientType: 'new' | 'existing';
    hasReferral: boolean;
    referringDoctor?: string;
    hasMedicalAuth: boolean;
    notes?: string;
    createdAt: string;
    updatedAt: string;
    user: UserData;
};

export type AvailableSlotsResponse = {
    availableSlots: string[];
};

export type ErrorResponse = {
    message: string;
};

export type CurrentMonth = {
    startDate: string;
    endDate: string;
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