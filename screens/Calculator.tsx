import React, { useState } from 'react'
import { Box, HStack, Text } from 'native-base'
import { colors } from '../components/utils/colors'
import { Alert, Dimensions } from "react-native";
import Button from '../components/Button';
import { Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get("screen")

const Calculator = () => {

    const [result, setResult] = useState("")
    const [logic, setlogic] = useState("")
    const [error, setError] = useState(false)

    const handlePressBtn = (btn: string) => {
        if (logic?.length > 42) return

        setlogic(logic + btn)
        if (!error && result !== "" && btn) {
            setlogic((prev) => result + prev)
            setResult("")
        }
    }


    const handleReset = () => {
        setlogic("")
        setResult("")
    }

    const handleSubmit = () => {
        try {
            setResult(eval(logic.toString()))
            setlogic("")
        } catch (error) {
            setError(true)
            setResult("Error")
        }
    }


    const length = logic?.length
    return (
        <Box flex={"1"} bgColor={colors.bg_light}>
            <Box h={height / 4} borderBottomColor={colors?.bg_light}
                justifyContent="center" alignItems={"flex-end"} px="30px">
                <Text fontSize={
                    length > 10 ? RFValue(40)
                        :
                        length > 10 && length < 19 ? RFValue(6)
                            :
                            RFValue(50)

                }

                    color={colors?.text_light}>{logic}</Text>
                <Text fontSize={RFValue(45)} color={colors?.text_light}>{result.toString()}</Text>
            </Box>

            <Box h={height / 2} px="16px" borderTopRadius={"30px"} bgColor={colors?.bg} flex="1">
                <HStack justifyContent={"space-between"} alignItems="center">
                    <Button title='C' isDanger handlePress={handleReset} />
                    <Button title={<Feather name="delete" size={35}
                        color={colors?.btn_blue} />}
                        handlePress={() => setlogic(logic.slice(0, -1))} />
                    <Button title={<MaterialCommunityIcons
                        name="percent-outline" size={35} color={colors?.btn_blue} />}
                        handlePress={() => handlePressBtn("%")} />

                    <Button title={<MaterialCommunityIcons
                        name="division" size={35}
                        color={colors?.btn_blue} />}
                        handlePress={() => handlePressBtn("/")} />
                </HStack>

                <HStack justifyContent={"space-between"} alignItems="center">
                    <Button title='7' handlePress={() => handlePressBtn("7")} />
                    <Button title='8' handlePress={() => handlePressBtn("8")} />
                    <Button title='9' handlePress={() => handlePressBtn("9")} />
                    <Button title={<MaterialIcons name="clear"
                        size={35} color={colors?.btn_blue} />} isBlue
                        handlePress={() => handlePressBtn("*")} />
                </HStack>


                <HStack justifyContent={"space-between"} alignItems="center">
                    <Button title='4' handlePress={() => handlePressBtn("4")} />
                    <Button title='5' handlePress={() => handlePressBtn("5")} />
                    <Button title='6' handlePress={() => handlePressBtn("6")} />
                    <Button title={<Feather name="minus"
                        size={35} color={colors?.btn_blue} />}
                        handlePress={() => handlePressBtn("-")} />
                </HStack>

                <HStack justifyContent={"space-between"} alignItems="center">
                    <Button title='1' handlePress={() => handlePressBtn("1")} />
                    <Button title='2' handlePress={() => handlePressBtn("2")} />
                    <Button title='3' handlePress={() => handlePressBtn("3")} />
                    <Button title={<Feather name="plus" size={35}
                        color={colors?.btn_blue} />}
                        handlePress={() => handlePressBtn("+")} />
                </HStack>
                <HStack justifyContent={"space-between"} alignItems="center">
                    <Button title='00' handlePress={() => handlePressBtn("00")} />
                    <Button title='0' handlePress={() => handlePressBtn(logic.length === 0 ? "" : "0")} />
                    <Button title='.' handlePress={() => handlePressBtn(".")} />
                    <Button title={<MaterialCommunityIcons name="equal"
                        size={35} color={colors?.btn_blue} />}
                        handlePress={handleSubmit} />
                </HStack>
            </Box>
        </Box>
    )
}

export default Calculator
