import React, { useState, useEffect } from "react"
import { Button, Text, View, Dimensions } from 'react-native'
import { useNavigation } from "@react-navigation/core"
import { db, refd, onValue } from "../../firebase"
import { LineChart } from "react-native-chart-kit"
import { styles, themeBackground } from "../components/Style"

function SingleStockScr({ route }) {
    const navigation = useNavigation()
    const screenWidth = Dimensions.get("window").width
    const [singleStock, setSingleStock] = useState()
    const [records, setRecords] = useState(0)
    const [chartLabels, setChartLabels] = useState([])
    const [chartData, setChartData] = useState([])
    

    const chartConfig = {
        backgroundColor: themeBackground,
        backgroundGradientFrom: themeBackground,
        backgroundGradientTo: themeBackground,
        color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
      }

    const setSingleStockData = async () => {
        onValue(refd(db, 'stocks/' + route.params.stockIndex), (snapshot) => {
            setSingleStock(snapshot.val())
            // var last10 = snapshot.val().price.filter(function(index) {
            //     return index >= snapshot.val().price.length - 5
            // })
            // // last10 = JSON.parse(JSON.stringify(last10).replace(' 00:00:00-05:00',''))
            // last10.map((items) => {
            //     items = JSON.parse(JSON.stringify(items).replace(' 00:00:00-05:00',''))
            //     setChartLabels([...chartLabels, items.Date])
            //     setChartData([...chartData, items.Close])
            // })
            // console.log(chartLabels)
            // console.log(chartData)
            // const last10 = singleStock?.price.filter((i) => i >= singleStock?.price.length - 10)
            // setRecords(last10)
            // console.log(records)
        })
        // console.log(singleStock)
    }

    // const data = {
    //     labels: ["January", "February", "March", "April", "May", "June"],
    //     datasets: [
    //       {
    //         data: [20, 45, 28, 80, 99, 43]
    //       }
    //     ],
    // }

    const data = {
        labels: chartLabels === null ? chartLabels : ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: chartData === null ? chartData : [20, 45, 28, 80, 99, 43]
            }
        ],
    }

    useEffect(() => {
        setSingleStockData()
        navigation.setOptions({
            title: route.params.title === '' ? 'No title' : route.params.title,
        })
    }, [])

    // useEffect(() => {
    //     if(singleStock) {
    //         setChartLabels([])
    //         setChartData([])

    //         var last10 = singleStock?.price.filter(function(index) {
    //             return index >= singleStock?.price.length - 15
    //         })
    //         last10 = JSON.parse(JSON.stringify(last10).replace(' 00:00:00-05:00',''))
    //         last10.map((items) => {
    //             items = JSON.parse(JSON.stringify(items).replace(' 00:00:00-05:00',''))
    //             setChartLabels([...chartLabels, items.Date])
    //             setChartData([...chartData, items.Close])
    //         })
    //         console.log(chartLabels)
    //         console.log(chartData)
    //         // const last10 = singleStock?.price.filter(i => i >= singleStock?.price.length - 10)
    //         // setRecords(last10)
    //         // if(records)
    //         // {
    //         //     records.map((item) => {
    //         //         item = JSON.parse(JSON.stringify(item).replace(' 00:00:00-05:00',''))
    //         //         setChartLabels([...chartLabels, item.Date])
    //         //         setChartData([...chartData, item.Close])
    //         //     })
    //         //     console.log(chartLabels)
    //         //     console.log(chartData)
    //         // }
    //         // console.log(last10)
    //         console.log(records)
    //         setRecords(records + 1)
    //         // console.log(singleStock)
    //     }
    // }, [singleStock])

    

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            {/* <Text style={{ textAlign: 'center' }}>{singleStock?.id}</Text> */}
            <Text style={{ textAlign: 'center' }}>{singleStock?.title}</Text>
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
            />
        </View>
    )
}

export default SingleStockScr