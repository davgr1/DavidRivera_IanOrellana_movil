import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import ScreenContainer from '../components/ScreenContainer';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../theme/colors';
import { getAuthErrorMessage } from '../utils/authErrors';
import { isValidEmail } from '../utils/validation';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!isValidEmail(email)) next.email = 'Ingresa un correo válido.';
    if (!password) next.password = 'Ingresa tu contraseña.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    setFormError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (error) {
      console.error('Error de inicio de sesión:', error?.code, error?.message);
      setFormError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

      <AppTextInput
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        placeholder="tucorreo@ejemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <AppTextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        placeholder="Tu contraseña"
        secureTextEntry
      />

      {formError ? <Text style={styles.formError}>{formError}</Text> : null}

      <AppButton title="Iniciar sesión" onPress={handleLogin} loading={loading} />
      <AppButton
        title="Crear una cuenta nueva"
        variant="secondary"
        onPress={() => navigation.navigate('Register')}
        style={styles.secondaryButton}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  formError: {
    color: colors.error,
    marginBottom: 12,
    textAlign: 'center',
  },
  secondaryButton: {
    marginTop: 12,
  },
});
