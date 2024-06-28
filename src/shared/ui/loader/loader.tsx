import { ActivityIndicator, Text, View } from 'react-native'

export default function Loader() {
  return (
    <View 
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <ActivityIndicator size='large' color='#60aee6' />
        <Text style={{ marginTop: 15, color: '#fff' }}>Загрузка...</Text>
    </View>
  )
}
