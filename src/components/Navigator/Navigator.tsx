import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerScreenProps } from "@react-navigation/drawer";

import { LoginPage } from "../../views/LoginPage/LoginPage";
import { RegisterPage } from "../../views/RegisterPage/RegisterPage";
import { HomePage } from "../../views/HomePage/HomePage";
import { UserConfigurationPage } from "../../views/UserConfigurationPage/UserConfigurationPage";
import { UsersListPage } from "../../views/UsersListPage/UsersListPage";

import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import { IGeneralContext, UserState } from "../../interfaces/contexts/IGeneralContext";

import { useTheme } from "react-native-paper";

type StackNavigation = {
    RegisterPage: undefined,
    LoginPage: {id:number, name:string},
    UsersListPage: undefined
};

export type StackProps = StackScreenProps<StackNavigation>;

function StackNavigator(){
    const stackNavigation = createStackNavigator<StackNavigation>();

    const theme = useTheme();

    return(
        <stackNavigation.Navigator 
        screenOptions={{
            headerShown: false,
            headerTintColor: theme.colors.onBackground
        }}
        initialRouteName="UsersListPage">
            <stackNavigation.Screen
                name="RegisterPage"
                component={RegisterPage}
            />

            <stackNavigation.Screen 
                name="LoginPage"
                component={LoginPage}
                initialParams={{id: 0, name: ""}}
            />

            <stackNavigation.Screen 
                name="UsersListPage"
                component={ UsersListPage }
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

    const theme = useTheme();

    return(
        <drawerNavigation.Navigator 
        initialRouteName="Home"
        screenOptions={{
            headerStyle:{
                backgroundColor: theme.colors.secondary,
                shadowColor: theme.colors.shadow
            },
            drawerStyle:{
                backgroundColor: theme.colors.secondary,
                shadowColor: theme.colors.shadow
            },
            sceneContainerStyle: {
                backgroundColor: theme.colors.background,
            }
        }}>
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