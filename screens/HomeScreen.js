import React from 'react';
import { 
	ScrollView, 
	SafeAreaView, 
	TouchableOpacity,
	Animated, 
	StatusBar,
	Easing,
	Platform
} from 'react-native';
import styled from 'styled-components';
import Card from '../components/Card';
import { Icon } from 'expo';
import { NotificationIcon } from '../components/Icons';
import Logo from '../components/Logo';
import Course from '../components/Course';
import Menu from '../components/Menu';
import Avatar from '../components/Avatar';
import { connect } from 'react-redux';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ModalLogin from '../components/ModalLogin';
import NotificationButton from '../components/NotificationButton';
import Notifications from '../components/Notifications';

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`;

function mapStateToProps(state) {
	return { action: state.action, name: state.name }
}

function mapDispatchToProps(dispatch) {
	return {
		openMenu: () => dispatch({
			type: "OPEN_MENU"
		}),
		openLogin: () => dispatch({
			type: 'OPEN_LOGIN',
		}),
		openNotif: () => dispatch({
			type: 'OPEN_NOTIF'
		})
	}
}

class HomeScreen extends React.Component {

	static navigationOptions = { header: null }

	state = {
		scale: new Animated.Value(1),
		opacity: new Animated.Value(1),
		borderRadius: new Animated.Value(0),
	};

	componentDidMount() {
		StatusBar.setBarStyle('dark-content', true);
		if(Platform.OS == 'android') StatusBar.setBarStyle('light-content', true);
	}

	componentDidUpdate() {
		this.toggleMenu();
	}

	toggleMenu = () => {
		if(this.props.action == 'openMenu') {
			Animated.spring(this.state.scale, {
				toValue: 0.9
			}).start();
			Animated.spring(this.state.borderRadius, {
				toValue: 10
			}).start();
			Animated.spring(this.state.opacity, {
				toValue: 0.5
			}).start()

			StatusBar.setBarStyle('light-content', true);
		}

		if(this.props.action == 'closeMenu') {
			Animated.spring(this.state.scale, {
				toValue: 1
			}).start();
			Animated.spring(this.state.borderRadius, {
				toValue: 0
			}).start();
			Animated.spring(this.state.opacity, {
				toValue: 1
			}).start();

			StatusBar.setBarStyle('dark-content', true);
		}
	}

	handleAvatar = () => {
		if(this.props.name !== 'User') {
			this.props.openMenu();
		} else {
			this.props.openLogo();
		}
	}

  render() {
    return (
			<RootView>
			<Menu />
      <AnimatedContainer style={{ transform: [{ scale: this.state.scale }], opacity: this.state.opacity, borderRadius: this.state.borderRadius }}>
				<SafeAreaView>
					<ScrollView style={{height: '100%'}}>
						<Titlebar>
							<TouchableOpacity onPress={this.handleAvatar} style={{ position: 'absolute', top: 0, left: 0 }}>
								<Avatar />
							</TouchableOpacity>
							<Title>Open Upps!</Title>
							<Name>{this.props.name}</Name>
							<TouchableOpacity
								onPress={() => this.props.openNotify()}
								style={{ position: 'absolute', right: 20, top: 5 }}
							>
								<NotificationButton/>
							</TouchableOpacity>
							<NotificationIcon
								style={{position: "absolute", right: 20, top: 5 }}
							/>
						</Titlebar>
						<ScrollView 
							showsHorizontalScrollIndicator={false} 
							style={{
								flexDirection: "row",  
								paddingBottom: 22, 
								paddingTop: 22
							}}
							horizontal={true}
						>
						{logos.map((logo,index) => (
							<Logo image={logo.image} text={logo.text} key={index} />
						))}
						</ScrollView>
						<Subtitle>Continue learning</Subtitle>
						<ScrollView 
							horizontal={true}
							style={{ paddingBottom: 30 }}
							showsHorizontalScrollIndicator={false}
						>
						<Query query={CardsQuery}>{({loading,error,data}) => {
							if(loading) return <Message>Loading...</Message>
							if(error) return <Message>Error...</Message>
							return (
								<React.Fragment>
									{data.cardsCollection.items.map((card,index) => (
										<TouchableOpacity key={index} onPress={() => {
											this.props.navigation.push("Section", { section: card })
										}}>
											<Card
												title={card.title}
												image={card.image.url}
												caption={card.caption}
												logo={card.logo.url}
												subtitle={card.subtitle}
												content={card.content}
											/>
										</TouchableOpacity>
									))}
								</React.Fragment>
								
							)
						}}</Query>
						</ScrollView>
						<Subtitle>Popular Courses</Subtitle>
						<CourseContainer>
							{courses.map((course,index) => (
								<Course 
									key={index}
									image={course.image}
									title={course.title}
									subtitle={course.subtitle}
									logo={course.logo}
									author={course.author}
									avatar={course.avatar}
									caption={course.caption}
								/>
							))}
						</CourseContainer>
					</ScrollView>
				</SafeAreaView>
      </AnimatedContainer>
			</RootView>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);


const CourseContainer = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	padding-left: 10px;
`;

