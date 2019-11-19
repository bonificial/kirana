import firebase from 'firebase';
 app = null;
    var firebaseConfig = {
      apiKey: 'AIzaSyDc0RE2uRPsKwBKgkC0qQHfwMivOny2DDY',
      authDomain: 'kirana-49a2f.firebaseapp.com',
      databaseURL: 'https://kirana-49a2f.firebaseio.com',
      projectId: 'kirana-49a2f',
      storageBucket: 'kirana-49a2f.appspot.com',
      messagingSenderId: '656200230529',
      appId: '1:656200230529:web:a628974d66b4147291cf80',
      measurementId: 'G-D2DQZ6H7KG',
    };
    // Initialize Firebase
    try {
      app = firebase.initializeApp(firebaseConfig);
      console.log(firebase);
    } catch (err) {
      app = firebase.app();
    }
    export const db = app.database();

  export  const strengthLevels = [
      {
        label: 'Weak',
        labelColor: '#fff',
        widthPercent: '33',
        innerBarColor: '#fe6c6c',
      },
      {
        label: 'Weak',
        labelColor: '#fff',
        widthPercent: '33',
        innerBarColor: '#fe6c6c',
      },
      {
        label: 'Fair',
        labelColor: '#fff',
        widthPercent: '67',
        innerBarColor: '#feb466',
      },
      {
        label: 'Fair',
        labelColor: '#fff',
        widthPercent: '67',
        innerBarColor: '#feb466',
      },
      {
        label: 'Strong',
        labelColor: '#fff',
        widthPercent: '100',
        innerBarColor: '#6cfeb5',
      },
    ];

    // Define too short object
 export   const tooShort = {
      enabled: true,
      label: 'Too short',
      labelColor: 'red',
    };
export var CryptoJS = require('crypto-js');