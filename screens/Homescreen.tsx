import { Box, Text } from 'native-base'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../components/utils/colors';

const Homescreen = () => {
    return (
        <Box safeAreaTop flex={"1"} bgColor={colors.bg}>
            <Text fontSize={RFValue(20)} color={colors.text_light}>Homescreen</Text>
        </Box>
    )
}

export default Homescreen
