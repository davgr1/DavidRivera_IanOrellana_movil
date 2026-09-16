import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Perfil from '../screens/perfil';
import Login from '../screens/login';
import Registro from '../screens/registro';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{title:'Login'}} />
                <Stack.Screen name="Registro" component={Registro} 
                options={{presentation:'modal', title:'Agregar productos'}}/>
                <Stack.Screen name="Perfil" component={Perfil} options={{title:'Perfil'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;