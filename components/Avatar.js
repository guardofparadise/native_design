import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return {
		name: state.name
	}
}

function mapDispatchToProps(dispatch) {
	return {
		updateName: name => dispatch({
			type: 'UPDATE_NAME',
			name: name
		})
	}
}

class Avatar extends React.Component {

	state = {
		photo: "https://cl.ly/55da82beb939/download/avatar-default.jpg"
	}

	componentDidMount() {
		fetch('https://randomuser.me/api/')
			.then(res => res.json())
			.then(res => {
				this.setState({ 
					photo: res.results[0].picture.medium 
				});
				
				this.props.updateName(res.results[0].name.first)
			})
	}

	render() {
		return <Image source={{ uri: this.state.photo }} />
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Avatar);

const Image = styled.Image`
	width: 44px;
	height: 44px;
	background: black;
	border-radius: 22px;
	margin-left: 20px;
`;