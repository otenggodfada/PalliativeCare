import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { Appbar } from 'react-native-paper';
import cheerio from 'cheerio';

export default function HomeScreen() {
  const [color, setColor] = useState('#ffffff'); // Default color

  useEffect(() => {
    fetch('https://palliativecare-26a3b.web.app/')
      .then(response => response.text())
      .then(html => {
        const $ = cheerio.load(html);
        const metaColor = $('meta[name="theme-color"]').attr('content');
        if (metaColor) {
          setColor(metaColor);
        }
      })
      .catch(error => {
        console.error('Error fetching the webpage:', error);
      });
  }, []);

  return (
    <>
     <View style={styles.container}>
     <Appbar.Header style={{ backgroundColor: '#020D48', height:0.3 }}>
        <Appbar.Content title="" />
      </Appbar.Header>
      <WebView
        style={styles.container}
        source={{ uri: "https://palliativecare-26a3b.web.app/" }}
      />
     </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor:'#020D48',
  },
  WebView:{
    flex:1
  }
});
