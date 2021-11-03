import {StyleSheet} from 'react-native';
import {GlobalColors} from './colors';
import {heightPercentageToDP,widthPercentageToDP} from '../lib/dimensionScreen';
export const GlobalStyles = StyleSheet.create({
    jsnBackgroundScreen:{
        backgroundColor:GlobalColors.strWhite,
        flex:1,
        justifyContent:'space-between',
        padding:5
    },
    jsnContainerStyle_input:{
        height:heightPercentageToDP('6%'),
        borderWidth:1,
        borderRadius:10,
        borderColor:GlobalColors.strGreyBorder,
        backgroundColor:GlobalColors.strWhite
    },
    jsnInputContainerStyle_input:{
        height:'100%',
        borderBottomWidth:0
    },
    jsnInputStyle_input:{
        fontSize:heightPercentageToDP('2.5%'),
        padding:0,
        color:'#000000'
    },
    intSizeIconInput:widthPercentageToDP('5%'),
    jsnButtonPrimary:{
        backgroundColor:GlobalColors.strColorPrimary,
        height:heightPercentageToDP('6.5%'),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    jsnButtonPrimary_text:{
        color:'black',
        fontWeight:'bold',
        fontSize:heightPercentageToDP('2.5%')
    },
    jsnTitleInput:{
        color:GlobalColors.strGreyTitleInput,
        fontSize:heightPercentageToDP('2%'),
        marginLeft:widthPercentageToDP('1%')
    },
    jsnModalStyle:{
        borderRadius: widthPercentageToDP('3%'),
        borderWidth: 1,
        padding: 20,
        borderColor: 'gray',
        width: widthPercentageToDP('90%'),
        backgroundColor: 'white'
    }
})