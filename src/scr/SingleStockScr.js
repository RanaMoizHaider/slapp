import React, { useState, useEffect } from "react"
import { Button, Text, View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/core"
import { auth, db, refd, onValue, addToFavorites, removeFromFavorites } from "../../firebase"
import { styles, themeBackground } from "../components/Style"
import { Ionicons } from '@expo/vector-icons'
import { LineChart } from 'react-native-chart-kit'
import moment from "moment"

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
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const navigation = useNavigation()
    const screenWidth = Dimensions.get("window").width
    const [singleStock, setSingleStock] = useState()
    const [isInFavorites, setIsInFavorites] = useState(false)
    const [records, setRecords] = useState(0)
    const [chartLabels, setChartLabels] = useState([])
    const [recordAvailable, setRecordAvailable] = useState(true)
    const [chartData, setChartData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                data: [5, 5, 5, 5, 5, 5],
                strokeWidth: 2,
            },
        ],
    })


    const setSingleStockData = async () => {
        onValue(refd(db, 'stocks/' + route.params.stockIndex), (snapshot) => {
            setSingleStock(snapshot.val())
        })
    }

    const setFav = async () => {
        if (currentUser) {
            onValue(refd(db, `users/${currentUser.uid}/favorites/${singleStock?.ticker}`), (snapshot) => {
                setIsInFavorites(snapshot.exists())
            })
        }
    }

    const setChartckData = async () => {
        // let removedFromEnd = singleStock.price.slice(0, singleStock.price.length - 10);
        // let selectedToShow = removedFromEnd.slice(-10)
        let selectedToShow = singleStock?.price.slice(-15)
        setChartData({
            labels: selectedToShow.map(entry => moment(entry.Date, 'YYYY-MM-DD').format('D')),
            datasets: [
                {
                    data: selectedToShow.map(entry => entry.Prediction),
                },
            ],
        })
    }

    useEffect(() => {
        setChartckData()
    }, [singleStock])

    useEffect(() => {
        setSingleStockData()
        navigation.setOptions({
            title: route.params.title === '' ? 'No title' : route.params.title,
        })
    }, [])

    useEffect(() => {
        setFav()
    }, [singleStock])

    const toggleFavorite = () => {
        if (currentUser) {
            if (isInFavorites) {
                removeFromFavorites(currentUser.uid, singleStock?.ticker)
                setIsInFavorites(false)
            } else {
                addToFavorites(currentUser.uid, singleStock?.ticker)
                setIsInFavorites(true)
            }
        }
    }

    return (
        <View style={styles.ssContainer}>
            <View style={{paddingHorizontal: 20}}>
                <Text style={{ fontSize: 40, fontWeight: "bold" }}>{singleStock?.ticker}</Text>
                <Text style={{ fontSize: 20 }}>{singleStock?.title}</Text>
                <View style={styles.line} />
            </View>
            <ScrollView
                horizontal={true}
                // contentOffset={{ x: 10000, y: 0 }} // i needed the scrolling to start from the end not the start
                // showsHorizontalScrollIndicator={false} // to hide scroll bar
            >
                <LineChart
                    data={chartData}
                    style={{fontSize: 1}}
                    width={screenWidth} // from react-native
                    height={220}
                    yAxisLabel={'$'}
                    chartConfig={{
                        backgroundColor: themeBackground,
                        backgroundGradientFrom: themeBackground,
                        backgroundGradientTo: themeBackground,
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 10
                        }
                    }}
                    bezier
                />
                {/* <LineChart
                data={line}
                width={screenWidth}
                height={250}
                xLabelsOffset={10}
                chartConfig={{
                    backgroundColor: themeBackground,
                    backgroundGradientFrom: themeBackground,
                    backgroundGradientTo: themeBackground,
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                withHorizontalLines={false}
                withVerticalLines={false}
                withHorizontalLabels={false}
                withInnerLines={false}
                withOuterLines={false}
                style={{
                    paddingRight: 20, // to remove white spaces at the start of the chart
                }}
                bezier
                /> */}
            </ScrollView>
            {/* <View style={styles.centerContainer}>
                <Text style={{ fontSize: 20 }}>The expected price of {singleStock?.ticker} will go</Text>
                { singleStock?.target ? <Upward /> : <Downward /> }
            </View> */}
            <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
            {currentUser ? 
                <Button title={isInFavorites ? "Remove from favorites" : "Add to favorites"} onPress={toggleFavorite} />
                :
                <Button title="Login to add it to favorites" onPress={() => navigation.navigate('Login')} />
            }
            </View>
        </View>
    )
}

export default SingleStockScr