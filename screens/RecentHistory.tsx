import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, ScrollView, Spinner, Text } from 'native-base';
import Goback from '../components/Goback';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RecentCurrencyRate } from '../Services';
import { RecentTypes } from '../types/ReecntTypes';
import CountryFlag from 'react-native-country-flag';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../components/utils/colors';

import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal'
// import { CountryCode, Country } from './src/types'



const RecentHistory = () => {
    const [date, setdate] = useState<React.SetStateAction<Date>>(new Date())
    const [currencyFrom, setCurrencyFrom] = useState<CountryCode | any>("SVC")
    const [currencyTo, setCurrencyTo] = useState("NGN")
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState<RecentTypes>()
    const [countryCode, setCountryCode] = useState<CountryCode>('US')
    const [country, setCountry] = useState<Country | null>(null)


    const onSelect = (country: Country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        setCurrencyFrom(country?.currency)

    }


    const getRecentHistory = async () => {
        try {
            setLoading(true)
            const data = await RecentCurrencyRate(currencyFrom, currencyTo)
            if (data?.success) {
                setHistory(data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getRecentHistory()
    }, [currencyFrom])


    return (
        <Box>
            <Goback title='Recent Exchange Rates' />
            {/* <RNDateTimePicker value={date} onChange={(e) => setdate(e.nativeEvent.timestamp)} /> */}
            <Box px={"16px"} py="20px">
                <CountryPicker countryCode={countryCode}
                    withCurrency
                    withFlag
                    withFilter
                    withCountryNameButton
                    withCurrencyButton
                    onSelect={onSelect}
                    withEmoji
                    withCloseButton={true}
                />
            </Box>
            {loading ? <Spinner size={"lg"} color={colors.bg} accessibilityLabel="Loading Recent Exchange rate" mt={"30px"} /> : (
                <Box px={"16px"}>
                    {/* <Box flexDir={"row"} py="30px">
                        <Text fontSize={RFValue(25)}>{history?.base}</Text>
                        <Text fontSize={RFValue(25)} ml="20px">{history?.date}</Text>
                    </Box> */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* <Text>{history?.timestamp}</Text> */}
                        {history?.rates && Object.keys(history?.rates).map((x: string, idx: number) => (
                            <Box key={idx} flexDir="row" h={"60px"}>
                                <CountryFlag
                                    isoCode={x?.toLowerCase().slice(0, 2)} size={25} />
                                <Text fontSize={RFValue(18)} ml="20px">{x}</Text>
                                <Text fontSize={RFValue(18)} ml={"20px"}>{history?.rates[x]}</Text>
                            </Box>
                        ))}
                    </ScrollView>
                </Box>
            )}
        </Box>
    )
}

export default RecentHistory

const styles = StyleSheet.create({})