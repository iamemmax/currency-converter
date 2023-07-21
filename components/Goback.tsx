import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Box, IconButton, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { colors } from './utils/colors';
import { RFValue } from 'react-native-responsive-fontsize';


interface Props {
    title?: string
}
const Goback = ({ title }: Props) => {
    const navigation = useNavigation()
    return (
        <Box py="18px" flexDir={"row"} alignItems="center" position={"relative"} bgColor={colors?.gray}>
            <IconButton left={"16px"} zIndex={"9999"} variant={"solid"} position="absolute" bgColor={colors.text_light} size="35px" borderRadius={"full"} onPress={() => navigation.goBack()} icon={<MaterialCommunityIcons name="arrow-left-thin" size={25} color={colors?.bg_light} />} />
            <Text fontSize={RFValue(18)} fontWeight="black" textAlign="center" w={"100%"}>{title}</Text>
        </Box>
    )
}

export default Goback

const styles = StyleSheet.create({})