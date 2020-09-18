import React from 'react';
import { FontAwesome5 as Icon } from '@expo/vector-icons'
import { Text, StyleSheet } from 'react-native';
import { GamePlatform } from './types';
import { RectButton } from 'react-native-gesture-handler';

type Props = {
  platform: GamePlatform;
  onChange: (platform: GamePlatform) => void;
  icon: string;
  activePlatform?: GamePlatform;
}

function PlatformCard({ platform, onChange, icon, activePlatform } : Props) {
  const isActive = (platform === activePlatform);
  const backgroundColor = isActive ? '#fad7c8' : '#FFF';
  const textColor = isActive ? '#ed7947' : '#9E9E9E'

  return (
    <RectButton
      style={[styles.platformCard, { backgroundColor }]}
      onPress={() => onChange(platform)}
    >
      <Icon name={icon} color={textColor} size={60} />
      <Text style={[styles.platformCardText, { color: textColor}]}>
        {platform === 'PLAYSTATION' ? 'PS' : platform}
      </Text>
    </RectButton>
  )
}

export default PlatformCard;

const styles = StyleSheet.create({
  platformCard: {
    paddingTop: 30,
    paddingBottom: 20,
    width: '30%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  platformCardText: {
    marginTop: 40,
    color: '#9E9E9E',
    fontSize: 24,
    fontFamily: "Play_700Bold",
    textAlign: 'center'
  },
});
