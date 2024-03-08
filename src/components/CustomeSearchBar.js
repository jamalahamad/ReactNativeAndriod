
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';




const CustomeSearchBar = ({placeholder, onChangeText}) => {

      const [searchText, setSearchText] = useState('');
      const [isSearching, setIsSearching] = useState(false)

      const handleSearchChange = (text) => {
        setSearchText(text);
        onChangeText(text); 
      };

      const cancelSearchClicked = () => {
          setSearchText("");
          onChangeText(""); 
      }
    
      return (
        <View style={styles.container}>
          <View style = {styles.searchbarContainer}>
          <MaterialCommunityIcon name="text-search" size={24} style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            value={searchText}
            onChangeText={handleSearchChange}
            placeholderTextColor = '#F8C04C'
          />
          <TouchableOpacity onPress={cancelSearchClicked}>
            { isSearching  ? <ActivityIndicator/> : <MaterialIcons name="cancel" size={24} style={styles.searchIcon} />}
         </TouchableOpacity>
         </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        backgroundColor: 'white',
        borderRadius: 10,
      },
      searchbarContainer: {
        backgroundColor: '#360D37',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        margin: 10
      },
      searchIcon: {
        marginRight: 10,
        marginLeft: 10,
        color: "#F8C04C"
      },
      cancelIcon: {
        marginRight: 10,
        marginLeft: 10
      },
      textInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        backgroundColor: "#712377",
        padding: 10,
        borderRadius: 10,
        color: "#F8C04C",

      },
    });
    
    export default CustomeSearchBar;