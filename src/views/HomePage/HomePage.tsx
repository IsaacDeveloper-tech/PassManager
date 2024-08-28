import { View } from "react-native";
import { useTheme } from "react-native-paper";


export function HomePage()
{
    const theme = useTheme();

    return(
        <View
            style= {{
                backgroundColor: theme.colors.background,
                width:"100%",
                height:"100%"
            }}
        ></View>
    );
}