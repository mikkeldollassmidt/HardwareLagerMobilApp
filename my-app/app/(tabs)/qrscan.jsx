import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const QRScan = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState('');

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    const handleBarCodeScanned = ({ data }) => {
        if (!scanned) { // **Sikrer, at den ikke scanner flere gange i træk**
            setScanned(true);
            setData(data);
            alert(`QR-kode scannet: ${data}`);
        }
    };

    if (!permission) {
        return <Text>Spørger om kameratilladelse...</Text>;
    }
    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Appen har brug for kameraadgang for at scanne QR-koder</Text>
                <Button title="Giv tilladelse" onPress={requestPermission} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {!scanned ? (
                <CameraView
                    onBarcodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                    facing="back"
                />
            ) : (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Scannet data:</Text>
                    <Text style={styles.scannedData}>{data}</Text>
                    <Button title="Scan igen" onPress={() => setScanned(false)} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scannedData: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    permissionText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default QRScan;
