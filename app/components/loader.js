import React, { Component } from 'react';
import {View,Text,Platform,ActivityIndicator} from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from '../lib/dimensionScreen';
import {GlobalColors} from '../styles/colors'
export default class Loader extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        if(this.props.blnActive){
            return(
                <View style={{position: 'absolute', width: widthPercentageToDP('100%'), height: heightPercentageToDP('100%'), top:0, left:0, backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems:'center'}}>
                    <ActivityIndicator
                        color={GlobalColors.strColorPrimary}
                        size={'large'}
                    />
                </View>
            );
        }else{
            return null;
        }
    }
}