import { Stack } from 'expo-router'

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                // API Reference: https://reactnavigation.org/docs/native-stack-navigator#options
                headerShown: false,
            }}
        >
            <Stack.Screen name='index' />
        </Stack>
    )
}