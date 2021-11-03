import React, { Component } from 'react';
import {View,Text,Platform,TouchableOpacity} from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from '../lib/dimensionScreen';
import {GlobalColors} from '../styles/colors';
import {Overlay} from "react-native-elements";
import PropTypes from 'prop-types';
import { GlobalStyles } from '../styles/globalStyles';
export default class ModalMessage extends Component {
    static propTypes = {
        strTypeModal: PropTypes.string,
        onPressOk: PropTypes.func,
        strTextOk: PropTypes.string,
        strMessage: PropTypes.string,
        blnVisible: PropTypes.bool
    };
    constructor(props) {
        super(props);
    }

    fnRenderModal(){
        if(this.props.strTypeModal == 'confirm'){
            return(
                <Overlay isVisible={this.props.blnVisible} overlayStyle={GlobalStyles.jsnModalStyle}>
                    <View style={{alignItems:'center',marginBottom:10}}>
                        <Text style={{fontSize:widthPercentageToDP('6%'),textAlign:'center',color:'black'}}>{this.props.strMessage}</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'80%',marginBottom:heightPercentageToDP('2%')}}>
                            <TouchableOpacity onPress={this.props.onPressOk} style={[GlobalStyles.jsnButtonPrimary]}>
                                <Text style={[GlobalStyles.jsnButtonPrimary_text]}>{this.props.strTextOk}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Overlay>
            );
        }
    }

    render(){
        return this.fnRenderModal()
    }
}