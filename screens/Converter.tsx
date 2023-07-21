import { Box, HStack, IconButton, Input } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../components/utils/colors';
import { Dimensions, View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import Button from '../components/Button';
import { AntDesign, EvilIcons, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import CountryFlag from "react-native-country-flag";
import { RFValue } from 'react-native-responsive-fontsize';
import { convertCurrency, fetchSymbol } from '../Services';
import { roundTen } from '../components/utils/CurrencyFormater';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { ConverterStackProps } from '../types/converterStack';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal'



const { width, height } = Dimensions.get("screen")



export interface countryListProps {
    success: boolean;
    symbols: { [key: string]: string }
}




const Converter = () => {
    const navigation = useNavigation<StackNavigationProp<ConverterStackProps>>()
    const [currencyFrom, setCurrencyFrom] = useState<CountryCode | any>("USD")
    const [currencyTo, setCurrencyTo] = useState<CountryCode | any>("NGN")
    const [amountToCovert, setAmountToCovert] = useState("")
    const [convertedResult, setConvertedResult] = useState<number>()

    const [countryCodeFrom, setCountryCodeFrom] = useState<CountryCode>('US')
    const [countryCodeTo, setCountryCodeTo] = useState<CountryCode>('NG')
    const [country, setCountry] = useState<Country | null>(null)



    const onSelectFrom = (country: Country) => {
        setCountryCodeFrom(country.cca2)
        setCountry(country)
        setCurrencyFrom(country?.currency)
    }
    const onSelectTo = (country: Country) => {
        setCountryCodeTo(country.cca2)
        setCountry(country)
        setCurrencyTo(country.currency)
        console.log(JSON.stringify(country.currency))

    }



    console.log('====================================');
    console.log(currencyTo);
    console.log('====================================');
    const handlePress = (num: string) => {
        setAmountToCovert(amountToCovert + num)
    }




    const handleConvert = async () => {
        const data = await convertCurrency(currencyFrom, currencyTo, amountToCovert);
        if (data?.success) {
            setConvertedResult(data?.result)
        }
    }



    return (

        <Box flex={"1"} bg={colors.bg_light}>
            <Box h={height / 2.8} w={width} position="relative">

                <Box p="20px" bg={colors.bg_light} h={"40%"} w={width} bgColor={colors?.gray} flexDirection="row" alignItems={"center"} justifyContent={"space-between"}>

                    {/* <SelectDropdown
                        data={countryName}
                        defaultValue={"USD"}
                        defaultButtonText={"USD"}
                        search={true}
                        searchInputStyle={{
                            width
                        }}
                        rowStyle={styles.rowStyle}
                        selectedRowStyle={{ backgroundColor: colors?.btn_blue }}
                        rowTextStyle={{ textAlign: "left", fontSize: RFValue(14) }}
                        searchPlaceHolder="Search currency"
                        dropdownStyle={styles.container}
                        buttonStyle={styles.fromBtn}
                        buttonTextStyle={{ textAlign: "left", marginLeft: 0 }}
                        onSelect={(selectedItem, index) => {
                            setCurrencyFrom(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index): any => {
                            return (
                                <>
                                    <CountryFlag
                                        isoCode={selectedItem.toLowerCase().slice(0, 2)} size={20} key={index} />
                                    <Text>  {selectedItem}</Text>
                                </>

                            )
                        }}
                        rowTextForSelection={(item, index): any => {
                            return (
                                <>
                                    <CountryFlag
                                        isoCode={item.toLowerCase().slice(0, 2)} size={20} key={index} style={{ ...styles.flags }} />
                                    <Text>  {item}</Text>
                                </>
                            )
                        }}
                    /> */}
                    <CountryPicker countryCode={countryCodeFrom}
                        withCurrency
                        withFlag
                        withFilter
                        withCountryNameButton
                        withCurrencyButton
                        onSelect={onSelectFrom}
                        withEmoji
                        withCloseButton={true}
                    />

                    <Box minW="120px">
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <Input
                                editable={false}
                                value={amountToCovert}
                                fontSize={RFValue(20)}
                                maxLength={9}
                                textAlign="right"
                                borderWidth="0"
                            />
                        </TouchableWithoutFeedback>
                    </Box>
                </Box>
                {currencyFrom !== "" && currencyTo !== "" && amountToCovert !== "" && <Box h={"40px"}
                    bgColor={colors?.bg_light}
                    rounded="full" w={"40px"}
                    position="absolute"
                    justifyContent="center"
                    alignItems={"center"}
                    flexDirection="row"
                    top={"33%"}
                    zIndex="999"
                    left={"45%"}
                >
                    <TouchableOpacity onPress={handleConvert}>
                        <AntDesign name="arrowsalt" size={16} color={colors?.text_light} />
                    </TouchableOpacity>
                </Box>}

                <Box px="20px" bg={colors.bg_light} h={"40%"} w={width} bgColor={"#eee"} flexDirection="row" alignItems={"center"} justifyContent={"space-between"}>


                    <CountryPicker countryCode={countryCodeTo}
                        withCurrency
                        withFlag
                        withFilter
                        withCountryNameButton
                        withCurrencyButton
                        onSelect={onSelectTo}
                        withEmoji
                        withCloseButton={true}
                    />


                    {convertedResult && <Box minW="120px">
                        <Text style={{ textAlign: "right", fontSize: RFValue(20) }}>{new Intl.NumberFormat().format(roundTen(Number(convertedResult)))}</Text>
                    </Box>}
                </Box>

                <Box h={"20%"} alignItems="center" flexDir={"row"} justifyContent={"space-around"}>
                    <TouchableOpacity>

                        <IconButton variant={"solid"} bgColor={colors.btn_blue} size="35px" rounded="full" icon={<AntDesign name="setting" size={22} color={colors.text_light} />} />
                    </TouchableOpacity>

                    <TouchableOpacity>

                        <IconButton variant={"subtle"} bgColor={colors.btn_blue} size="35px" rounded="full" icon={<EvilIcons name="location" size={24} color={colors.text_light} />} onPress={() => navigation.navigate("countryList")} />
                    </TouchableOpacity>

                    <TouchableOpacity >

                        <IconButton variant={"solid"} bgColor={colors.btn_blue} size="35px" rounded="full" icon={<MaterialCommunityIcons name="history" size={24} color={colors.text_light} />} onPress={() => navigation.navigate("recentHistory")} />
                    </TouchableOpacity>
                    {/* 
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="timetable" size={24} color={colors.text_light} />
                    </TouchableOpacity> */}
                </Box>
            </Box>



            <Box h={height / 2} w={width} bgColor={colors?.bg} px="20px">
                <HStack justifyContent={"space-between"} alignItems="center">
                    <Button title="7" handlePress={() => handlePress("7")} />
                    <Button title="8" handlePress={() => handlePress("8")} />
                    <Button title="9" handlePress={() => handlePress("9")} />

                </HStack>
                <HStack justifyContent={"space-between"} alignItems="center">
                    <Button title="4" handlePress={() => handlePress("4")} />
                    <Button title="5" handlePress={() => handlePress("5")} />
                    <Button title="6" handlePress={() => handlePress("6")} />

                </HStack>
                <HStack justifyContent={"space-between"} alignItems="center">
                    <Button title="1" handlePress={() => handlePress("1")} />
                    <Button title="2" handlePress={() => handlePress("2")} />
                    <Button title="3" handlePress={() => handlePress("3")} />

                </HStack>

                <HStack justifyContent={"space-between"} alignItems="center">
                    <Button title="0" handlePress={() => handlePress("0")} />
                    <Button title="." handlePress={() => handlePress(".")} />
                    <Button title={<Feather name="delete" size={35} color={colors?.btn_blue} />}
                        handlePress={() => setAmountToCovert((prev) => prev.slice(0, -1))}
                    />

                </HStack>

            </Box>

        </Box >
    )
}

export default Converter


const styles = StyleSheet.create({
    rowStyle: {
        marginHorizontal: 10,
        // backgroundColor: "red"
    },
    container: {
        minHeight: 200,
        height: "auto",
        marginTop: -30,
        maxHeight: 700,
    },
    fromBtn: {
        backgroundColor: "transparent"
    },
    flags: {
        display: "none"
    }
})