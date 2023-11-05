/*
 * table.js
 * Andrew Lindstrom
 * 10/27/2023
 *
 */
import { React, useState } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Pressable, ScrollView} from "react-native";

/*
 * Takes multiple Tables as children and adds functionality for switching between each table. 
 *  Each table requires a defined key.
 *  props:
 *      children: a list of children props
 *      headings: names for the buttons used to select between each table
 *
 */ 

export function TableManager({children, headings}){
    
    const [CurrentTable, setCurrentTable] = useState(0);
    const tableSwitch = headings.map((heading, index) => 
        <Pressable key={index} style={CurrentTable === index ? styles.managerButtonActive : 
            styles.managerButton} title={heading} onPress={()=>{setCurrentTable(index)}}><Text>{heading}</Text>
            </Pressable>);

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                {tableSwitch}
            </View>
            <View style={{backgroundColor: '#efefef'}}>
                {children[CurrentTable]}
            </View>
        </SafeAreaView>
    );
}


/*
 * Creates a Table without scrolling based on the given data
 *      props:
 *                data: an array of objects to be added to the table
 *          numColumns: number of columns in the table
 *          navigation: navigation stack
 */
export function Table(props){

    const data = props.data;
    const cells = data.map((data, index) => <Cell key={"cell" + index}
                                                  index={index}
                                                  navigation={props.navigation}
                                                  content={data}
                                                  numColumns={props.numColumns}
                                                />);

    return(
        <View style={styles.container}>
            {chunk(cells, props.numColumns).map((item, index) =>
            <Pressable key={"row" + index} onPress = {() => props.navigation != null ? props.navigation.navigate('DriverMasterScreen', {newTitle: data[index*props.numColumns+1], id: index}) : alert(1)}>
                <View style={{flexDirection: 'row'}}>{item}</View>
            </Pressable>)}
        </View>
    );
}

/*
 * Creates a Table with scrolling based on the given data
 *      props:
 *                data: an array of objects to be added to the table
 *          numColumns: number of columns in the table
 *          navigation: navigation stack
 */
export function ScrollTable(props){

    const data = props.data;
    const cells = data.map((data, index) => <Cell key={"cell" + index}
                                                  index={index}
                                                  navigation={props.navigation}
                                                  content={data}
                                                  numColumns={props.numColumns}
                                                />);

    return(
        <ScrollView style={styles.container}>
        <Pressable onPress = {props.navigation != null ? 
                                props.navigation.navigate('DriverMasterScreen', {newTitle: props.content, id: props.key}) : alert(1)}>

            {chunk(cells, props.numColumns).map((item, index) => <View key={"row" + index} style={{flexDirection: 'row'}}>{item}</View>)}
        </Pressable>
        </ScrollView>
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
    const stdFlex = [1,9,6,3];

    return(
        <View style={[styles.cell,
                    {backgroundColor:colors[Math.floor(props.index/props.numColumns)%2],
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    flex: stdFlex[props.index%props.numColumns],
                    }]}>
            <Text style={[styles.cellText,{
                fontWeight: (props.index < props.numColumns) ? '900':'400',
            }]}>
                {props.content}
            </Text>
        </View>
    );
}

/*
 * Splits a list into specific sized chunks
 *  list: the list to be chunked
 *  size: the length of each chunk
 */ 
function chunk(list, size){

    let chunks = [];

    for(let i = 0; i < list.length; i+=size){
        chunks.push(list.slice(i, i+size));
    }

    return chunks;
}

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
		width: screen.width,
    },
    tableContainer:{
        flexDirection: 'column',
		width: screen.width/1.15,
    },
	cell:{
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
    },
    managerButtonActive:{
        flex: 1,
        backgroundColor: '#efefef',
        padding: 10,
        borderRadius: 0,
        justifyContent: 'center',
        alignContent: 'center',
        color: '#575757',
        textAlign: 'center',
        shadowColor: 'black',
        shadowRadius: 20,
        shadowOpacity: .5,
        shadowOffset: {width:0, height:0},
        zIndex: 2,
    }
});