import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { database } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Registro = ({ navigation }) => {
    const [producto, setProducto] = useState({
        nombre: '',
        fechaNacimiento: new Date(),
        carnet: '',
        urlImagen: '',
    });

    // Función para navegar a la pantalla de inicio
    const goToHome = () => {
        navigation.goBack();
    };


    // Función para agregar el producto a Firestore
    const agregarProducto = async () => {
        try {

            await addDoc(collection(database, 'productos'), {...producto});
            console.log('Se guardó la colección');

            Alert.alert('Producto agregado', 'El producto se agregó correctamente', [
                { text: 'Ok', onPress: goToHome },
            ]);
        } catch (error) {
            console.error('Error al agregar el producto', error);
            Alert.alert('Error', 'Ocurrió un error al agregar el producto. Por favor, intenta nuevamente.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps='handled'
            >
                <Text style={styles.title}>Agregar producto</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setProducto({ ...producto, nombre: text })}
                        value={producto.nombre}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Precio:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setProducto({ ...producto, precio: parseFloat(text) })}
                        value={producto.precio}
                        keyboardType='numeric'
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={agregarProducto}>
                    <Text style={styles.buttonText}>Agregar persona</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={goToHome}>
                    <Text style={styles.buttonText}>Volver a perfil</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Registro;

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C2B3C',
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#B76D68',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        backgroundColor: '#2C2B3C',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: '100%'
    },
    button: {
        backgroundColor: '#403F4C',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#B76D68',
    },
    inputContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#121420',
        marginBottom: 16,
    },
});