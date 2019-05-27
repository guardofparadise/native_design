import React from "react";
import styled from "styled-components";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { BlurView } from "expo";
import Success from "./Success";
import Loading from "./Loading";
import { Alert, Animated, Dimensions } from "react-native";
import { connect } from "react-redux";
import firebase from "./Firebase";
import { AsyncStorage } from "react-native";
import { saveState } from "./AsyncStorage";

const screenHeight = Dimensions.get('window').height;

function mapStateToProps(state) {
	return { action: state.action }
}

function mapDispatchToProps(dispatch) {
	return {
		closeLogin: () => dispatch({
			type: 'CLOSE_LOGIN'
		}),
		updateName: () => dispatch({
			type: 'UPDATE_NAME',
			name
		}),
		updateAvatar: (avatar) => dispatch({
			type: 'UPDATE_AVATAR',
			avatar
		})
	}
}

