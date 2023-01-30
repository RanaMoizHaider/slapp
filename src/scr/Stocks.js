import React, { useState, useEffect } from "react"
import { FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/core"
import { styles, themeBackground } from "../components/Style"
import { db, refd, onValue } from "../../firebase"

const Stocks = (props) => {
    const navigation = useNavigation()
    const [selectedId, setSelectedId] = useState(null)
    const [stocks, setStocks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const setStocksData = async () => {
        onValue(refd(db, 'stocks/'), (snapshot) => {
            setStocks(snapshot.val())
        })
        // console.log(stocks)
    }

    useEffect(() => {
        setStocksData()
    }, [])
    
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.title}</Text>
        </TouchableOpacity>
    )
    
    // const handleSingleStock = () => {
    //     const navigation = useNavigation()
    //     navigation.replace("SingleStock")
    // }

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : themeBackground
        const color = item.id === selectedId ? 'black' : 'white'

        return (
            <Item
                item={item}
                // onPress={() => setSelectedId(item.id)}
                onPress={() => {
                    // setSelectedId(item.id)
                    index = stocks.findIndex((i) => i.id === item.id);
                    navigation.navigate('SingleStock', { stockIndex: index, title: item.title, ticker: item.ticker })
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={stocks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </SafeAreaView>
    )
}

export default Stocks