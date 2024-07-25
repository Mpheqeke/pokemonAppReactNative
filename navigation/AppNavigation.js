import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import DetailsScreen from "../screens/Details";

const stackNavigation = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <stackNavigation.Navigator>
                <stackNavigation.Screen name="Home" component={HomeScreen}/>
                <stackNavigation.Screen name="Details" component={DetailsScreen}/>   
            </stackNavigation.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;