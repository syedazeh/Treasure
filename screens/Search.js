import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Chip } from "@rneui/themed";
// import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  { label: "Qatar Charity", value: "Qatar Charity" },
  { label: "Eid Charity", value: "Eid Charity" },
  { label: "ROTA", value: "ROTA" },
  { label: "UNHCR", value: "UNHCR" },
];

const DropdownComponent = ({navigation}) => {
  const [value, setValue] = useState();

  //dropdown with search function
  return (
    <SafeAreaView>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
          //Alert.alert(value)
          console.log("value: ",value)
          console.log("item.value: ", item.value)
          navigation.navigate('Charity', {name: item.value})
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      />

{/* chips put in place to show users what they can search for and what is trending */}
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Chip
          title="Eid Charity"
          type="outline"
          containerStyle={styles.chip}
          onPress={() => navigation.navigate("Charity", {name: "Eid Charity"})}
        />
        <Chip
          title="ROTA"
          type="outline"
          containerStyle={styles.chip}
          onPress={() => navigation.navigate("Charity", {name: "ROTA"})}
        />
        <Chip
          title="UNHCR"
          type="outline"
          containerStyle={styles.chip}
          onPress={() => navigation.navigate("Charity", {name: "UNHCR"})}
        />
      </View>

      <Chip
        title="Qatar Charity"
        buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
        icon={{
          name: "fire",
          type: "fontisto",
          size: 20,
          color: "white",
        }}
        iconLeft
        containerStyle={{ marginVertical: 15, marginHorizontal: 10, width: '30%', backgroundColor: "red" }}
        onPress={() => navigation.navigate("Charity", {name: "Qatar Charity"})}
      />
    </SafeAreaView>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  chip: {
    marginVertical: 5,
    //flexDirection: "flex-start",
    width: "30%",
    marginHorizontal: 10,
  }
});
