/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { ReactNode, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, FlatList } from 'react-native';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';

import { useSelector } from 'react-redux';
import { DataItem } from '../types';
import { State } from '../store';

interface ButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    children: ReactNode;
  }
  
  const Button = ({ onPress, children }: ButtonProps) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    );
  };

  
  function HomePage(): JSX.Element {
      const data = useSelector((state: State) => state?.data?.data);
      const [name, setName] = useState('')

      const Item = ({ title }: { title: string }) => (
        <View>
          <Button onPress={e=>setName(title)}>{title}</Button>
        </View>
      );
      return (
    <SafeAreaView>
      <Text>{name.trim() === '' ? "No terxt" : name}</Text>  
      <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item title={item.brandName} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20, // Adjust the marginTop as needed
  },

    button: {
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default HomePage;
