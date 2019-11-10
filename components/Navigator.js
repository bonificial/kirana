import SwipeNavigator from 'react-native-swipe-navigation';
import Phone from './Phone'
import Password from './Passwords'

const Navigator = SwipeNavigator({
  Phone: {
    screen: Phone,
    left: 'Passwords',
     
  },

  Passwords: {
    screen: Password,
    right:Phone,
    color: '#64B5F6',
    type: 'over',
  },
/*
  State_City: {
    screen: Discover,
    type: 'over',
  },

  Store: {
    screen: Stories,
    right: 'Discover',
    color: '#9575CD',
    type: 'over',
  },

  Verify: {
    screen: Memories,
    color: '#E53935',
    type: 'over',
  },
 */
});

export default Navigator;