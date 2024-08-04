import React, {useState} from "react";
import {View, TextInput, Button, Text, StyleSheet} from "react-native";
import { login } from '@/app/(api)/auth';

// @ts-ignore
const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await login(username, password);
            await navigation.navigate('Home');
        } catch (err:any) {
            setError(err.message);
        }
    };

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text>: null}
            <View style={styles.button}>
                <Button title="Login" onPress={handleLogin} />
            </View>
            <Button title="Signup" onPress={() => navigation.navigate('Signup')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 18,
        paddingHorizontal: 8,
    },
    button: {
        marginBottom: 5
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
});

export default LoginScreen;
