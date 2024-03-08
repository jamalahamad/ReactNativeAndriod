import React from 'react'
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

    
    const UserListItem = ({item}) => {
    return (
        <ScrollView>
      <View style={styles.container}>

          {item.map((u, i) => {
            return (
                <Card>
                <Card.Title>{u.category}</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={{ padding: 0 }}
                  source={{ uri: u.thumbnail}}
                />
                <Text style={{ marginBottom: 10, marginTop: 10, fontWeight: 'bold', fontSize: 20 }}>
                 {u.title}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                 {u.description}
                </Text>
              </Card>
            );
          })}
        <Card containerStyle={{ marginTop: 15 }}>
          <Card.Title>FONTS</Card.Title>
          <Card.Divider />
          <Text style={styles.fonts} h1>
            h1 Heading
          </Text>
          <Text style={styles.fonts} h2>
            h2 Heading
          </Text>
          <Text style={styles.fonts} h3>
            h3 Heading
          </Text>
          <Text style={styles.fonts} h4>
            h4 Heading
          </Text>
          <Text style={styles.fonts}>Normal Text</Text>
        </Card>
        <Card>
          <Card.Title>HELLO WORLD</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }}
          />
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text>
          <Button
            icon={
              <Icon
                name="code"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="VIEW NOW"
          />
        </Card>
      </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
},
fonts: {
  marginBottom: 8,
},
user: {
  flexDirection: 'column',
  marginBottom: 6,
},
image: {
  width: '90%',
  height: 100,
  margin: 10,
},
name: {
  fontSize: 16,
  marginTop: 5,
},
});
   

export default UserListItem