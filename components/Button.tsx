import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { Box, Text } from 'native-base'
import { colors } from './utils/colors'
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
    title?: ReactNode | string;
    handlePress?: () => void;
    props?: InterfaceBoxProps;
    isBlue?: boolean;
    isDanger?: boolean;

}
const Button = ({ title, handlePress, props, isDanger, isBlue }: Props) => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <Box {...props} mt={"10px"} width={"65px"} height={"65px"} justifyContent="center" alignItems={"center"}>
                <Text fontSize={RFValue(30)} color={isBlue ? colors?.btn_blue : isDanger ? colors?.btn_danger : colors?.text_light}>{title}</Text>
            </Box>
        </TouchableOpacity>
    )
}

export default Button