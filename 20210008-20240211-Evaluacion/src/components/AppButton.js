import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

export default function AppButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
}) {
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isSecondary ? styles.secondary : styles.primary,
        pressed && !disabled && (isSecondary ? styles.secondaryPressed : styles.primaryPressed),
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isSecondary ? colors.accent : colors.textPrimary} />
      ) : (
        <Text style={[styles.text, isSecondary && styles.textSecondary]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primary: {
    backgroundColor: colors.accent,
  },
  primaryPressed: {
    backgroundColor: colors.accentPressed,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  secondaryPressed: {
    backgroundColor: colors.surface,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  textSecondary: {
    color: colors.accent,
  },
});
