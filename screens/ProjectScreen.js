import React from 'react';
import styled from 'styled-components';
import Project from '../components/Project';
import { PanResponder, Animated } from 'react-native';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return {
		action: state.action
	}
}

function getNextIndex(index) {
	var nextIndex = index + 1;
	if(nextIndex > projects.length -1) {
		return 0;
	}
	return nextIndex;
}


class ProjectScreen extends React.Component {

	static navigationOptions = { header: null }

	state = {
		pan: new Animated.ValueXY(),
		scale: new Animated.Value(0.9),
		translateY: new Animated.Value(44),
		thirdScale: new Animated.Value(0.8),
		thirdTranslateY: new Animated.Value(-50),
		index: 0,
		opacity: new Animated.Value(0)
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (event, gestureState) => {
				if(gestureState.dx === 0 && gestureState.dy === 0) {
					return false;
				} else {
					if(this.props.action === "openCard") {
						return false;
					} else {
						return true;
					}
				}
			},

			onPanResponderGrant: () => {
				Animated.spring(this.state.scale, { toValue: 1 }).start();
				Animated.spring(this.state.translateY, { toValue: 0 }).start();

				Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
				Animated.spring(this.state.thirdTranslateY, { toValue: 44 }).start();

				Animated.timing(this.state.opacity, { toValue: 1 }).start();
			},

			onPanResponderMove: Animated.event([
				null,
				{ dx: this.state.pan.x, dy: this.state.pan.y }
			]),

			onPanResponderRelease: () => {
				const positionY = this.state.pan.y.__getValue();
				Animated.timing(this.state.opacity, { toValue: 0 }).start();

				if(positionY > 200) {
					Animated.timing(this.state.pan, {
						toValue: { x: 0, y: 1000 }
					}).start(() => {
            this.state.pan.setValue({ x: 0, y: 0 });
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);
            this.setState({ index: getNextIndex(this.state.index) });
					});
				} else {
					Animated.spring(this.state.pan, {
						toValue: { x: 0, y: 0 }
					}).start();

					Animated.spring(this.state.scale, { toValue: 0.9 }).start();
					Animated.spring(this.state.translateY, { toValue: 44 }).start();

          Animated.spring(this.state.thirdScale, { toValue: 0.8 }).start();
          Animated.spring(this.state.thirdTranslateY, { toValue: -50 }).start();
				}
			}
		})
	}

	render() {
		const { opacity, pan, index, scale, translateY, thirdScale, thirdTranslateY } = this.state;
		return (
			<Container>
				<AnimatedMask style={{ opacity: opacity }} />
				<Animated.View
					style={{
						transform: [
							{ translateX: pan.x },
							{ translateY: pan.y },
						]
					}}
					{...this._panResponder.panHandlers}
				>
					<Project 
						title={projects[index].title}
						image={projects[index].image}
						author={projects[index].author}
						text={projects[index].text}
						canOpen={true}
					/>
				</Animated.View>
				<Animated.View
					style={{
						position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
						alignItems: "center",
						transform: [
							{ scale: scale },
							{ translateY: translateY }
						]
					}}
				>
					<Project 
						title={projects[getNextIndex(index)].title}
						image={projects[getNextIndex(index)].image}
						author={projects[getNextIndex(index)].author}
						text={projects[getNextIndex(index)].text}
					/>
				</Animated.View>
				<Animated.View
					style={{
						position: "absolute",
            top: 0,
            left: 0,
            zIndex: -3,
            width: "100%",
            height: "100%",
            justifyContent: "center",
						alignItems: "center",
						transform: [
							{scale: thirdScale }, 
							{ translateY: thirdTranslateY }
						]
					}}
				>
					<Project 
						title={projects[getNextIndex(index + 1)].title}
						image={projects[getNextIndex(index + 1)].image}
						author={projects[getNextIndex(index + 1)].author}
						text={projects[getNextIndex(index + 1)].text}
					/>
				</Animated.View>
			</Container>
		)
	}
}

export default connect(mapStateToProps)(ProjectScreen);

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;

const Text = styled.Text``;

const projects = [
  {
    title: "Price Tag",
    image: require("../assets/background5.jpg"),
    author: "Liu Yi",
    text:
      "Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China. Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China."
  },
  {
    title: "The DM App - Ananoumous Chat",
    image: require("../assets/background6.jpg"),
    author: "Chad Goodman",
    text:
      "Design+Code was the first resource I used when breaking into software. I went from knowing nothing about design or code to building a production ready app from scratch. "
  },
  {
    title: "Nikhiljay",
    image: require("../assets/background7.jpg"),
    author: "Nikhil D'Souza",
    text:
      "Recently finished the React course by @Mengto, and I 10/10 would recommend. I already rewrote my personal website in @reactjs and I'm very excited with it."
  }
];