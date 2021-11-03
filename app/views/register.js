import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActionCreators } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Input} from 'react-native-elements';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { GlobalColors } from '../styles/colors';
import { GlobalStyles } from '../styles/globalStyles';
import { heightPercentageToDP, widthPercentageToDP } from '../lib/dimensionScreen';
import auth from '@react-native-firebase/auth';
import Loader from '../components/loader';
import ModalMessage from '../components/modal';
import { fnSaveSessionUser ,fnGetSessionUser} from '../lib/functionsGeneral';
import {Navigation} from 'react-native-navigation'
class Register extends Component{
    static propTypes = {
        componentId: PropTypes.string
    };

    constructor(props){
        super(props);
        this.state = {
            strName : '',
            strLastName:'',
            strEmail:'',
            strPassword : '',
            strPasswordConfirm : '',
            objEmptyInput:{
                blnName:false,
                blnLastName:false,
                blnEmail:false,
                blnPassword : false,
                blnPassworConfirm : false
            },
            blnShowLoader :true,
            blnModalMessage : false,
            strMessage : '',
            blnRequest : true
        }
    }

    componentDidMount(){
        fnGetSessionUser().then((response)=>{
            if(response != null){
                this.props.fnSaveInfoUser(response);
                this.fnSendScreenProducts();
            }else{
                this.setState({
                    blnShowLoader : false,
                    blnRequest : false
                })
            }
        })
    }

    fnSendScreenProducts(){
        Navigation.setRoot({
            root: {
              stack: {
                children: [
                  {
                    component: {
                      name: 'Product'
                    }
                  }
                ]}
            }
        });
    }

    fnValidateInfo(){
        let blnName,blnLastName,blnEmail,blnPassword,blnPassworConfirm = false;
        let blnReturn = true;
        if(this.state.strName.trim() == ''){
            blnName = true;
            blnReturn = false;
        }
        if(this.state.strEmail.trim() == ''){
            blnEmail = true;
            blnReturn = false;
        }
        if(this.state.strLastName.trim() == ''){
            blnLastName = true;
            blnReturn = false;
        }
        if(this.state.strPassword.trim() == ''){
            blnPassword = true;
            blnReturn = false;
        }else{
            if(this.state.strPassword != this.state.strPasswordConfirm){
                blnPassworConfirm = true;
                blnReturn = false; 
            }
        }
        
        this.setState({
            objEmptyInput:{
                blnName:blnName,
                blnLastName:blnLastName,
                blnEmail:blnEmail,
                blnPassword : blnPassword,
                blnPassworConfirm : blnPassworConfirm
            },
            blnShowLoader : false
        });
        return blnReturn;
    }

