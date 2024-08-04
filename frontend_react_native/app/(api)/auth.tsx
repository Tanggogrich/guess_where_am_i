import api from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signup = async (username: string, password: string) => {
    try {
        const response = await api.post('/auth/signup', {username, password});
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const login = async (username: string, password: string) => {
    try {
        const response = await api.post('/auth/signin', {username, password})
        const {token} = response.data;
        await AsyncStorage.setItem('token', token);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const logout = async () => {
    await AsyncStorage.removeItem('token');
};

function handleApiError(error: unknown): never {
    if (error instanceof Error) {
        console.error('Error message:', error.message);
        throw new Error('An error occurred while making an API call');
    }

    throw new Error('An unknown error occurred');
}