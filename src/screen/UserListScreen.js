import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserListItem from '../components/UserList'
import axios from 'axios'
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomeSearchBar from '../components/CustomeSearchBar';
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesom from 'react-native-vector-icons/FontAwesome';


const UserListScreen = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  search

  useEffect(() => {
    getUserFromApi()

  }, [])

  const getUserFromApi = async () => {
    console.log("===getUserFromApi=======")
    try {
      const response = await axios.get(
        'https://dummyjson.com/products',
      );
      setProducts(response.data.products);
      setFilteredData(response.data.products)
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
      console.log("=== response error", e)

    }
  };


  const updateSearch = (text) => {
    if (products && Array.isArray(products)) {
      if (text) {
        const filteredData = products.filter(
          item =>
            item.title.toLowerCase().includes(text.toLowerCase()) ||
            item.description.toString().includes(text)
        );    
          setFilteredData(filteredData);
      } else {    
          setFilteredData(products);
      }
    } else {
      setFilteredData(products);
    }
  };

  const loginWithFacebook = () => {
    console.log("========== Facebook clicked ")
  };


  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <>
          <CustomeSearchBar
            placeholder="Search Surah"
            onChangeText={updateSearch}
          />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>An error occurred</Text>
          </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.view}>
        <View style = {{marginLeft: 10}}>
          <CustomeSearchBar
            placeholder="Search Surah"
            onChangeText={updateSearch}
          />
        </View>

        <UserListItem item={filteredData} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});

export default UserListScreen