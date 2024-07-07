import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { launchCamera } from "react-native-image-picker";
import axios from "axios";
import { GOOGLE_CLOUD_VISION_API_KEY } from "@env";

console.log("vision api", GOOGLE_CLOUD_VISION_API_KEY);

const ImageCaptureScreen = () => {
  const [images, setImages] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);

  const takePicture = async () => {
    const result = await launchCamera({
      mediaType: "photo",
      includeBase64: true,
    });

    if (result.assets && result.assets.length > 0) {
      const newImage = result.assets[0];
      setImages([...images, newImage]);
      analyzeImage(newImage.base64);
    }
  };

  const analyzeImage = async (base64Image) => {
    const body = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: "LABEL_DETECTION",
              maxResults: 10,
            },
            {
              type: "OBJECT_LOCALIZATION",
              maxResults: 10,
            },
            {
              type: "FACE_DETECTION",
              maxResults: 10,
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAnalysisResults([...analysisResults, response.data.responses[0]]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Picture" onPress={takePicture} />
      <ScrollView horizontal>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.image} />
        ))}
      </ScrollView>
      {analysisResults.map((result, index) => (
        <View key={index}>
          <Text>Analysis Result {index + 1}:</Text>
          {result.labelAnnotations &&
            result.labelAnnotations.map((label, idx) => (
              <Text key={idx}>{label.description}</Text>
            ))}
          {result.localizedObjectAnnotations &&
            result.localizedObjectAnnotations.map((object, idx) => (
              <Text key={idx}>{object.name}</Text>
            ))}
          {result.faceAnnotations &&
            result.faceAnnotations.map((face, idx) => (
              <Text key={idx}>
                Face detected with confidence: {face.detectionConfidence}
              </Text>
            ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default ImageCaptureScreen;
