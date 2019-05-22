import React from 'react';
import {
	createBottomTabNavigator,
	createStackNavigator
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SectionScreen from '../screens/SectionScreen';
import CoursesScreen from '../screens/CoursesScreen';
import ProjectScreen from '../screens/ProjectScreen';
import { Icon } from 'expo';

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeStack = createStackNavigator({
	Home: HomeScreen,
	Section: SectionScreen
}, {mode: 'modal'});

HomeStack.navigationOptions = ({ navigation }) => {
	var tabBarVisible = true;
	const routeName = navigation.state.routes[navigation.state.index].routeName;

	if(routeName == 'Section') {
		tabBarVisible = false
	}
	return {
		tabBarVisible,
		tabBarLabel: "Home",
		tabBarIcon: ({ focused }) => (
			<Icon.Ionicons 
				name="ios-home"
				size={26}
				color={focused ? activeColor : inactiveColor}
			/>
		)
	}
}

const CoursesStack = createStackNavigator({
	Courses: CoursesScreen
});

CoursesStack.navigationOptions = {
	tabBarLabel: "Courses",
	tabBarIcon: ({ focused }) => (
		<Icon.Ionicons 
			name="ios-albums"
			size={26}
			color={focused ? activeColor : inactiveColor}
		/>
	)
}

const ProjectStack = createStackNavigator({
	Project: ProjectScreen
});

ProjectStack.navigationOptions = {
	tabBarLabel: "Project",
	tabBarIcon: ({ focused }) => (
		<Icon.Ionicons 
			name="ios-folder"
			size={26}
			color={focused ? activeColor : inactiveColor}
		/>
	)
}

const TabNavigator = createBottomTabNavigator({
	ProjectStack,
	HomeStack,
	CoursesStack
});

export default TabNavigator;