    fnRegister(){
        if(this.fnValidateInfo()){
            auth()
            .createUserWithEmailAndPassword(this.state.strEmail.trim().toLocaleLowerCase(), this.state.strPassword)
            .then((resp) => {
                let onjInfoUser= {
                    strName : this.state.strName.trim(),
                    strLastName:this.state.strLastName.trim(),
                    strEmail:this.state.strEmail.trim(),
                    strPassword : this.state.strPassword.trim()
                }
                fnSaveSessionUser(onjInfoUser);
                this.props.fnSaveInfoUser(onjInfoUser);
                this.fnSendScreenProducts();
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    this.setState({
                        blnModalMessage : true,
                        strMessage : 'El correo ya esta registrado, porfavor ingrese otro correo o inicie sesion.'
                    })
                }

                if (error.code === 'auth/invalid-email') {
                    this.setState({
                        blnModalMessage : true,
                        strMessage : 'El correo no es valido, porfavor ingrese el correo nuevamente.'
                    })
                }

                if(error.code === 'auth/weak-password'){
                    this.setState({
                        blnModalMessage : true,
                        strMessage : 'La contraseña no es valida, debe tener al menos 6 caracteres.'
                    });
                }
            });
        }
    }

    fnRender(){
        if(this.state.blnRequest == false){
            return (
                <View>
                    <ScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={{width:widthPercentageToDP('100%')}}>
                        <View style={{justifyContent:'space-between',flexDirection:'column'}}>
                            <View>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <View style={[localStyles.jsnViewInput]}>
                                        <Text style={GlobalStyles.jsnTitleInput}>Nombre:</Text>
                                        <Input
                                            scrollEnabled={true}
                                            containerStyle={[GlobalStyles.jsnContainerStyle_input]}
                                            inputContainerStyle={[GlobalStyles.jsnInputContainerStyle_input]}
                                            inputStyle={[GlobalStyles.jsnInputStyle_input]}
                                            value={this.state.strName}
                                            onChangeText={(text)=>{this.setState({strName:text})}}
                                            errorMessage={this.state.objEmptyInput.blnName == true ? 'El campo no debe estar vacío' : ''}
                                            errorStyle={{ color: 'red' }}
                                        />
                                    </View>
                                    <View style={[localStyles.jsnViewInput]}>
                                        <Text style={GlobalStyles.jsnTitleInput}>Apellido:</Text>
                                        <Input
                                            scrollEnabled={true}
                                            containerStyle={[GlobalStyles.jsnContainerStyle_input]}
                                            inputContainerStyle={[GlobalStyles.jsnInputContainerStyle_input]}
                                            inputStyle={[GlobalStyles.jsnInputStyle_input]}
                                            value={this.state.strLastName}
                                            onChangeText={(text)=>{this.setState({strLastName:text})}}
                                            errorMessage={this.state.objEmptyInput.blnLastName == true ? 'El campo no debe estar vacío' : ''}
                                            errorStyle={{ color: 'red' }}
                                        />
                                    </View>
                                    <View style={[localStyles.jsnViewInput]}>
                                        <Text style={GlobalStyles.jsnTitleInput}>Correo electrónico:</Text>
                                        <Input
                                            scrollEnabled={true}
                                            containerStyle={[GlobalStyles.jsnContainerStyle_input]}
                                            inputContainerStyle={[GlobalStyles.jsnInputContainerStyle_input]}
                                            inputStyle={[GlobalStyles.jsnInputStyle_input]}
                                            value={this.state.strEmail}
                                            onChangeText={(text)=>{this.setState({strEmail:text})}}
                                            errorMessage={this.state.objEmptyInput.blnEmail == true ? 'El campo no debe estar vacío' : ''}
                                            errorStyle={{ color: 'red' }}
                                        />
                                    </View>
                                    <View style={[localStyles.jsnViewInput]}>
                                        <Text style={GlobalStyles.jsnTitleInput}>Contraseña:</Text>
                                        <Input
                                            secureTextEntry={true}
                                            scrollEnabled={true}
                                            containerStyle={[GlobalStyles.jsnContainerStyle_input]}
                                            inputContainerStyle={[GlobalStyles.jsnInputContainerStyle_input]}
                                            inputStyle={[GlobalStyles.jsnInputStyle_input]}
                                            value={this.state.strPassword}
                                            onChangeText={(text)=>{this.setState({strPassword:text})}}
                                            errorMessage={this.state.objEmptyInput.blnPassword == true ? 'El campo no debe estar vacío' : ''}
                                            errorStyle={{ color: 'red' }}
                                        />
                                    </View>
                                    <View style={[localStyles.jsnViewInput]}>
                                        <Text style={GlobalStyles.jsnTitleInput}>Confirmar contraseña:</Text>
                                        <Input
                                            secureTextEntry={true}
                                            scrollEnabled={true}
                                            containerStyle={[GlobalStyles.jsnContainerStyle_input]}
                                            inputContainerStyle={[GlobalStyles.jsnInputContainerStyle_input]}
                                            inputStyle={[GlobalStyles.jsnInputStyle_input]}
                                            value={this.state.strPasswordConfirm}
                                            onChangeText={(text)=>{this.setState({strPasswordConfirm:text})}}
                                            errorMessage={this.state.objEmptyInput.blnPassworConfirm == true ? 'Las contraseñas no coinciden' : ''}
                                            errorStyle={{ color: 'red' }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <View style={{width:'80%',marginBottom:heightPercentageToDP('2%')}}>
                                    <TouchableOpacity style={[GlobalStyles.jsnButtonPrimary]} onPress={()=>{this.setState({blnShowLoader:true},()=>{this.fnRegister()})}}>
                                        <Text style={[GlobalStyles.jsnButtonPrimary_text]}>Registrar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }

    render(){
        return(
            <SafeAreaView style={[GlobalStyles.jsnBackgroundScreen]}>
                {this.fnRender()}
                <Loader blnActive={this.state.blnShowLoader}/>
                <ModalMessage 
                    strTypeModal={'confirm'}
                    onPressOk={()=>{
                        this.setState({
                            blnModalMessage : false,
                            strMessage : ''
                        })
                    }}
                    strTextOk={'Ok'}
                    strMessage={this.state.strMessage}
                    blnVisible={this.state.blnModalMessage}/>
            </SafeAreaView>
        );
    }
}

const localStyles = StyleSheet.create({
    jsnViewInput:{
        width:'90%',marginBottom:heightPercentageToDP('3%')
    }
});

function mapStateToProps(state){
    return {}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators,dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);