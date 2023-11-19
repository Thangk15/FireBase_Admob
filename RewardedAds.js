import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { AdEventType, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export default function RewardedAds() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
        
      },
    );

    const unsubscribeClosed = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('Quảng cáo màn hình đã bị tắt.');
      rewarded.load();
    })

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, []);

  const handerClick=()=>{
    console.log("Clicked!")
    if(loaded)
    {
      rewarded.show();
      setLoaded(false)
    }
    else
      console.log("Reward ad not loaded yet.")
    
  }

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style = {styles.Banner}>
        <Text style ={{padding: 20, color: 'red', fontWeight: '700', fontSize: 30}}>Is Rewarded_Ads</Text>
      </View>
      <Button
      title="Show Rewarded Ad"
      onPress={() => {
        // rewarded.show();
        handerClick()
      }}
    />
      <StatusBar style="auto" />
    </View>
  )}

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