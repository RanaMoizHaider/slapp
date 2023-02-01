import React, { useState, useEffect } from "react"
import { Button, Text, View, Dimensions, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/core"
import { auth, db, refd, onValue, addToFavorites, removeFromFavorites } from "../../firebase"
import { styles, themeBackground } from "../components/Style"
import { Ionicons } from '@expo/vector-icons'
import { LineChart } from 'react-native-chart-kit'

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
    const [chartData, setChartData] = useState([])

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
    const line = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                strokeWidth: 2,
            },
        ],
    };

    return (
        <View style={styles.ssContainer}>
            <View style={{paddingHorizontal: 20}}>
                <Text style={{ fontSize: 40, fontWeight: "bold" }}>{singleStock?.ticker}</Text>
                <Text style={{ fontSize: 20 }}>{singleStock?.title}</Text>
                <View style={styles.line} />
            </View>
            <LineChart
                data={line}
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
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
            <View style={styles.centerContainer}>
                <Text style={{ fontSize: 20 }}>The expected price of {singleStock?.ticker} will go</Text>
                { singleStock?.target ? <Upward /> : <Downward /> }
            </View>
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