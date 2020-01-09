//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableHighlight,
  ToastAndroid,
  FlatList,
} from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import styles from './styles/styles';
import {
  Button,
  Provider,
  Portal,
  FAB,
  Paragraph,
  Card,
  List,
  Title,
  Avatar,
  Dialog,
  DataTable,
  Chip,
  TouchableRipple,
} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {Header, Subtitle} from 'native-base';
import {MaterialDialog} from 'react-native-material-dialog';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {db, currencySymbol as currency, CryptoJS} from './config';
import {items} from './items';
import addItemScreen from './AddItemScreen';
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
const DATA = items;

class Item extends Component {
  render() {
    var minusCount = prodID => this.props.minusCount(prodID);
    return (
      <Card style={{borderRadius: 0, marginBottom: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Avatar.Text
              size={40}
              label={'x' + this.props.details.count}
              style={{width: 40, margin: 10}}
            />
            <View
              style={{
                alignItems: 'flex-start',
                width: 120,
                overflow: 'hidden',
              }}>
              <Text style={styles.itemTitle}>
                {this.props.details.itemName}
              </Text>
              <Text numberOfLines={1} style={{width: 100}}>
                {this.props.details.variant}
              </Text>
            </View>
          </View>
          <View style={{width: 40}}>
            <Text style={styles.itemTitle}>
              Rs. {this.props.details.unitPrice}
            </Text>
            <Text>Rs. {this.props.details.totalItemPrice}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={{width: 180, flexDirection: 'row'}}>
              <FAB
                style={{margin: 10}}
                small
                icon="minus"
                onPress={() => this.props.minusCount(this.props.details.prodID)}
              />
              <FAB
                style={{margin: 10}}
                small
                icon="plus"
                onPress={() => this.props.plusCount(this.props.details.prodID)}
              />
              <FAB
                style={{backgroundColor: 'brown', margin: 10}}
                small
                icon="close"
                onPress={() =>
                  this.props.removeItemfromCart(this.props.details.prodID)
                }
              />
            </View>
          </View>
        </View>
      </Card>
    );
  }
}
class checkOutScreen extends Component {
  constructor(props) {
    super(props);
  }
  stateBackup = {};
  storename = '';
  cartItemsBackup = [];
  newItemFoundObjectBackup = {};
  state = {
    torchOn: false,
    modalVisible: false,
    sdvisible: false,
    sdTitle: '',
    sdContent: '',
    animating: false,
    isDialogVisible: false,
    DialogAlertVisible: false,
    ActionOnDismiss: '',
    DialogAlertMessage: '',
    DialogAlertTitle: '',
    itemCount: 0,
    showAddItemSection: false,
    showTotalsSection: false,
    cartItems: [],
    totalCartValue: 0,
    newitemFoundObject: {
      itemName: 'Item Name',
      variant: 'Description',
      unitPrice: '00.0',
      itemID: '',
    },
  };

  resetState = () => {
    this.setState(this.stateBackup, () => {
      this.setState({
        newitemFoundObject: this.newItemFoundObjectBackup,
        cartItems: [],
      });
      this.camera.resumePreview();
    });

    console.log('reset to ', this.state);
    // this.resetNewItemFoundObject();
  };
completeDialog = () => {
  SweetAlert.showAlertWithOptions({
  title: 'ORDER COMPLETE',
  subTitle:  this.state.totalCartValue + ' has been paid for the order. CART RESET.',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  otherButtonTitle: 'Cancel',
  otherButtonColor: '#dedede',
  style: 'success',
  cancellable: false
}, ()=>{
this.resetState();
})}

  showCheckoutDialog = () => {
    var cl = this;
    cl.setState({
      sdTitle: 'Shopping Cart Summary',
      sdvisible: true,
    });
  };
  resetNewItemFoundObject = () => {
    this.setState({
      newitemFoundObject: this.newItemFoundObjectBackup,
      showAddItemSection: false,
    });
    this.camera.resumePreview();
  };
  componentDidMount() {
    this.stateBackup = this.state;
    this.newItemFoundObjectBackup = this.state.newitemFoundObject;
    this.cartItemsBackup = this.state.cartItems;
    this.storename = this.props.navigation.getParam('storename');
  }

  _showDialog = () => this.setState({sdvisible: true});
  _hideDialog = () => {
    this.setState({sdvisible: false});
    this.resetState();
  };
  static navigationOptions = {
    title: 'Cart',
    headerBackTitle: 'Back',
  };

  showAddItemSection = () => {
    return {display: this.state.showAddItemSection ? 'flex' : 'none'};
  };
  showTotalsSection = () => {
    return {display: this.state.showTotalsSection ? 'flex' : 'none'};
  };
  isIteminCart = prodID => {
    //console.log(itemIDs.indexOf(prodID))

    var itemsObj = this.state.cartItems;
    var itemIDs = [];
    itemsObj.map(item => {
      itemIDs.push(item.prodID);
    });
    if (itemIDs.indexOf(prodID) >= 0) {
      // alert('Item Already Added');
      return true;
    } else {
      //   alert('New Item Added');
      return false;
    }
  };
  addItemSequence = () => {
    this.setState({
      showAddItemSection: false,
    });
    this.camera.resumePreview();
    mostRecentItem = {};
    var cartItems = this.state.cartItems;
    var mostRecentItem = this.state.newitemFoundObject;

    if (this.isIteminCart(mostRecentItem.prodID)) {
      alert(
        'The Item is already in the Cart. Please use the (-) or (+) buttons to adjust the quantity.',
      );
    } else {
      var itemCount = this.state.itemCount + 1;
      mostRecentItem['cartItemNumber'] = itemCount;
      cartItems.push(mostRecentItem);
      //   var totalCartValue =    this.state.totalCartValue + mostRecentItem.unitPrice * mostRecentItem.count;
      var sortedCartItems = cartItems.sort(function(a, b) {
        return a.cartItemNumber - b.cartItemNumber;
      });
      this.setState({
        cartItems: sortedCartItems,
        itemCount: itemCount,
      });
      this.updateTotal();
    }
  };
  adjustItemCount = (action, prodID) => {
    // console.log(this.state.cartItems);
    //alert('increased');

    var currentCartItems = this.state.cartItems; //[{}]
    //(x => x.id === '45');

    var currentItem = currentCartItems.filter(item => item.prodID == prodID);
    var filtered = currentCartItems.filter(function(item, index, arr) {
      return item.prodID != prodID;
    });

    // console.log(filtered);
    var currentCount = 1;
    var currentItemCount = currentItem[0].count;
    if (currentItemCount != 1 && action == 'minus') {
      console.log('Current item count is ', currentItemCount);
      currentCount = currentItem[0].count - 1;
    }

    if (action == 'plus') {
      currentCount = currentItem[0].count + 1;
    }
    currentItem[0].count = currentCount;
    currentItem[0].totalItemPrice = currentCount * currentItem[0].unitPrice;

    // console.log(currentItem);
    filtered.push(currentItem[0]); //The updated cart

    var sortedCartItems = filtered.sort(function(a, b) {
      return a.cartItemNumber - b.cartItemNumber;
    });
    console.log(sortedCartItems); //The updated cart
    this.setState({cartItems: filtered}, () => {
      this.updateTotal();
    });
  };
  updateTotal = async () => {
    var cartItems = this.state.cartItems;
    console.log('recaling', cartItems);
    var totalCartValue = 0;
    cartItems.map(item => {
      totalCartValue = totalCartValue + item.totalItemPrice;
    });
    if (totalCartValue > 0) {
      this.setState({totalCartValue: totalCartValue, showTotalsSection: true});
    } else {
      this.setState({totalCartValue: totalCartValue, showTotalsSection: false});
    }
  };
  removeItemfromCart = prodID => {
    var currentCartItems = this.state.cartItems; //[{}]
    console.log('initial', currentCartItems);
    var itemToRemove = currentCartItems.filter(item => item.prodID == prodID);
    var filtered = currentCartItems.filter(function(item, index, arr) {
      return item.prodID != prodID;
    });

    console.log('final', filtered);
    this.setState({cartItems: filtered}, () => {
      this.updateTotal();
    });
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
          ' has been detected. Please add the Item to the Inventory using the Manage Items Screen',
        DialogAlertTitle: 'New Barcode Detected',
        DialogAlertVisible: true,
        detectedBarCode: e[0].data,
      });
      this.resetNewItemFoundObject();
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
            var itemObj = {};
            var initialCount = 1;
            itemObj = snapshot.val();

            itemObj['prodID'] = prodID;
            itemObj['count'] = initialCount;
            itemObj['totalItemPrice'] = initialCount * itemObj.unitPrice;
            cl.setState({
              showAddItemSection: true,
              newitemFoundObject: itemObj,
            });

            reject();
          } else {
            cl.setState({prodIDExists: false});
            resolve();
          }
        });
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
          <View style={this.showAddItemSection()}>
            <View
              style={{
                backgroundColor: '#b1f2e0',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 5,
              }}>
              <View style={styles.justifiedCenter}>
                <Title style={styles.addItemTitle}>
                  {this.state.newitemFoundObject.itemName}
                </Title>
                <Text style={styles.itemName}>
                  {this.state.newitemFoundObject.variant}
                </Text>
              </View>
              <View style={styles.justifiedCenter}>
                <Chip
                  style={{backgroundColor: '#e831e5'}}
                  icon="plus"
                  onPress={() => this.addItemSequence()}>
                  <Text style={{color: 'white'}}>
                    ( {this.state.newitemFoundObject.unitPrice} Rs.) Add item
                  </Text>
                </Chip>
              </View>
              <View style={styles.justifiedCenter}>
                <Button onPress={() => this.resetNewItemFoundObject()}>
                  Cancel
                </Button>
              </View>
            </View>
          </View>
          <View style={{flex: 1, paddingVertical: 4}}>
            <ScrollView style={{}}>
              {this.state.cartItems.map(item => (
                <Item
                  key={item => item.id}
                  details={item}
                  plusCount={() => this.adjustItemCount('plus', item.prodID)}
                  minusCount={() => this.adjustItemCount('minus', item.prodID)}
                  removeItemfromCart={() => {
                    this.removeItemfromCart(item.prodID);
                  }}
                />
              ))}
            </ScrollView>
          </View>
          <View style={this.showTotalsSection()}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 5,
              }}>
              <Chip
                style={{backgroundColor: '#426fe3'}}
                icon="cart"
                onPress={() => this.showCheckoutDialog()}>
                <Title style={{color: 'white'}}>
                  ( Total Price: Rs. {this.state.totalCartValue} ) | CHECKOUT
                </Title>
              </Chip>
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
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Item/Description</DataTable.Title>
                    <DataTable.Title numeric>Price @ / Qty</DataTable.Title>
                    <DataTable.Title numeric>Price Σ</DataTable.Title>
                  </DataTable.Header>
                  <ScrollView style={{maxHeight: 300}}>
                    {this.state.cartItems.map(item => (
                      <DataTable.Row>
                        <DataTable.Cell>{item.itemName}</DataTable.Cell>
                        <DataTable.Cell numeric>
                          Rs. {item.unitPrice} x {item.count}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          {item.totalItemPrice}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </ScrollView>
                  <DataTable.Row style={{backgroundColor: 'yellow'}}>
                    <DataTable.Cell>Total Cart Value</DataTable.Cell>
                    <DataTable.Cell numeric></DataTable.Cell>
                    <DataTable.Cell numeric>
                      {this.state.totalCartValue}
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </Dialog.Content>
              <Dialog.Actions style={{justifyContent: 'space-between'}}>
                <Button
                  onPress={() => {
                    this.setState({sdvisible: false});
                  }}>
                  BACK TO CART
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgba(1,89,57,1)',
                    paddingHorizontal: 5,
                  }}
                  type=""
                  onPress={()=>{this.completeDialog() }}>
                  <Text style={{color: '#F8E54B'}}>FINISH ORDER</Text>
                </Button>
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
export default checkOutScreen;
