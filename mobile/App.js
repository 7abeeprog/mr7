import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DeleteAccountScreen from './src/screens/DeleteAccountScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* شاشة تسجيل الدخول */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'تسجيل الدخول' }}
        />
        {/* شاشة الإعدادات */}
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'الإعدادات' }}
        />
        {/* شاشة حذف الحساب */}
        <Stack.Screen 
          name="DeleteAccount" 
          component={DeleteAccountScreen} 
          options={{ title: 'حذف الحساب' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
