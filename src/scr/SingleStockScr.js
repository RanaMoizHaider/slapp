import React, { useState, useEffect } from "react"
import { Button, Text, View, Dimensions, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/core"
import { db, refd, onValue } from "../../firebase"
import { styles, themeBackground } from "../components/Style"
import { Ionicons } from '@expo/vector-icons'

const Upward = () => {
    return (
        <View>
            <Ionicons name="ios-trending-up" size={150} color="green" />
        </View>
    )
}

const Downward = () => {
    return (
        <View>
            <Ionicons name="ios-trending-down" size={150} color="red" />
        </View>
    )
}

function SingleStockScr({ route }) {
    const navigation = useNavigation()
    const screenWidth = Dimensions.get("window").width
    const [singleStock, setSingleStock] = useState()
    const [records, setRecords] = useState(0)
    const [chartLabels, setChartLabels] = useState([])
    const [chartData, setChartData] = useState([])

    const setSingleStockData = async () => {
        onValue(refd(db, 'stocks/' + route.params.stockIndex), (snapshot) => {
            setSingleStock(snapshot.val())
        })
        // console.log(singleStock)
    }

    useEffect(() => {
        setSingleStockData()
        navigation.setOptions({
            // title: route.params.ticker === '' ? 'No title' : route.params.ticker,
            title: route.params.title === '' ? 'No title' : route.params.title,
        })
    }, [])

    

    return (
        <View style={styles.ssContainer}>
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>{singleStock?.ticker}</Text>
            <Text style={{ fontSize: 20 }}>{singleStock?.title}</Text>
            <View style={styles.line} />
            <View style={styles.centerContainer}>
                <Text style={{ fontSize: 20 }}>The expected price of {singleStock?.ticker} will go</Text>
                { singleStock?.target ? <Upward /> : <Downward /> }
            </View>
        </View>
    )
}

export default SingleStockScr