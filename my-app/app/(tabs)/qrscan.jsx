import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";

const QRScan = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannerText, setScannerText] = useState("Scanner.");
  const router = useRouter();

  // Animate "Scanner..." text
  useEffect(() => {
    const texts = ["Scanner.", "Scanner..", "Scanner..."];
    let index = 0;
    const interval = setInterval(() => {
      setScannerText(texts[index]);
      index = (index + 1) % texts.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);

      // Check if scanned data is a number
      if (!isNaN(data) && data.trim() !== "") {
        router.push(`/productActionPage?id=${data}`);
      } else {
        Alert.alert("Ugyldig QR-kode", `Data: ${data}`);
      }
    }
  };

  if (!permission) {
    return <Text>Spørger om kameratilladelse...</Text>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Appen har brug for kameraadgang for at scanne QR-koder
        </Text>
        <Button title="Giv tilladelse" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.overlayContainer}>
        <View style={styles.overlayTop}>
          <View style={styles.overlayHeaderContainer}>
            <Text style={styles.overlayHeader}>Scan QR kode</Text>
            <Text style={styles.overlaySubheader}>
              Benyt QR kode på vores produkter
            </Text>
          </View>
        </View>
        <View style={styles.overlayMiddle}>
          <View style={styles.overlayMiddleFill}></View>
          <View style={styles.overlayMiddleCamera}>
            <Image
              source={require("../../assets/images/ScanImage.webp")}
              style={styles.scanImage}
            />
          </View>
          <View style={styles.overlayMiddleFill}></View>
        </View>
        <View style={styles.overlayBottom}>
          <View style={styles.overlayBottomHeaderContainer}>
            <Text style={styles.overlayBottomHeader}>{scannerText}</Text>
          </View>
        </View>
      </View>
      {!scanned ? (
        <CameraView
          onBarcodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          facing="back"
        />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanning...</Text>
          <Button title="Scan igen" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  overlayContainer: { width: "100%", height: "100%", zIndex: 999 },
  overlayTop: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    width: "100%",
    height: "28%",
    justifyContent: "flex-end",
  },
  overlayMiddle: {
    height: "33%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  overlayMiddleFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  overlayMiddleCamera: {
    width: 280,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  scanImage: { height: 300, width: 300, zIndex: 999 },
  overlayHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },
  overlayHeader: {
    fontWeight: "800",
    fontSize: 16,
    textAlign: "center",
    color: "#08B6CF",
  },
  overlaySubheader: { maxWidth: 200, textAlign: "center", color: "#08B6CF" },
  overlayBottom: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    width: "100%",
    height: "33%",
  },
  overlayBottomHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },
  overlayBottomHeader: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    color: "#08B6CF",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultText: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

export default QRScan;
