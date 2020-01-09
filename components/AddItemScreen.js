//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,Icon,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import styles from './styles/styles';
 
import {
  Button,
  Provider,
  Portal,
  Paragraph,
  Dialog,
  TouchableRipple,
} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import {Header} from 'native-base';
import {MaterialDialog} from 'react-native-material-dialog';
import {db, currencySymbol as currency, CryptoJS} from './config';
const PendingView = () => (
  <View
    style={{
      flex: 0.5,

      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

class addItemScreen extends Component {
  constructor(props) {
    super(props);
  }
  stateBackup = {};
  state = {
    torchOn: false,
    itemName: '',
    productID: '',
    itemVariant: '',
    unitPrice: '',
    modalVisible: false,

    isDialogVisible: false,
    DialogAlertVisible: false,
    ActionOnDismiss: '',
    DialogAlertMessage: '',
    DialogAlertTitle: '',

    detectedBarCode: '',
    displayInputs: false,
    prodIDExists: false,
    sdvisible: false,
    sdTitle: '',
    sdContent: '',
    animating: false,

    deleteItemObject: {},
    deleteItemObjectID: '',
  };
  ItemDetails = details => (
    <View>
      <Text>Item Name: {details.itemName}</Text>
      <Text>Item Variant: {details.variant}</Text>
      <Text>Item Price: {details.unitPrice}</Text>
    </View>
  );
  resetState = () => {
    this.setState(this.stateBackup);
    this.camera.resumePreview();
  };
  componentDidMount() {
    this.stateBackup = this.state;
  }
  _showDialog = () => this.setState({sdvisible: true});

  _hideDialog = () => {
    this.setState({sdvisible: false});
    this.resetState();
  };
  static navigationOptions = {
    title: 'Manage Item',
    headerBackTitle: 'Back',
  };
 
  validateInputs = () => {
    if (this.state.productID == '') {
      alert(
        'Please Focus the Camera Preview on an item Barcode to capture its product ID.',
      );
      return false;
    }
    if (this.state.itemName == '') {
      alert('Please provide the Item Name');
      return false;
    }

    if (this.state.unitPrice == '') {
      alert('Please provide the Unit Price for the Item');
      return false;
    }

    return true;
  };
  displayInputs = () => {
    return {display: this.state.displayInputs ? 'flex' : 'none'};
  };
  proceedActions(actionType) {
    if (actionType === 'OK') {
      this.setState({productID: this.state.detectedBarCode});
      this.setState({displayInputs: true});
      //this.setState({torchOn: true});
    } else if (actionType === 'CANCEL') {
      this.camera.resumePreview();
    }
    this.setState({DialogAlertVisible: false});
  }
  deleteItem = itemID => {
    this.setState({
      animating: true,
    });
    db.ref('/products')
      .child(itemID)
      .remove()
      .then(s => {
        ToastAndroid.showWithGravity(
          'Item Deleted Successfully',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.resetState();
      })
      .catch(e => {
        console.log(e);
      });
    this.setState({
      animating: false,
    });
  };
  confirmDeleteItem = item => {
    this._hideDialog;
    this.setState({sdvisible: false});
    Alert.alert(
      'Confirm Action : DELETE ITEM',
      'Please confirm that you wish to delete the Item : \n ' +
        item.itemName +
        ' ' +
        item.variant +
        ' valued at  ' +
        currency +
        item.unitPrice,
      [
        {
          text: 'No',
          onPress: () => {
            this.resetState();
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => this.deleteItem(this.state.deleteItemObjectID),
        },
      ],
      {cancelable: true},
    );
  };
  onBarCodeRead = e => {
    const cl = this;
    console.log(e);
    // alert('Barcode value is' + e[0].data, 'Barcode type is' + e.type);
    this.setState({torchOn: false, animating: true}); //
    this.camera.pausePreview();
    this.productIdExists(e[0].data).then(s => {
      cl.setState({
        DialogAlertMessage:
          'A new Barcode ' +
          e[0].data +
          ' of type ' +
          e[0].type +
          ' has been detected. Do you wish to proceed adding the product to Kirana Inventory ?',
        DialogAlertTitle: 'New Barcode Detected',
        DialogAlertVisible: true,
        detectedBarCode: e[0].data,
      });
    });
  };

  productIdExists = prodID => {
    var cl = this;
    return new Promise(function(resolve, reject) {
      db.ref('/products')
        .child(prodID)
        .once('value', function(snapshot) {
          console.log(snapshot);
          var exists = snapshot.val() !== null;
          cl.setState({
            animating: false,
          });
          if (exists) {
            cl.setState({
              sdTitle: 'Product ID Exists',
              sdvisible: true,
              deleteItemObject: snapshot.val(),
              deleteItemObjectID: prodID,
              sdContent:
                'The Detected Barcode ' +
                prodID +
                ' exists as the Product ID for the item : ' +
                snapshot.val().itemName +
                ' ' +
                snapshot.val().variant,
            });
            cl.setState({prodIDExists: true});
            reject('EXISTS');
          } else {
            cl.setState({prodIDExists: false});
            resolve('NEW');
          }
        });
    });
  };
  submitNewItem = product => {
    var cl = this;
    db.ref('/products')
      .child(product.productID)
      .once('value', function(snapshot) {
        console.log(snapshot);
        var exists = snapshot.val() !== null;
        if (exists) {
          cl.setState({
            DialogAlertMessage:
              'Another Item exists with the Product ID ' +
              product.productID +
              '.',
            DialogAlertTitle: 'Product Exists',
            DialogAlertVisible: true,
            //  ActionOnDismiss: 'REDIRECT_SIGNIN',
          });
        } else {
          if (!cl.validateInputs()) {
            return 0;
          } else {
            //  console.log(user);

            db.ref('/products')
              .child(product.productID)
              .set({
                itemName: product.itemName,
                unitPrice: product.unitPrice,
                variant: product.itemVariant,
              })
              .then(data => {
                //success callback

                Alert.alert(
                  'Successful',
                  'New Item has been Added Successfully',
                  [
                    {
                      text: 'Close',
                      onPress: () => {
                        cl.resetState();
                      },
                      style: 'cancel',
                    },
                  ],
                );
              })
              .catch(error => {
                //error callback
                console.log(error);
                cl.setState({
                  DialogAlertMessage:
                    'An Error occurred. Kindly try again later or contact admin.',
                  DialogAlertTitle: 'Kirana',
                  DialogAlertVisible: true,
                });
              });
          }
        }
      });
  };
  handleTorch = value => {
    this.setState({torchOn: !this.state.torchOn});
  };
  render() {
    //this.setState({torchOn: false});
    const {navigation} = this.props;
    const {navigate} = this.props.navigation;
    return (
      <Provider>
        <ImageBackground
          source={require('./images/green.jpg')}
          style={{width: '100%', height: '100%'}}>
          <Text
            style={{
              width: '90%',
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 25,
            }}>
            Please focus the Camera Preview on the Item Barcode.
          </Text>
          <View style={styles.cameraPreview}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              autoFocus={RNCamera.Constants.AutoFocus.on}
              autoFocusPointOfInterest={{x: 0.5, y: 0.5}}
              zoom={0.3}
              type={RNCamera.Constants.Type.back}
              flashMode={
                this.state.torchOn == true
                  ? RNCamera.Constants.FlashMode.torch
                  : RNCamera.Constants.FlashMode.off
              }
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onGoogleVisionBarcodesDetected={({barcodes}) => {
                this.onBarCodeRead(barcodes);
              }}>
              <View style={styles.buttonRow}>
                <Button
                  style={styles.rowButton}
                  mode="outlined"
                  onPress={() => this.handleTorch(this.state.torchOn)}>
                  <Text style={{color: '#fff'}}>
                    {this.state.torchOn == true ? 'Flash On' : 'Flash Off'}
                  </Text>
                </Button>

                <Button
                  style={styles.rowButton}
                  mode="flat"
                  icon="refresh"
                  onPress={() => {
                    this.resetState();
                  }}>
                  <Text style={{color: '#fff'}}> RESET</Text>
                </Button>
              </View>
            </RNCamera>
          </View>
          <View style={this.displayInputs()}>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Product ID (From Barcode)</Text>
              <TextInput
                editable={false}
                style={styles.inputs_v2}
                label="Product ID"
                value={this.state.productID}
                onChangeText={productID => this.setState({productID})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Item Name </Text>
              <TextInput
                style={styles.inputs_v2}
                label="Item Name"
                value={this.state.itemName}
                onChangeText={itemName => this.setState({itemName})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Item Variant </Text>
              <TextInput
                style={styles.inputs_v2}
                label="Item Variant"
                value={this.state.itemVariant}
                onChangeText={itemVariant => this.setState({itemVariant})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Unit Price </Text>
              <TextInput
                disabled={true}
                style={styles.inputs_v2}
                keyboardType={'decimal-pad'}
                label="Unit Price"
                value={this.state.unitPrice}
                onChangeText={unitPrice => this.setState({unitPrice})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Button
                icon="plus"
                mode="contained"
                onPress={() => {
                  this.submitNewItem(this.state);
                }}>
                Add Item
              </Button>
            </View>
          </View>
          <ActivityIndicator
            animating={this.state.animating}
            size="large"
            color="#3440a8"
          />
          <MaterialDialog
            title={this.state.DialogAlertTitle}
            visible={this.state.DialogAlertVisible}
            onOk={() => this.proceedActions('OK')}
            onCancel={() => this.proceedActions('CANCEL')}>
            <Text>{this.state.DialogAlertMessage}</Text>
          </MaterialDialog>
          {/* <Button onPress={this._showDialog}>Show Dialog</Button> */}
          <Portal>
            <Dialog visible={this.state.sdvisible} onDismiss={this._hideDialog}>
              <Dialog.Title>{this.state.sdTitle}</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{this.state.sdContent}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions style={{justifyContent: 'space-between'}}>
                <Button
                  onPress={() => {
                    this.confirmDeleteItem(this.state.deleteItemObject);
                  }}>
                  DELETE ITEM
                </Button>
                <Button onPress={this._hideDialog}>OKAY</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </ImageBackground>
      </Provider>
    );
  }
}
const stylesl = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default addItemScreen;
