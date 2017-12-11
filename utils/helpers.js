import React from 'react';
import {FontAwesome, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';

const NOTIFICATION_KEY = 'FlashCards:notifications'

/**
 * Get Deck Info
 * @param deck
 * @returns {{React: {id: number, title: string, questions: [null,null]}, JavaScript: {id: number, title: string, questions: [null]}}}
 */
export function getDeckInfo(deck) {
  const info = {
    React: {
      id: 1,
      title: 'React',
      questions: [
        {
          question: 'ReactJS is developed by?',
          answer: 'Facebook Engineers'
        },
        {
          question: 'Is ReactJS an MVC based framework?',
          answer: 'No'
        }
      ]
    },
    JavaScript: {
      id: 2,
      title: 'JavaScript',
      questions: [
        {
          question: 'What is JavaScript?',
          answer: 'JavaScript is a scripting language that enables you to create dynamically updating content and more.'
        }
      ]
    }
  };

  return typeof deck === 'undefined'
    ? info
    : info[deck]
}

/**
 * Clear local notifications
 * @returns {Promise.<TResult>|*}
 */
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

/**
 * Create a notification
 * @returns {{title: string, body: string, ios: {sound: boolean}, android: {sound: boolean, priority: string, sticky: boolean, vibrate: boolean}}}
 */
function createNotification() {
  return {
    title: 'Study!!',
    body: "👋 don't forget to study for this days with one of your decks!!!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

/**
 * Set a notification
 */
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}