/*
 * Table.js
 *
 */

import { View, FlatList, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";

/*
 * Creates a Table based on the given data
 */
export function Table(props){

    return( 
        <SafeAreaView style={styles.container}>
            <FlatList
                data = {props.data}
                numColumns = {props.numColumns}
                renderItem = {({item, index}) => <Cell 
                                                    index = {index} 
                                                    navigation = {props.navigation} 
                                                    content={item} 
                                                    numColumns = {props.numColumns}/>}
                keyExtractor={(item, index) => index}
            />
        </SafeAreaView>
    );
}

function Cell(props){

    const colors = ['#efefef','#cfcfcf'];

    return(
        <View style={[styles.cell,
                    {backgroundColor:colors[Math.floor(props.index/props.numColumns)%2],
                    borderLeftWidth: ((props.index%props.numColumns)/props.numColumns),
                    borderRightWidth: (1-((props.index%props.numColumns)/props.numColumns)), }]}>
            <Text style={styles.cellText}>
                {props.content}
            </Text>
        </View>
    );
}

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
    container:{
        width: screen.width,
        margin: 20,
    },
	cell:{
        flex: 1,
		height: 50,
        padding: 5,
        borderWidth: 1,
        borderColor: '#777',
        color: '#000',
	},
    cellText:{
        fontSize: 24,
        color: '#000',
    },
    heading:{
        fontSize: 32,
        fontWeight: 'bold',
    }
});