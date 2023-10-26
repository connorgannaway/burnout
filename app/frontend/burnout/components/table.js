/*
 * Table.js
 *
 */
import {React, useState} from "react";
import { View, FlatList, Text, StyleSheet, Dimensions, SafeAreaView} from "react-native";
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
    const tableSwitch = headings.map((heading, index) => <Button key={index} style={styles.managerButton} title={heading} onPress={()=>{setCurrentTable(index)}}/>);

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', height: 50, backgroundColor: "#bfbfbf"}}>
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
                                                content={item} 
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

    const colors = ['#efefef','#cfcfcf'];

    return(
        <View style={[styles.cell,
                    {backgroundColor:colors[Math.floor(props.index/props.numColumns)%2],
                    borderLeftWidth: 0, //((props.index%props.numColumns)/props.numColumns),
                    borderRightWidth: 0, //(1-((props.index%props.numColumns)/props.numColumns)),
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
    },
    managerButton:{
        flex: 1,
        margin: 10,
        backgroundColor: '#efefef',
        color: 'black',
        fontSize: 20,
    },
});