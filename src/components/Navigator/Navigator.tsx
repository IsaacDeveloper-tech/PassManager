import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerScreenProps } from "@react-navigation/drawer";

import { LoginPage } from "../../views/LoginPage/LoginPage";
import { RegisterPage } from "../../views/RegisterPage/RegisterPage";
import { HomePage } from "../../views/HomePage/HomePage";
import { UserConfigurationPage } from "../../views/UserConfigurationPage/UserConfigurationPage";

import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import { IGeneralContext, UserState } from "../../interfaces/contexts/IGeneralContext";

type StackNavigation = {
    RegisterPage: undefined,
    LoginPage: undefined
};

export type StackProps = StackScreenProps<StackNavigation>;

function StackNavigator(){
    const stackNavigation = createStackNavigator<StackNavigation>();

    return(
        <stackNavigation.Navigator 
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="LoginPage">
            <stackNavigation.Screen
                name="RegisterPage"
                component={RegisterPage}
            />

            <stackNavigation.Screen 
                name="LoginPage"
                component={LoginPage}
            />
        </stackNavigation.Navigator>
    );
}

type DrawerNavigation = {
    Home: undefined,
    "User Configuration":undefined
};

export type DrawerProps = DrawerScreenProps<DrawerNavigation>;

function DrawerNavigator(){
    const drawerNavigation = createDrawerNavigator<DrawerNavigation>();

    return(
        <drawerNavigation.Navigator initialRouteName="Home">
            <drawerNavigation.Screen
                name="Home"
                component={HomePage}
            />
            <drawerNavigation.Screen 
                name = "User Configuration"
                component={UserConfigurationPage}
            />
        </drawerNavigation.Navigator>
    );
}

export function Navigator() {

    const { userIsLogged }:UserState = useContext<IGeneralContext>(GeneralContext).userState;

    return(
        <>
            {   !userIsLogged &&
                <StackNavigator />
            }
            {   userIsLogged &&
                <DrawerNavigator />
            }
        </>
    );
}