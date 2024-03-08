import React from 'react';
import { StyleSheet, Dimensions, View, alert, Alert } from 'react-native';
import Pdf from 'react-native-pdf';

const ShowPdfScreen = () => {
   // const url = "http://samples.leanpub.com/thereactnativebook-sample.pdf"
    const url = "https://drive.google.com/file/d/17c-YQLUWPaTlyMpejrNAkp0z5XvOHEPn/view?usp=drive_link"
    const pdfUrl = "https://firebasestorage.googleapis.com/v0/b/ibadat-4349c.appspot.com/o/AL_Quran_Parawise%2Fpara-no-1.pdf?alt=media&token=36128243-3e3f-417c-b418-269adc16be89"

   // https://drive.google.com/file/d/14HT89dYK8I9rAiZUsSoV5wGRy-qr5z-k/view?usp=sharing
   // https://drive.google.com/file/d/14HT89dYK8I9rAiZUsSoV5wGRy-qr5z-k/view?usp=drive_link

    //https://drive.google.com/file/d/17c-YQLUWPaTlyMpejrNAkp0z5XvOHEPn/view?usp=drive_link

 //https://drive.google.com/file/d/14HT89dYK8I9rAiZUsSoV5wGRy-qr5z-k/view?usp=sharing
    const source = { uri: pdfUrl, cache: true };
    return (
        <View style={styles.container}>
        <Pdf
                            trustAllCerts={false}

            source={source}
            onLoadComplete={(numberOfPages,filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages) => {
               // console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
                Alert.alert(`Loading failed ${error}`)
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}/>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});

export default ShowPdfScreen