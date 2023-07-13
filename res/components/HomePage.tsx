/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { ReactNode, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { useSelector } from 'react-redux';
import { DataItem } from '../types';
import { State } from '../store';

interface ButtonProps {
  disabled?: boolean | null;
  pressed: boolean | null;
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
}

interface BrandName {
  brandName: string;
}

interface QualityName {
  qualityName: null | string;
}

interface SizeName {
  sizeName: null | string;
}

const Button = ({ disabled, pressed, onPress, children }: ButtonProps) => {
  let buttonStyle = pressed ? styles.buttonPressed : styles.button;
  buttonStyle = disabled ? styles.disabledButton : buttonStyle;

  onPress = disabled ? () => {} : onPress;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      activeOpacity={pressed ? 0.5 : 1} // Set the opacity when pressed
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

function HomePage(): JSX.Element {
  const data = useSelector((state: State) => state?.data?.data);
  const [brandName, setBrandName] = useState<BrandName>({ brandName: '' });
  const [qualityName, setQualityName] = useState<QualityName>({ qualityName: null });
  const [sizeName, setSizeName] = useState<SizeName>({ sizeName: null });
  const [id, setId] = useState<number>(0);

  const brandNames: BrandName[] = [...new Set(data.map(({ brandName }) => ({ brandName })))];
  const qualityNames: QualityName[] = [...new Set(data.map(({ qualityName }) => ({ qualityName })))];
  const sizeNames: SizeName[] = [...new Set(data.map(({ sizeName }) => ({ sizeName })))];


  const BrandItem = ({ name }: { name: BrandName }) => {
    const pressed = brandName.brandName === name.brandName;
    const pressedName = brandName.brandName === name.brandName ? '' : name.brandName;
    return (
      <View style={{marginVertical: 5}}>
        <Button disabled={false} pressed={pressed} onPress={() => setBrandName({ brandName: pressedName })}>
          {name.brandName}
        </Button>
      </View>
    );
  };

  const QualityItem = ({ quality }: { quality: QualityName }) => {
    const pressed = quality.qualityName === qualityName.qualityName;
    const pressedQuality = qualityName.qualityName === quality.qualityName ? null : quality.qualityName;

    let disabled = false;
    if (brandName.brandName !== '') {
      var filteredItems = data.filter(obj => obj.qualityName === quality.qualityName)
      .filter (obj => obj.brandName === brandName.brandName);
      
      disabled = (filteredItems.length === 0);
      console.log (filteredItems);
    } 

    return (
      <View style={{marginVertical: 5}}>
        <Button disabled={disabled} pressed={pressed} onPress={() => setQualityName({ qualityName: pressedQuality })}>
          {quality.qualityName}
        </Button>
      </View>
    );
  };

  const SizeItem = ({ size }: { size: SizeName }) => {
    const pressed = size.sizeName === sizeName.sizeName;
    const pressedSize = sizeName.sizeName === size.sizeName ? null : size.sizeName;

    let disabled;
    if (brandName.brandName !== '') {
    var filteredItems = data.filter(obj => obj.brandName === brandName.brandName && obj.qualityName === size.sizeName);

    disabled = filteredItems.length === 0;
    } else {
      disabled = false;
    }
  
    return (
      <View style={{marginVertical: 5}}>
        <Button disabled={false} pressed={pressed} onPress={() => setSizeName({ sizeName: pressedSize })}>
          {size.sizeName}
        </Button>
      </View>
    );
  };

  const fullName = () => {
    if (brandName.brandName === '') {
      return 'Item is not selected'
    }

    const foundItems = data.filter (obj => {
      return (obj.brandName === brandName.brandName) &&
      ((obj.qualityName === qualityName.qualityName) || (obj.qualityName === null && qualityName.qualityName === null)) &&
      ((obj.sizeName === sizeName.sizeName) || (obj.sizeName === null && sizeName.sizeName ===null)) 
    })

    console.log (foundItems)
    if (foundItems.length == 0) return 'Item is not selected'
    return foundItems[0].fullName
  }

  return (
    <SafeAreaView>
      <Text style={styles.nameText}>{ fullName() }</Text>
      <View>
        <Text style={styles.attrTitle}>Brands</Text>
        <View style={{ flexDirection: 'row' }}>
          <FlatList
            data={brandNames}
            renderItem={({ item }) => <BrandItem name={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <View>
        <Text style={styles.attrTitle}>Qualities</Text>
        <View style={{ flexDirection: 'row' }}>
          <FlatList
            data={qualityNames}
            renderItem={({ item }) => <QualityItem quality={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false} // optional: hide scroll indicator
          />
        </View>
      </View>

      <View>
        <Text style={styles.attrTitle}>Sizes</Text>
        <View style={{ flexDirection: 'row' }}>
          <FlatList
            data={sizeNames}
            renderItem={({ item }) => <SizeItem size={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false} // optional: hide scroll indicator
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },

  buttonPressed: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameText: {
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 17,
    fontWeight: 'bold'
  },
  attrTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 25,
    marginBottom: 10,
  },
});

export default HomePage;
