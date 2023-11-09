/*
 * table.js
 * Andrew Lindstrom
 * 10/27/2023
 *
 */
import { React, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Pressable, ScrollView, Animated} from 'react-native';

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
        justifyContent: 'center',
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

/*
 * Splits a list into specific sized chunks
 *  list: the list to be chunked
 *  size: the length of each chunk
 */ 
function chunk(list, size){

    const chunks = [];

    for(let i = 0; i < list.length; i+=size){
        chunks.push(list.slice(i, i+size));
    }

    return chunks;
}

function maxAtEachIndex(data, numColumns){

    const strings = data.slice(0, numColumns);
    const maxes = strings.map((string) => string.length);

    for( let i = 0; i < data.length; i++){
        if( maxes[i%numColumns] < (data[i] + ' ').length-1){
            maxes[i%numColumns] = (data[i] + ' ').length-1;
        }
    }

    return maxes;
}

/*
 * sortRows sorts table rows by specific column
 *      data: data to be sorted
 *      column: column to sort the data based on
 *      numColumns: width of each row 
 */

function sortRows(data, column, numColumns){
    return chunk(data, numColumns)
            .sort((a,b)=>{return (a[column] > b[column]? 1 : (a[column] < b[column]? -1 : 0));})
            .flat();
}

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
            styles.managerButton} title={heading} onPress={()=>{setCurrentTable(index);}}><Text>{heading}</Text>
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

    const headings = props.headings;
    const data = props.data;

    const dataWidths = maxAtEachIndex([headings, data].flat(), props.numColumns);
    const headingCells = headings.map((heading, index) => <Cell key={'heading_cell' + index}
                                                                index={index}
                                                                navigation={props.navigation}
                                                                content={heading}
                                                                numColumns={props.numColumns}
                                                                flex={dataWidths[index%props.numColumns]}
                                                           />);
    const cells = data.map((data, index) => <Cell key={'cell' + index}
                                                  index={index}
                                                  navigation={props.navigation}
                                                  content={data}
                                                  numColumns={props.numColumns}
                                                  flex={dataWidths[index%props.numColumns]}
                                                />);

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>{headingCells}</View>
            {chunk(cells, props.numColumns).map((item, index) =>
            <Pressable key={'row' + index} onPress = {() => props.navigation != null ?
                                                            props.navigation.navigate(props.where,
                                                                {newTitle: data[index*props.numColumns+1],
                                                                    id: props.id[index]}) :
                                                            alert(1)}>
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

    const headings = props.headings;
    const data = props.data;

    const dataWidths = maxAtEachIndex([headings, data].flat(), props.numColumns);
    const headingCells = headings.map((heading, index) => <Cell key={'heading_cell' + index}
                                                                index={index}
                                                                navigation={props.navigation}
                                                                content={heading}
                                                                numColumns={props.numColumns}
                                                                flex={dataWidths[index%props.numColumns]}
                                                           />);
    const cells = data.map((data, index) => <Cell key={'cell' + index}
                                                  index={index}
                                                  navigation={props.navigation}
                                                  content={data}
                                                  numColumns={props.numColumns}
                                                  flex={dataWidths[index%props.numColumns]}
                                                />);

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>{headingCells}</View>
            <ScrollView style={[styles.container,{height: screen.height-390}]}>
                {chunk(cells, props.numColumns).map((item, index) =>
                <Pressable key={'row' + index} onPress = {() => props.navigation != null ?
                                                                props.navigation.navigate(props.where,
                                                                    {newTitle: data[index*props.numColumns+1],
                                                                        id: props.id[index]}) :
                                                                alert(1)}>
                    <View style={{flexDirection: 'row'}}>{item}</View>
                </Pressable>)}
            </ScrollView>
        </View>
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
    const flex = props.flex;

    return(
        <View style={[styles.cell,
                    {backgroundColor:colors[Math.floor(props.index/props.numColumns)%2],
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    flex: flex,
                    }]}>
            <Text style={styles.cellText}>
                {props.content}
            </Text>
        </View>
    );
}
