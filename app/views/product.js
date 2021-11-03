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
import { Avatar } from 'react-native-elements';
class Product extends Component{
    static propTypes = {
        componentId: PropTypes.string
    };

    constructor(props){
        super(props);
        this.state = {
            strFullNameUser: '',
            arrayNews : [
                {
                    'strNews' : 'El noruego Jonas Bendiksen, fotógrafo de la agencia Magnum, recoge en ‘The Book of Veles’ una serie ficticia sobre la producción de noticias falsas con la que ha conseguido engañar a toda la industria',
                    'strName':'MT'
                },
                {
                    'strNews' : 'La prohibición de la plataforma incluye los vídeos que digan que causan autismo, cáncer o infertilidad, o que aseguren que pueden rastrear a quienes las reciben',
                    'strName':'CT'
                },
                {
                    'strNews' : 'Los competidores son los principales impulsores de las ‘fake news’ contra las empresas en las redes sociales',
                    'strName':'FY'
                },
                {
                    'strNews' : 'EE UU ha dado acceso a las farmacéuticas a bienes públicos, mientras estas se embolsan miles de millones',
                    'strName':'TU'
                },
                {
                    'strNews' : 'El rechazo del Senado a la medida del presidente es un acto contundente para frenar el autoritarismo del presidente, que trató de normalizar la red de mentiras',
                    'strName':'ZX'
                },
                {
                    'strNews' : 'El carácter global de las redes y su extraordinaria capacidad de contagio ha alimentado la propagación de falsos remedios y teorías de la conspiración',
                    'strName':'HJ'
                },
                {
                    'strNews' : 'Una denuncia inventada no anula un problema real. La instrumentalización de un problema tampoco anula su relevancia',
                    'strName':'VC'
                },
                {
                    'strNews' : 'La reforma legislativa aprobada en Brasil esta semana busca evitar la ‘‘censura’’ y dejar de eliminar la información falsa',
                    'strName':'NM'
                }
            ]
        }
    }

    componentDidMount(){
        this.setState({
            strFullNameUser : `${this.props.objInfoUser['strName']} ${this.props.objInfoUser['strLastName']}`
        })
    }

    fnSendServices(){
        Navigation.push(this.props.componentId,{
            component : {
                name : 'Services',
                id : 'Services',
                passProps : {
                    strFullNameUserNavigation : this.state.strFullNameUser
                }
            }
        })
    }

    fnRenderNews(){
        if(this.state.arrayNews.length > 0){
            let arrayTemp= this.state.arrayNews;
            let render = arrayTemp.map((item,index)=>{
                return (
                    <TouchableOpacity onPress={()=>{this.fnSendServices()}} style={[localStyles.jsnViewInput,{backgroundColor:'#ECECEC',borderRadius:widthPercentageToDP('5%'),padding:5,justifyContent:'flex-start'}]}>
                        <Avatar
                                size="small"
                                rounded
                                containerStyle = {{backgroundColor:'gray'}}
                                title={item['strName']}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                        />
                        <View style={{padding:10}}>
                            <Text style={{color:'black',fontSize:widthPercentageToDP('4%')}}>{item['strNews']}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
            return render;
        }
    }

    render(){
        return(
            <SafeAreaView style={[GlobalStyles.jsnBackgroundScreen]}>
                <View>
                    <ScrollView contentContainerStyle={{width:widthPercentageToDP('100%')}}>
                        <View style={{justifyContent:'space-between',flexDirection:'column'}}>
                            <View>
                                <View style={{justifyContent:'center'}}>
                                    <View style={[localStyles.jsnViewInput,{backgroundColor:'#ECECEC',padding:10,borderRadius:widthPercentageToDP('5%'),justifyContent:'center',alignItems:'center'}]}>
                                        <Text style={localStyles.jsnTextTitle}>Hola, {this.state.strFullNameUser}</Text>
                                        <Text style={localStyles.jsnTextSubTitle}>Bienvenido</Text>
                                        <Text style={[localStyles.jsnTextSubTitle,{fontSize:widthPercentageToDP('4%')}]}>Estas son las noticias más relevantes del dia.</Text>
                                    </View>
                                    {this.fnRenderNews()}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const localStyles = StyleSheet.create({
    jsnViewInput:{
        width:'97%',
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
    return {
        objInfoUser : state.objInfoUser
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators,dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);