import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"

const api = axios.create({
    baseURL: 'http://localhost:8080/guesser'
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if(token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;