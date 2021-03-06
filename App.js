import React from 'react';
import StackNavigator from './StackNavigator';
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import { NavigationContainer } from "@react-navigation/native"
import { AuthProvider } from './hooks/useAuth';

export default function App() {
	return ( 
		<NavigationContainer >
			{/* HOC - Higher Order Component */}
			<AuthProvider>
				{/* Passes down the cool stuff to the children */}
				<StackNavigator />
			</AuthProvider>
		</NavigationContainer>
	);
}