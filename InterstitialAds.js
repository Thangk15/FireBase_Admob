import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

export default function InterstitialAds() {
    const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const adEventListener = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      
    });

    const closeEventListener = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('Quảng cáo giữa màn hình đã bị tắt.');
      interstitial.load();
    });
    interstitial.load();
  }, []);

    const handerClick=()=>{
      console.log("abc")
      if(loaded)
      {
        interstitial.show()
        setLoaded(false)
      }
      else
        console.log("Interstitial ad not loaded yet.")

    }
  

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style = {styles.Banner}>
        <Text style ={{padding: 20, color: 'red', fontWeight: '700', fontSize: 30}}>Is InterstitialAds</Text>
      </View>
      <Button
      title="Show Interstitial"
      onPress={() => {
        // interstitial.load();
        handerClick()

      }}
    />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Banner: {
    // flex: 1,
  }
});