import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { s } from 'react-native-size-matters';

let toastInstance: any = null;

export const showToast = (message: string, type = 'success') => {
  if (toastInstance) {
    toastInstance(message, type);
  }
};

// A separate ToastMessage component for each individual toast
const ToastMessage = ({
  id,
  message,
  type,
  onHide,
}: {
  id: number;
  message: string;
  type: string;
  onHide: (id: number) => void;
}) => {
  const translateY = useSharedValue(-200);
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const hideToast = useCallback(() => {
    onHide(id);
  }, [id, onHide]);

  // Start the animation when the component mounts
  useEffect(() => {
    // Show animation
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withSpring(insets.top + 20, {
      damping: 15,
      stiffness: 150,
    });

    // Hide animation after delay
    const hideTimeout = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withSpring(-200, {
        damping: 15,
        stiffness: 150,
      }, (finished) => {
        if (finished) {
          runOnJS(hideToast)();
        }
      });
    }, 2500); // Show for 2.5 seconds

    return () => {
      clearTimeout(hideTimeout);
    };
  }, [id, insets.top, opacity, translateY, hideToast]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'warning':
        return '#FF9A01';
      default:
        return '#4CAF50';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        { backgroundColor: getBackgroundColor() },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

// The main Toast component that manages all the toasts
const Toast = () => {
  const [toasts, setToasts] = useState<Array<{id: number; message: string; type: string}>>([]);

  useEffect(() => {
    toastInstance = show;
    return () => {
      toastInstance = null;
    };
  }, []);

  const show = (msg: string, toastType: string) => {
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message: msg, type: toastType },
    ]);
  };

  const hide = (id: number) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== id)
    );
  };

  return (
    <View style={styles.wrapper}>
      {toasts.map((toast) => (
        <ToastMessage
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onHide={hide}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    zIndex: 999,
  },
  container: {
    marginVertical: 5,
    padding: s(16),
    borderRadius: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  text: {
    color: 'white',
    fontSize: s(16),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export { Toast };
