import React from 'react';
import {StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {gray, white} from './utils/colors';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {Constants} from 'expo';
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";
import DeckDetail from "./components/DeckDetail";
import Quiz from "./components/Quiz";
import AddCard from "./components/AddCard";
import {setLocalNotification} from "./utils/helpers";

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <FontAwesome name='id-card-o' size={30} color={tintColor}/>
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? gray : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : gray,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      }
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={configureStore()}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={gray} barStyle="light-content"/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
