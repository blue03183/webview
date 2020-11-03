import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

export default function App() {

  const [noti, setNoti] = useState(null);

  // 휴대폰 토큰 등록
  const registToken = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status == 'granted') {
      const token = await Notifications.getExpoPushTokenAsync();

      await axios.post('http://localhost:3000/users/token', { token });
    }
  }

  useEffect(() => {
    registToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <WebView 
        source={{ uri: 'http://www.samil.hs.kr/main.php' }}
      />
    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
