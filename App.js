import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'expo-dev-client'
import Banner from './Banner';
import InterstitialAds from './InterstitialAds';
import RewardedAds from './RewardedAds';
import RewardedInterstitial from './RewardedInterstitial';


 
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Banner/> */}
      {/* <InterstitialAds/> */}
      {/* <RewardedAds/> */}
      <RewardedInterstitial/>
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
});
