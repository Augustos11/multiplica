import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActionCreators } from '../actions/index';
import { bindActionCreators } from 'redux';
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
import {Navigation} from 'react-native-navigation';
import { Icon, Avatar, Image} from 'react-native-elements';
class Services extends Component{
    static propTypes = {
        componentId: PropTypes.string
    };

    constructor(props){
        super(props);
        this.state = {
            arrayItems : [],
        }
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <SafeAreaView style={[GlobalStyles.jsnBackgroundScreen,{justifyContent:'flex-start'}]}>
                <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
                    <TouchableOpacity onPress={()=>{Navigation.pop(this.props.componentId)}} style={{padding:10}}>
                        <Icon
                            name='left'
                            type='antdesign'
                            color='#000000'
                            size={widthPercentageToDP('7%')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[localStyles.jsnViewInput,{backgroundColor:'#ECECEC',padding:10,borderRadius:widthPercentageToDP('5%'),justifyContent:'center',alignItems:'center'}]}>
                    <Text style={localStyles.jsnTextTitle}>{this.props.strFullNameUserNavigation}</Text>
                    <Text style={localStyles.jsnTextSubTitle}>Servicios</Text>
                </View>
                <TouchableOpacity onPress={()=>{this.fnSendServices()}} style={[localStyles.jsnViewInput,{backgroundColor:'#ECECEC',borderRadius:widthPercentageToDP('5%'),padding:5,justifyContent:'flex-start'}]}>
                    <View style={{padding:10}}>
                        <Text style={{color:'black',fontSize:widthPercentageToDP('4%')}}>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const localStyles = StyleSheet.create({
    jsnViewInput:{
        width:'100%',
        marginBottom:heightPercentageToDP('3%')
    },
    jsnTextTitle : {
        color:'black',
        fontSize:widthPercentageToDP('5%'),
        fontWeight: 'bold'
    },
    jsnTextSubTitle : {
        color:'black',
        fontSize:widthPercentageToDP('4.5%')
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
)(Services);