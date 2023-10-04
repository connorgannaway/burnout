import * as React from 'react';
import { View } from 'react-native';
import { buildPageCards } from './pageElements';

const pageList = ['page1', 'page2', 'page3', 'page4'];

export default function LeagueMasterScreen({navigation}){

	const cards = buildPageCards(navigation, pageList);

	return(
		<View>
            
		</View>
	);
}