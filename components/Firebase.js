import * as firebase from 'firebase';

var firebaseConfig = {
	apiKey: "AIzaSyDBfxLV3z2GbHN77WEHMZn8MZwMMZUFOz4",
	authDomain: "nativeapp-e5d48.firebaseapp.com",
	databaseURL: "https://nativeapp-e5d48.firebaseio.com",
	storageBucket: "nativeapp-e5d48.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;