const Message = styled.Text`
	margin: 20px;
	color: #b8bece;
	font-size: 15px;
	font-weight: 500;
`;

const RootView = styled.View`
	background: black,
	flex: 1
`;

const Subtitle = styled.Text`
	color: #b8bece;
	font-weight: 600;
	font-size: 15px;
	margin-left: 20px;
	margin-top: 15px;
	text-transform: uppercase;
`;

const Container = styled.View `
	flex: 1;
	background-color: #f0f3f5;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Title = styled.Text `
	font-size: 16px;
	color: #b8bece;
	font-weight: 500;
`;

const Name = styled.Text `
	font-size: 20px;
	color: #3c4560;
	font-weight: bold;
`;

const Titlebar = styled.View `
	width: 100%;
	margin-top: 50px;
	padding-left: 80px;
`;

const logos = [
	{
		image: require("../assets/logo-framerx.png"),
		text: "Framer X"
	},
	{
		image: require("../assets/logo-figma.png"),
		text: "Figma"
	},
	{
		image: require("../assets/logo-studio.png"),
		text: "Studio"
	},
	{
		image: require("../assets/logo-react.png"),
		text: "React"
	},
	{
		image: require("../assets/logo-swift.png"),
		text: "Swift"
	},
	{
		image: require("../assets/logo-sketch.png"),
		text: "Sketch"
	}
];

const cards = [
	{
		title: 'React Native for Designers',
		image: require('../assets/background11.jpg'),
		subtitle: 'React Native',
		caption: '1 of 12 sections',
		logo: require('../assets/logo-react.png')
	},
	{
		title: 'Styled Components',
		image: require('../assets/background12.jpg'),
		subtitle: 'React Native',
		caption: '2 of 12 sections',
		logo: require('../assets/logo-studio.png')
	},
	{
		title: 'Props and Icons',
		image: require('../assets/background13.jpg'),
		subtitle: 'React Native',
		caption: '3 of 12 sections',
		logo: require('../assets/logo-sketch.png')
	},
	{
		title: 'Static data and Loop',
		image: require('../assets/background14.jpg'),
		subtitle: 'React Native',
		caption: '4 of 12 sections',
		logo: require('../assets/logo-swift.png')
	},
];

const courses = [
	{
		title: "Prototype in InVision Studio",
		subtitle: "10 sections",
		image: require("../assets/background1.jpg"),
		logo: require("../assets/logo-react.png"),
		author: "Vlad Pokidin",
		avatar: require("../assets/avatar.jpg"),
		caption: "Learn to design and code a React Site with minimum efforts"
	},
	{
		title: "Prototype in InVision Studio",
		subtitle: "10 sections",
		image: require("../assets/background1.jpg"),
		logo: require("../assets/logo-react.png"),
		author: "Vlad Pokidin",
		avatar: require("../assets/avatar.jpg"),
		caption: "Learn to design and code a React Site"
	},
	{
		title: "Prototype in InVision Studio",
		subtitle: "10 sections",
		image: require("../assets/background3.jpg"),
		logo: require("../assets/logo-react.png"),
		author: "Vlad Pokidin",
		avatar: require("../assets/avatar.jpg"),
		caption: "Learn to design and code a React Site"
	},
	{
		title: "Prototype in InVision Studio",
		subtitle: "10 sections",
		image: require("../assets/background2.jpg"),
		logo: require("../assets/logo-swift.png"),
		author: "Vlad Pokidin",
		avatar: require("../assets/avatar.jpg"),
		caption: "Learn to design Site"
	},
	{
		title: "Prototype in InVision Studio",
		subtitle: "11 sections",
		image: require("../assets/background4.jpg"),
		logo: require("../assets/logo-react.png"),
		author: "Vlad Pokidin",
		avatar: require("../assets/avatar.jpg"),
		caption: "Learn to code a React Site"
	},
	{
		title: "Prototype in InVision Studio",
		subtitle: "12 sections",
		image: require("../assets/background1.jpg"),
		logo: require("../assets/logo-swift.png"),
		author: "Vlad Pokidin",
		avatar: require("../assets/avatar.jpg"),
		caption: "Learn to design and code a React Site with server side rendering"
	},
]