import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';
import img from "./src/assets/search.png"

export default function App() {

  const [artista, setArtista] = useState('')
  const [input, setInput] = useState('')
  const [dados, setDados] = useState([])
  const [carregando, setCarregando] = useState(false)
 
  useEffect(() => {
    if (artista !== '') {
      setCarregando(true);
      fetch(`https://lyric.mackle.im/api?artist=${artista}`)
        .then((resp) => resp.json())
        .then((json) => {
          setDados([json.info]);
        })
        .catch(() => alert('Erro ao encontrar esse artista! :('))
        .finally(() => setCarregando(false));
    }
  }, [artista]);

  function searchMusic() {
    setArtista(input);
  }

  return (
    <View style={styles.container}> 

      <View style={[styles.card, {paddingTop: -10, borderTopLeftRadius:0, borderTopRightRadius:0}]}>
        <Text style={styles.titulo}>App.fy</Text>

        <View style={{flexDirection: 'row'}}>
          <TextInput style={styles.inputStyle} placeholder="Digite aqui" onChangeText={(text) => setInput(text)} />
          <TouchableOpacity style={styles.botao} onPress={searchMusic}>
            <View>
              <Image source={img} style={styles.fotoSearch} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View >
        {carregando ? <ActivityIndicator /> : (
          <FlatList 
            style = {styles.flatList}
            data={dados} 
            renderItem={({ item }) => (

            <View style={[styles.card, {backgroundColor: '#000000', marginTop: 20}]}>
              <Image source={{ uri: item.image }} style={styles.fotoAlbum} /> 

              <View>
                <Text style={[styles.texto, {marginLeft: 17, marginTop: 12, marginBottom: 7}]}>Titulo</Text>
                <View style={styles.cardLetra}>
                  <Text style={[styles.texto, {color: '#ffffff', fontSize: 16}]}>{item.title}</Text>
                </View>

                <Text style={[styles.texto, {marginLeft: 17, marginTop: 12, marginBottom: 7}]}>Letra</Text>
                <View style={styles.cardLetra}>
                  <Text style={[styles.texto, {color: '#ffffff', fontSize: 16}]}>{item.lyrics}</Text>
                </View>                    
              </View>
            </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          /> 
        )}
      </View>
      
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  barraSuperior: {
    width: '100%',
    height: 45,
    backgroundColor: '#ffffff',
  },
  titulo:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom :10,
    marginTop: 45,
  },
  texto: {
    fontSize: 17,
    color: '#696969',
    fontWeight: 'bold',
  },
  card:{
    width: '100%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#00FF00',
  },
  cardLetra: {
    width: 350,
    alignItems: 'left',
    padding: 10,
    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: '#808080',
    borderRadius: 10
  },
  inputStyle: {
    backgroundColor: '#ffffff',
    width: 300,
    height: 30,
    borderRadius: 20,
    paddingLeft: 20,
  },
  botao: {
    backgroundColor: '#ffff',
    borderRadius: 20,
    width: 30,
    height: 30,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoAlbum: {
    width: 350,
    height: 350,
    borderRadius: 18,
  },
  fotoSearch: {
    width: 18,
    height: 18,
  },
  flatList:{
    flex:1,
    width: '100%',
    
  }
});