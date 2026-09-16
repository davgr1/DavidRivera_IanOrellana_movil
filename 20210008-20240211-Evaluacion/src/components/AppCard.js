import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

export default function AppCard({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
