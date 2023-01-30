import { Text, View, SafeAreaView, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { styles } from '../components/Style'

const StocksScr = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.universitiesWrapper}>
                <FlatList
                    data={this.state.uniData}
                    renderItem={({ item }) => (
                        <View key={item.key} style={styles.singleUniversity} elevation={5}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('University')}>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View> */}
        </SafeAreaView>
    )
  }

  export default StocksScr