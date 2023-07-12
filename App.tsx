/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchData } from "./res/store/slices/data-slice";
import { DataItem } from './res/types';
import HomePage from './res/components/HomePage';

function App(): JSX.Element {
  const dispatch: ThunkDispatch<DataItem[], any, any> = useDispatch(); // Update the type of dispatch

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <HomePage />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
