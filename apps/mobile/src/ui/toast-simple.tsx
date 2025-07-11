import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface ToastItem {
  id: number;
  message: string;
  type: string;
}

let toastInstance: ((message: string, type?: string) => void) | null = null;

export const showToast = (message: string, type = 'success') => {
  if (toastInstance) {
    toastInstance(message, type);
  }
};

// Individual toast message component
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
  const translateY = useRef(new Animated.Value(-200)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Show animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: insets.top + 20,
        damping: 15,
        stiffness: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Hide animation after delay
    const hideTimeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: -200,
          damping: 15,
          stiffness: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide(id);
      });
    }, 2500);

    return () => {
      clearTimeout(hideTimeout);
    };
  }, [id, insets.top, opacity, translateY, onHide]);

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
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

// Main Toast component
const Toast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    toastInstance = (msg: string, toastType: string = 'success') => {
      const id = Date.now() + Math.random(); // Ensure unique ID
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, message: msg, type: toastType },
      ]);
    };

    return () => {
      toastInstance = null;
    };
  }, []);

  const hide = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <View style={styles.wrapper} pointerEvents="none">
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
    padding: 16,
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    maxWidth: width - 40,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export { Toast };
