import React, { useState, useEffect } from "react"
import { FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, TextInput, View } from "react-native"
import { useNavigation } from "@react-navigation/core"
import { styles, themeBackground } from "../components/Style"
import { db, refd, onValue } from "../../firebase"

const Stocks = (props) => {
    const navigation = useNavigation()
    const [selectedId, setSelectedId] = useState(null)
    const [stocks, setStocks] = useState([])
    const [filteredStocks, setFilteredStocks] = useState([])
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const setStocksData = async () => {
        onValue(refd(db, 'oldstocks/'), (snapshot) => {
            setStocks(snapshot.val())
            setFilteredStocks(snapshot.val())
            // console.log(snapshot.val())
        })
    }

    useEffect(() => {
        setStocksData()
    }, [])

    useEffect(() => {
        setFilteredStocks(
            stocks.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search]);
    
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.title}</Text>
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : themeBackground
        const color = item.id === selectedId ? 'black' : 'white'

        return (
            <Item
                item={item}
                // onPress={() => setSelectedId(item.id)}
                onPress={() => {
                    let index = stocks.findIndex((i) => i.id === item.id);
                    navigation.navigate('SingleStock', { stockIndex: index, title: item.title, ticker: item.ticker })
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for stocks..."
                    value={search}
                    onChangeText={text => setSearch(text)}
                />
            </View>
            <FlatList
                data={filteredStocks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </SafeAreaView>
    )
}

export default Stocks