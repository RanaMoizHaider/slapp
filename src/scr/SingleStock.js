import React, { useState, useEffect } from "react"
import { Button, Text, View, Dimensions } from 'react-native'
import { useNavigation } from "@react-navigation/core"
import { db, refd, onValue } from "../../firebase"
import { styles, themeBackground } from "../components/Style"

function SingleStockScr({ route }) {
    const navigation = useNavigation()
    const screenWidth = Dimensions.get("window").width
    const [singleStock, setSingleStock] = useState()
    
    const setSingleStockData = async () => {
        onValue(refd(db, 'stocks/' + route.params.stockIndex), (snapshot) => {
            setSingleStock(snapshot.val())
        })
    }

    useEffect(() => {
        setSingleStockData()
        navigation.setOptions({
            title: route.params.title === '' ? 'No title' : route.params.title,
        })
    }, [])

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ textAlign: 'center' }}>{singleStock?.title}</Text>
            <Button title={isInFavorites ? "Remove from favorites" : "Add to favorites"} onPress={toggleFavorite} />
        </View>
    )
}

export default SingleStockScr