import { Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, HStack, Input, KeyboardAvoidingView, ScrollView, Spinner, Text, VStack } from 'native-base';
import Goback from '../components/Goback';
import { StackScreenProps } from '@react-navigation/stack';
import { ConverterStackProps } from '../types/converterStack';
// import { SymbolProps } from './Converter';
import CountryFlag from 'react-native-country-flag';
import { RFValue } from 'react-native-responsive-fontsize';
import { fetchSymbol } from '../Services';
import { colors } from '../components/utils/colors';

// type Props = StackScreenProps<ConverterStackProps, "countryList">
const CountriesList = () => {
    const [items, setItems] = useState<any>()
    const [searchTerms, setSearchTerms] = useState("")
    const [loading, setLoading] = useState(false)
    const getCountryList = async () => {
        try {
            setLoading(true)
            const data = await fetchSymbol()
            if (data?.success) {
                setItems(data?.symbols)
                setLoading(false)
            }
        } catch (error: any) {
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getCountryList()
    }, [])



    // console.log((Object.values(items))?.map((x: any) => x));
    return (
        <Box>
            <Goback title='Available Countries' />


            <ScrollView showsVerticalScrollIndicator={false}>


                <Box px="16px">
                    {loading ? <Spinner size={"lg"} color={colors.bg} accessibilityLabel="Loading countries symbols" mt="30px" />
                        : items && Object?.keys(items)?.map((x: any, idx: number) => (

                            <Box key={idx} flexDirection="row" alignItems={"center"} h={"50px"}>
                                {/* <Text>{p}</Text> */}
                                {/* <Text>{x}</Text> */}
                                <CountryFlag
                                    isoCode={items[x].toLowerCase().slice(0, 2)} size={25} />
                                <Text fontSize={RFValue(16)} marginLeft="20px">{items[x]}</Text>
                            </Box>

                        ))}

                </Box>
            </ScrollView>


        </Box>
    )
}

export default CountriesList