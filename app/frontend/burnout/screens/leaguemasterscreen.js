/*
    leaguemasterscreen.js
    Andrew Lindstrom
    idk who else
    10/27/2023
    comment here pls
*/
import * as React from 'react';
import { useRef } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, Text, Animated, Easing, Image } from 'react-native';
import { ScrollTable, TableManager } from '../components/table';
import { getConstructorDetails, getDriverDetails, getLeagueDetails } from '../api/leaguedetails';
import { getRace } from '../api/briefs';

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
	container:{
		flex: 1,
		height: screen.height-250,
		width: screen.width,
		backgroundColor: '#d0d0d0',
		alignItems: 'center',
	},
});


/*
 *
 *
 */
function ScrollText(props){

    const scrollValue = useRef(new Animated.Value(screen.width+50)).current;
    const scroll = () =>{
		Animated.loop(
			Animated.timing(scrollValue,
				{
					toValue: -(props.children[0].length*629),
					duration: 6000,
					useNativeDriver: true,
					easing: Easing.linear,
				}
			)
		).start();
    };

    return(
        <View>
			<Animated.Text style={{...props.style, transform: [{translateX: scrollValue}]}} onLayout={scroll}>
				{props.children}
			</Animated.Text>
        </View>
    )
}


/*
 * LeagueMasterScreen component builds a screen that displays information about the league
 *		props:
 *			navigation: navigation prop created by React Navigation
 */
export default class LeagueMasterScreen extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isLoadingConstructors: true,
			isLoadingDrivers: true,
			isLoadingRace: true,
			constructorDetails: getConstructorDetails(props.route.params.id, 
                props.route.params?.raceId), // load constructors into screen state
			driverDetails: getDriverDetails(props.route.params.id),	// load drivers into screen state
			raceDetails: getRace(),	// load races into screen state
			numConstructorColumns: 1,
			numDriverColumns: 1,
			};

		this.state.constructorDetails //check if the constructors have loaded
			.catch(error => {
				console.warn(error);
			}).then(() => {
				this.setState({isLoadingConstructors: false});
			}).catch(error => {
				console.warn(error);
			});

		this.state.driverDetails //check if the drivers have loaded
			.catch(error => {
				console.warn(error);
			}).then(() => {
				this.setState({isLoadingDrivers: false});
			}).catch(error => {
				console.warn(error);
			});

		this.state.raceDetails // check if the races have loaded
			.catch(error => {
				console.warn(error);
			}).then(() => {
                this.setState({isLoadingRace: false});
			}).catch(error => {
				console.warn(error);
			});
	}

	shouldComponentUpdate(nextState){
		if(this.state.constructorDetails != nextState.constructorDetails) return true;
		if(this.state.driverDetails != nextState.driverDetails) return true;
		if(nextState.isLoadingConstructors === false && 
			nextState.isLoadingDrivers === false &&
			nextState.isLoadingRace === false) return true;

		return false;
	}

	put(data, loadCheck){
		if(data != null){
			if(loadCheck){
				const c = [];
				for(let i = 0; i < data.length; i++){
					c.push(data[i]);
				}
				return c;
			} else return data;
		}
		return [{id:0, data:['loading...']}];
	}

	render() {
		const { navigation } = this.props;
        if (this.props.route.params?.id !== 1) {
            return (<View style={{
                flex: 1,
                backgroundColor: '#d0d0d0',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <Image 
                source={require('../images/reid_eyes.jpg')}/>
            </View>);
        }
		
		return(
			<View style={styles.container}>
				<View style = {{flexDirection: 'column-reverse',
								height: 150,
								width: '100%',
								backgroundColor: '#f00',
								color: '#fff',
								shadowRadius: 1,
								shadowOffset: {height: 2, width: 0},
								shadowColor: 'black',
								shadowOpacity: .3,
								zIndex: 4,}}>
					<Text style = {{paddingBottom: 10,
									paddingHorizontal: 10,
									color: '#fff',
									fontWeight: '700',
									fontSize: 12,
									textTransform: 'capitalize',}}>
						3rd:
						{this.state.raceDetails['_j'] !== null? 
                        this.state.raceDetails['_j']['grid'][2]['name'] : 'loading...'}

					</Text>
					<Text style = {{paddingTop: 5,
									paddingHorizontal: 10,
									color: '#fff',
									fontWeight: '700',
									fontSize: 12,
									textTransform: 'capitalize',}}>
						2nd:
						{this.state.raceDetails['_j'] !== null? 
                        this.state.raceDetails['_j']['grid'][1]['name']  : 'loading...'}

					</Text>
					<Text style = {{paddingBottom: 2,
									paddingHorizontal: 10,
									backgroundColor: '#fff',
									color: '#f00',
									fontWeight: '900',
									fontSize: 24,
									textTransform: 'capitalize',}}>
						1st: 
						{this.state.raceDetails['_j'] !== null? 
                        this.state.raceDetails['_j']['grid'][0]['name'] : 'loading...'}

					</Text>
					<ScrollView horizontal={true} scrollEnabled={false} style = {{paddingHorizontal: 10,
										backgroundColor: '#fff'}}>
						<ScrollText style = {{
										color: '#f00',
										fontWeight: '900',
										fontSize: 48,
										textTransform: 'uppercase',
										}}>
							{this.state.raceDetails['_j'] !== null? 
                            this.state.raceDetails['_j']['name'] : 'loading...'}
						</ScrollText>
					</ScrollView>
				</View>
				<View snapToAlignment='center'>
					<TableManager headings = {['Constructors', 'Drivers']}>
						<ScrollTable
							key={1}
							headings={['#', 'name', 'nationality', 'points']}
							data={this.put(this.state.constructorDetails['_j'],
											this.isLoadingConstructors).map((data) => data.data).flat()}
							id={this.put(this.state.constructorDetails['_j'],
											this.isLoadingConstructors).map((data) => data.id)}
							numColumns={4}
							navigation={navigation}
							where={'TeamMasterScreen'}
						/>
						<ScrollTable
							key={2}
							headings={['#', 'name', 'podiums', 'points']}
							data={this.put(this.state.driverDetails['_j'],
											this.isLoadingDrivers).map((data) => data.data).flat()}
							id={this.put(this.state.driverDetails['_j'],
											this.isLoadingDrivers).map((data) => data.id)}
							numColumns={4}
							navigation={navigation}
							where={'DriverMasterScreen'}
						/>
					</TableManager>
				</View>
			</View>
		);
	}
}
