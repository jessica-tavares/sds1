import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TextInput, Text, Alert } from 'react-native';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { GamePlatform, Game } from './types';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';

const placeholder = {
  label: 'Selecione o Game',
  value: null
}

const mapSelectValue = (games: Game[]) => {
  return games.map((game) => ({
    ...game,
    label: game.title,
    value: game.id
  }))
}

const BASE_URL = 'https://sds1-jessica.herokuapp.com';

function CreateRecord() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [platform, setPlatform] = useState<GamePlatform>();
  const [selectedGame, setSelectecGame] = useState('');
  const [allDataGame, setAllDataGame] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  const handleChangePlatform = ( selectedPlatform : GamePlatform) => {
    setPlatform(selectedPlatform)
    const gamesByPlatform = allDataGame.filter((game) => game.platform === selectedPlatform );
    setFilteredGames(gamesByPlatform);
  }

  const handleSubmit = () => {
    const payload = { name, age, gameId: selectedGame };
    axios.post(`${BASE_URL}/records`, payload)
      .then(() => {
        Alert.alert('Dados salvos com sucesso!');
        setName('');
        setAge('');
        setSelectecGame('');
        setPlatform(undefined);
      })
      .catch(() => Alert.alert('Erro ao salvar informações'))
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/games`)
    .then(response => {
      const selectValues = mapSelectValue(response.data)
      setAllDataGame(selectValues)
    })
    .catch(() => Alert.alert('Erro ao listar os jogos'))
  }, []);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          placeholder="Nome"
          placeholderTextColor="#9E9E9E"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Idade"
          placeholderTextColor="#9E9E9E"
          keyboardType="numeric"
          onChangeText={(age) => setAge(age)}
          value={age}
        />
        <View style={styles.platformContainer}>
          <PlatformCard
            platform="PC" icon="laptop" onChange={(e) => handleChangePlatform(e)}
            activePlatform={platform}
          />
          <PlatformCard
            platform="XBOX" icon="xbox"  onChange={(e) => handleChangePlatform(e)}
            activePlatform={platform}
          />
          <PlatformCard
            platform="PLAYSTATION" icon="playstation"  onChange={(e) => handleChangePlatform(e)}
            activePlatform={platform}
          />
        </View>
        <RNPickerSelect
          placeholder={placeholder}
          value={selectedGame}
          items={filteredGames}
          onValueChange={(value) => setSelectecGame(value)}
          style={pickerSelectStyles}
          Icon={() => <Icon name="chevron-down" color="#9e9e9e" size={25} />}
        />
        <View style={styles.footer} >
          <RectButton style={styles.button} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>SALVAR</Text>
          </RectButton>
        </View>
      </View>
    </>
  )
}

export default CreateRecord;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  placeholder: {
    color: '#9E9E9E',
    fontSize: 16,
    fontFamily: "Play_700Bold",
  },
  iconContainer: {
    top: 10,
    right: 12,
  }
});


const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: 50
  },
  inputText: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    fontFamily: "Play_700Bold",
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 21
  },
  platformContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: '15%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00D4FF',
    flexDirection: 'row',
    borderRadius: 10,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: "Play_700Bold",
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0B1F34',
  }
});
