import React, { useState, useEffect } from "react"
import { Button, Text, View, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native'
import { useNavigation } from "@react-navigation/core"
import { auth, db, refd, onValue, onAuthStateChanged } from "../../firebase"
import { styles, themeBackground } from "../components/Style"

const ShowFavorites = (props) => {
    const navigation = useNavigation()
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const [selectedId, setSelectedId] = useState(null)
    const [stocks, setStocks] = useState([])
    const [favoritesNames, setFavoritesNames] = useState([])
    const [favorites, setFavorites] = useState([])

    const setFavoritesNamesData = async () => {
        onValue(refd(db, `users/${currentUser.uid}/favorites`), (snapshot) => {
            if (snapshot.exists()) {
                setFavoritesNames(Object.keys(snapshot.val()))
            }
        })
    }

    useEffect(() => {
        setFavoritesNamesData()
    }, [])

    const setStocksData = async () => {
        onValue(refd(db, 'stocks/'), (snapshot) => {
            setStocks(snapshot.val())
            setFavorites(snapshot.val().filter(stock => favoritesNames.includes(stock.ticker)))
        })
    }

    useEffect(() => {
        setStocksData()
    }, [favoritesNames])

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

    const renderEmpty = () => {
        return (
            <View style={styles.centerContainer}>
                <Text style={{padding: 10}}>
                    No Favorites Added
                </Text>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                ListEmptyComponent={renderEmpty}
            />
        </View>
    )
}

function AskLogin() {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center' }}>
                <Text>Login to view your favorites</Text>
                <Button
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </View>
    )
}

const FavoritesScr = (props) => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const [available, setAvailable] = useState(false)
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAvailable(true)
        } else {
            setAvailable(false)
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            { available ? <ShowFavorites available={available} setAvailable={setAvailable} /> : <AskLogin />}
        </SafeAreaView>
    )
}

export default FavoritesScr