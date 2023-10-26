/*
 * Table.js
 *
 */
import {React, useState} from "react";
import { View, FlatList, Text, StyleSheet, Dimensions, SafeAreaView, Pressable} from "react-native";
import { Button } from "react-native-paper";

/*
 * Takes multiple Tables as children and adds functionality for switching between each table. Each table requires a defined key.
 *  props:
 *      children: a list of children props
 *      headings: names for the buttons used to select between each table
 *
 */ 

export function TableManager({children, headings}){
    
    let [CurrentTable, setCurrentTable] = useState(0);
    const tableSwitch = headings.map((heading, index) => <Pressable key={index} style={CurrentTable === index ? styles.managerButtonActive : styles.managerButton} title={heading} onPress={()=>{setCurrentTable(index)}}><Text>{heading}</Text></Pressable>);

    return(
        <SafeAreaView style={[styles.container, {margin: 0}]}>
            <View style={{flexDirection: 'row'}}>
                {tableSwitch}
            </View>
            <View>
                {children[CurrentTable]}
            </View>
        </SafeAreaView>
    );
}


/*
 * Creates a Table based on the given data
 *      props:
 *                data: an array of objects to be added to the table
 *          numColumns: number of columns in the table
 *          navigation: navigation stack
 */
export function Table(props){

    return( 
        <FlatList
            data = {props.data}
            numColumns = {props.numColumns}
            renderItem = {({item, index}) => <Cell 
                                                index = {index} 
                                                navigation = {props.navigation} 
                                                content = {item} 
                                                numColumns = {props.numColumns}/>}
            keyExtractor={(item, index) => index}
        />
    );
}

/*
 * Used by Table to create individual cells
 *  props:
 *      index: index of the current cell in the table
 * numColumns: number of columns in the table
 *    content: object to be displayed in the cell as text
 */
function Cell(props){

    const colors = ['#efefef','#e2e2e2'];

    return(
        <View style={[styles.cell,
                    {backgroundColor:colors[Math.floor(props.index/props.numColumns)%2],
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    }]}>
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
        padding: 10,
        borderWidth: .25,
        borderColor: '#777',
        color: '#000',
        justifyContent: "center",
	},
    cellText:{
        fontSize: 12,
        color: '#575757',
    },
    heading:{
        fontSize: 32,
        fontWeight: 'bold',
    },
    managerButton:{
        flex: 1,
        backgroundColor: '#dfdfdf',
        borderRadius: 0,
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
        color: '#575757',
    },
    managerButtonActive:{
        flex: 1,
        backgroundColor: '#efefef',
        padding: 10,
        borderRadius: 0,
        justifyContent: 'center',
        alignContent: 'center',
        color: '#575757',
        shadowColor: 'black',
        shadowRadius: 20,
        shadowOpacity: .5,
        shadowOffset: {width:0, height:0},
        zIndex: 2,
    }
});