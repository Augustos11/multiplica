import AsyncStorage from '@react-native-async-storage/async-storage';
export async function fnSaveSessionUser(objInfoUser) {
    try {
        const jsnInfoString = JSON.stringify(objInfoUser);
        await AsyncStorage.setItem('@session_user', jsnInfoString);
        return true;
    } catch (error) {
        console.log('error fnSaveSessionUser ->',error);
        return false;
    }
}

export async function fnGetSessionUser() {
    try {
        const jsnValue = await AsyncStorage.getItem('@session_user')
        if(jsnValue !== null) {
            let jsnInfoString = JSON.parse(jsnValue);
            return jsnInfoString;
        }
        return null;
    } catch (error) {
        console.log('error fnSaveSessionUser ->',error);
        return null;
    }
}