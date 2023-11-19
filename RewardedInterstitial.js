import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
// import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import {
    RewardedInterstitialAd,
    RewardedAdEventType,
    TestIds,
    AdEventType,
  } from 'react-native-google-mobile-ads';
  
const adUnitId = __DEV__
? TestIds.REWARDED_INTERSTITIAL
: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
    });

export default function RewardedInterstitial() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          setLoaded(true);
        },
      );
      const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          console.log('User earned reward of ', reward);
        },
      );

      const unsubscribeClosed = rewardedInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('Quảng cáo màn hình đã bị tắt.');
        rewardedInterstitial.load();
      })
  
      // Start loading the rewarded interstitial ad straight away
      rewardedInterstitial.load();
  
      // Unsubscribe from events on unmount
      // return () => {
      //   unsubscribeLoaded();
      //   unsubscribeEarned();
      // };
    }, []);

    const HanderClick=()=>{
      console.log("Clicked!")
      if(loaded)
      {
        rewardedInterstitial.show();
        setLoaded(false)
      }
      else
        console.log("Reward ad not loaded yet.")
    }

  if (!loaded) {
      // return null;
    }

  return (
    <View style={styles.container}>
      <View style = {styles.Banner}>
        <Text style ={{padding: 20, color: 'red', fontWeight: '700', fontSize: 30}}>Is RewardedInterstitial</Text>
      </View>
      <Button
      title="Show Rewarded Interstitial Ad"
      onPress={() => {
        HanderClick()
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