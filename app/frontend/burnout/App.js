import MyTab from './components/tab';
import React from 'react';

export const APIURL='https://pitwall.connorgannaway.net';
// APIURL export everywhere so we can concatenate extensions and variables to query api

export default function App() {
	return (
        <MyTab />
	);
}
