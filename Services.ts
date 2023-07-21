import axios from "axios"
import { countryListProps } from "./screens/Converter"
import { ConverterTypesProps } from "./types/ConverterTypes"
import { config } from './components/utils/config';
import { API_HOST, API_KEY } from './environment';
import { RecentTypes } from "./types/ReecntTypes";




export const fetchSymbol = async () => {

    const { data } = await axios.get<countryListProps>("https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols", config)
    return data

}

export const convertCurrency = async (currencyFrom: string, currencyTo: string, amountToCovert: string) => {

    let params = {
        from: currencyFrom.toString(),
        to: currencyTo.toString(),
        amount: amountToCovert
    }
    console.log(params);

    try {
        const { data } = await axios.get<ConverterTypesProps>("https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert", {
            params, headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        })
        return data
    } catch (error) {
        console.log(error);
    }
}





export const RecentCurrencyRate = async (currencyFrom: string, currencyTo: string) => {
    let params = {
        from: currencyFrom.toString(),
        to: currencyTo,
    }

    const { data } = await axios.get<RecentTypes>("https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest", {
        params, headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    })
    return data

}