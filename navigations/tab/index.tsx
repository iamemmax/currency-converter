import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calculator from '../../screens/Calculator';
import Converter from '../../screens/Converter';
import { TabProps } from '../../types/TabTypes';
import { colors } from '../../components/utils/colors';
import { StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FC, ReactNode, useState } from 'react';
import { Box, Text } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import ConvertStack from '../stack/ConvertStack';

const Tab = createBottomTabNavigator<TabProps>();

interface Props {
    id: string;
    name: keyof TabProps;
    element: FC,
    icon: ReactNode
}
function MyTabs() {
    const [active, setActive] = useState("converter")

    const tabArray: Props[] = [
        {
            id: "1",
            name: "converter",
            icon: <Ionicons name="ios-calculator-outline" size={24} color={active === "converter" ? colors?.text_light : colors?.text_light} />,
            element: ConvertStack


        },
        {
            id: "2",
            name: "calculator",
            icon: <MaterialCommunityIcons name="calculator-variant-outline" size={24} color={active === "calculator" ? colors?.text_light : colors?.text_light} />,
            element: Calculator


        },

    ]

    return (
        <Tab.Navigator initialRouteName='converter'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { ...styles.container }
            }}
        >

            {tabArray?.map((tab: Props) => (
                <Tab.Screen name={tab?.name} component={tab?.element} key={tab?.id}
                    listeners={{
                        tabPress: () => setActive(tab?.name)
                    }}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Box style={[focused && styles.active]}>
                                {tab?.icon}
                                {active === tab?.name &&
                                    <Text
                                        fontSize={RFValue(16)}
                                        color={colors?.text_light}
                                        textTransform="capitalize"
                                        fontWeight={"bold"}
                                    >
                                        {tab?.name}
                                    </Text>}
                            </Box>
                        )
                    }}
                />
            ))}
        </Tab.Navigator>
    );
}

export default MyTabs

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
        // paddingVertical: 20,
        height: 80,
        borderTopColor: colors.bg_light,
        borderTopWidth: 1,
    },
    active: {
        padding: 9,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors?.main,
        borderRadius: 20,
        flexDirection: "row",
        gap: 4
    }
})