import { StyleSheet, Dimensions } from 'react-native'

const themeBackground = "#0782F9"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: themeBackground,
        width: "100%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: themeBackground,
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: themeBackground,
        fontWeight: "700",
        fontSize: 16,
    },
    pictureWrapper: {
        justifyContent: "center",
        alignItems: "center",
        // height: Dimensions.get('window').width,
        flex: 1,
        padding: 20,
        flexDirection: "row",
    },
    picUpdateButtonBox: {
        flex: 1,
        flexDirection: "row",
    },
    picUpdateButton: {
        backgroundColor: themeBackground,
        width: "40%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        margin: 5,
        flex: 0.5
    },
    picUpdateButtonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    button: {
        backgroundColor: themeBackground,
        width: "100%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 5,
    },
    logoutButton: {
        backgroundColor: 'grey',
        width: "100%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 15,
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: themeBackground,
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: themeBackground,
        fontWeight: "700",
        fontSize: 16,
    },
    headerWrapper: {
        display: "flex",
        // backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        height: 50
    },
    headerText: {
        fontSize: 20,
        fontWeight: "700"
    },
    inputContainer: {
        justifyContent: "center",
        marginLeft: "3%",
        marginRight: "3%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 5,
    },

    detailsWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 7,
        height: 40,
        borderColor: "black"
    },
    detail: {
        flex: 1,
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        // justifyContent: "space-evenly",
        alignItems: "center"
    },
    detailText1: {
        fontSize: 12,
        fontWeight: "300",
        marginLeft: "2%",
    },
    detailText2: {
        fontSize: 14,
        fontWeight: "400",
        color: "red"
    },
    greenColor: {
        color: "green"
    },
    verticalSeperator: {
        width: 2,
        height: "60%",
        backgroundColor: "lightgray"
    },


    addressWrapper: {
        justifyContent: "space-evenly",
        height: 90,
        marginTop: 6,
        backgroundColor: "white",
    },
    // seperators
    seperatorWrapper: {
        flex: 0.02,
        height: "100%",
    },

    DetailWrapper: {
        flex: 0.98,
        height: "100%",
    },
    addressText1: {
        fontSize: 16,
        fontWeight: "400",
        paddingTop: 10,
        paddingLeft: 15
    },
    addressText2: {
        fontSize: 16,
        fontWeight: "300",
        paddingLeft: 15
    },




    /// Links related style

    mapWrapper: {
        height: 50,
        marginTop: 2,
        backgroundColor: "white",
    },
    detailLinksWrapper: {
        flex: 0.98,
        height: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    linkIconWrapper: {
        height: 25,
        width: 25,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"red",
        marginLeft: 15
    },
    linkTextWrapper: {
        marginLeft: 5,
    },
    linksStyles: {
        color: "blue",
        fontSize: 15,
        fontWeight: "500",
        textDecorationLine: 'underline'
    },




    // web site detail uni
    uniWebWrapper: {
        height: 50,
        marginTop: 2,
        backgroundColor: "white",
    },


    // Menu


    menu: {
        height: 283,
        // backgroundColor:"yellow"
    },
    menuHeadingWrapper: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height: 50,
        marginTop: 10,
        paddingLeft: 20
    },
    headerText: {
        fontSize: 16,
        fontWeight: "600"
    },
    menuIcon: {
        flex: 1,
        marginTop: 3,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    menuIconWrapper: {
        flex: 0.7,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    menuIconText: {
        flex: 0.2,
        height: "100%",
        width: "100%",
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        verticalAlign: 'middle',
        width: '50%',
        height: '50%',
        borderRadius: 100,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
    },
    title: {
        fontSize: 32,
    },
    line: {
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    ssContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    searchBar: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        color: "#0782F9",
        marginHorizontal: 16,
        borderRadius: 10,

    },
    searchInput: {
        padding: 10,
        color: "#0782F9",
        fontSize: 16,
        flex: 1,
    },
    
})

export { styles, themeBackground }