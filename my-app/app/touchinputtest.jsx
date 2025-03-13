import React, { useRef, useState, useEffect } from "react";
import { View, Animated, PanResponder, Image } from "react-native";
import { Accelerometer } from "expo-sensors";

const DraggableBall = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [subscription, setSubscription] = useState(null);

  // Handle touch dragging
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {},
    })
  ).current;

  // Handle accelerometer movement
  useEffect(() => {
    const subscribe = () => {
      Accelerometer.setUpdateInterval(100);
      const sub = Accelerometer.addListener(({ x, y }) => {
        Animated.spring(pan, {
          toValue: { x: pan.x._value + x * 20, y: pan.y._value - y * 20 },
          useNativeDriver: false,
        }).start();
      });
      setSubscription(sub);
    };

    subscribe();
    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View {...panResponder.panHandlers} style={pan.getLayout()}>
        <Image source={require("../assets/images/itdepot.webp")} style={styles.ball} />
      </Animated.View>
    </View>
  );
};

const styles = {
  ball: {
    width: 80, // Adjust size as needed
    height: 80,
    resizeMode: "contain",
  },
};

export default DraggableBall;
