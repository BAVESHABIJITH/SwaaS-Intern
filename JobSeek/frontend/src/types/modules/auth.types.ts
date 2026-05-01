export interface User{
    id : number;
    name: string;
    email:string;
    role:string;
    createdAt:string;
}

export interface AuthResponse{
    success: boolean;
    message: string;
    accessToken?: string
    refeshToken?:string
    user?: User | null;
}

export interface LoginCredentials{
    email:string;
    password:string;
}

export interface RegisterData{
    name:string;
    email:string;
    password:string;
    role: string;
}

export interface ApiResponse<T>{
    success: boolean;
    message: string;
    data?: T;
}

