/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 import React, { ReactNode, useState } from "react";
 import {
   SafeAreaView,
   ScrollView,
   Text,
   View,
   FlatList,
   TouchableOpacity,
   StyleSheet,
   GestureResponderEvent
 } from "react-native";
 import { useSelector } from "react-redux";
 import { DataItem } from "../types";
 import { State } from "../store";
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     paddingVertical: 10,
     paddingHorizontal: 20
   },
 
   button: {
     backgroundColor: "#2196F3",
     padding: 10,
     borderRadius: 5,
     marginHorizontal: 10
   },
 
   buttonPressed: {
     backgroundColor: "red",
     padding: 10,
     borderRadius: 5,
     marginHorizontal: 10
   },
   disabledButton: {
     backgroundColor: "gray",
     padding: 10,
     borderRadius: 5,
     marginHorizontal: 10
   },
 
   buttonText: {
     color: "#FFFFFF",
     fontSize: 16,
     fontWeight: "bold",
     textAlign: "center"
   },
   nameText: {
     borderWidth: 1,
     borderColor: "black",
     width: "100%",
     marginVertical: 10,
     paddingVertical: 5,
     paddingHorizontal: 10,
     fontSize: 17,
     fontWeight: "bold"
   },
   attrTitle: {
     fontSize: 20,
     fontWeight: "bold",
     marginLeft: 10,
     marginTop: 25,
     marginBottom: 10
   }
 });
 
 interface ButtonProps {
   disabled?: boolean | null;
   pressed: boolean | null;
   onPress: (event: GestureResponderEvent) => void;
   children: ReactNode;
 }
 
 type QualityName = null | string;
 type SizeName = null | string;
 
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
 
 function HomePage(): React.FC {
   const data = useSelector((state: State) => state?.data?.data);
   const [brandName, setBrandName] = useState<string>("");
   const [qualityName, setQualityName] = useState<QualityName>(null);
   const [sizeName, setSizeName] = useState<SizeName>(null);
 
   const brandNames: string[] = [
     ...new Set<string>(data.map((e: DataItem) => e.brandName))
   ];
   const qualityNames: QualityName[] = [
     ...new Set<QualityName>(data.map((e: DataItem) => e.qualityName))
   ];
   const sizeNames: SizeName[] = [
     ...new Set<SizeName>(data.map((e: DataItem) => e.sizeName))
   ];
 
   const disabled = (prop: string, existVal: string): boolean => {
     let thisDisable = false;
     if (brandName !== "") {
       var filteredItems = data
         .filter((obj) => obj[prop] === existVal)
         .filter((obj) => obj.brandName === brandName);
 
       console.log(filteredItems);
       thisDisable = filteredItems?.length === 0;
     }
     return thisDisable;
   };
 
   const BrandItem = ({ name }: { name: string }) => {
     const pressed = name === brandName;
     const pressedName = name === brandName ? "" : name;
     return (
       <View style={{ marginVertical: 5 }}>
         <Button
           disabled={false}
           pressed={pressed}
           onPress={() => setBrandName(pressedName)}
         >
           {name}
         </Button>
       </View>
     );
   };
 
   const QualityItem = ({ quality }: { quality: QualityName }) => {
     if (quality === null) return <></>;
 
     const pressed = quality === qualityName;
     const pressedQuality = qualityName === quality ? null : quality;
 
     return (
       <View style={{ marginVertical: 5 }}>
         <Button
           disabled={disabled("qualityName", quality)}
           pressed={pressed}
           onPress={() => setQualityName(pressedQuality)}
         >
           {quality}
         </Button>
       </View>
     );
   };
 
   const SizeItem = ({ size }: { size: SizeName }) => {
     if (size === null) return <></>;
 
     const pressed = size === sizeName;
     const pressedSize = sizeName === size ? null : size;
 
     return (
       <View style={{ marginVertical: 5 }}>
         <Button
           disabled={disabled("sizeName", size)}
           pressed={pressed}
           onPress={() => setSizeName(pressedSize)}
         >
           {size}
         </Button>
       </View>
     );
   };
 
   const fullName = () => {
     if (brandName === "") {
       return "Item is not selected";
     }
 
     const foundItems = data.filter((obj) => {
       return (
         obj.brandName === brandName &&
         (obj.qualityName === qualityName ||
           (obj.qualityName === null && qualityName === null)) &&
         (obj.sizeName === sizeName ||
           (obj.sizeName === null && sizeName === null))
       );
     });
 
     console.log(foundItems);
     if (foundItems.length == 0) return "Item is not selected";
     return foundItems[0].fullName;
   };
 
   return (
     <SafeAreaView>
       <Text style={styles.nameText}>{fullName()}</Text>
       <View>
         <Text style={styles.attrTitle}>Brands</Text>
         <View style={{ flexDirection: "row" }}>
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
         <View style={{ flexDirection: "row" }}>
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
         <View style={{ flexDirection: "row" }}>
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
 
 export default HomePage;
 
