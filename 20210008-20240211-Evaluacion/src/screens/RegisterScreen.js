import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import ScreenContainer from '../components/ScreenContainer';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../theme/colors';
import { getAuthErrorMessage } from '../utils/authErrors';
import { isValidDate, isValidEmail } from '../utils/validation';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [studentId, setStudentId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!fullName.trim()) next.fullName = 'Ingresa tu nombre completo.';
    if (!isValidDate(birthDate)) next.birthDate = 'Usa el formato AAAA-MM-DD.';
    if (!studentId.trim()) next.studentId = 'Ingresa tu carnet institucional.';
    if (!isValidEmail(email)) next.email = 'Ingresa un correo válido.';
    if (password.length < 6) next.password = 'Mínimo 6 caracteres.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async () => {
    setFormError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await register(email.trim(), password, {
        nombreCompleto: fullName.trim(),
        fechaNacimiento: birthDate.trim(),
        carnet: studentId.trim(),
        imageUrl: imageUrl.trim(),
      });
    } catch (error) {
      console.error('Error de registro:', error?.code, error?.message);
      setFormError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>

      <AppTextInput
        label="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
        error={errors.fullName}
        placeholder="Ej. David Rivera"
      />
      <AppTextInput
        label="Fecha de nacimiento (AAAA-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
        error={errors.birthDate}
        placeholder="2005-04-23"
      />
      <AppTextInput
        label="Carnet institucional"
        value={studentId}
        onChangeText={setStudentId}
        error={errors.studentId}
        placeholder="20210008"
      />
      <AppTextInput
        label="URL de imagen de perfil (opcional)"
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="https://..."
        autoCapitalize="none"
      />
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
        placeholder="Mínimo 6 caracteres"
        secureTextEntry
      />

      {formError ? <Text style={styles.formError}>{formError}</Text> : null}

      <AppButton title="Registrarme" onPress={handleRegister} loading={loading} />
      <AppButton
        title="Ya tengo cuenta, iniciar sesión"
        variant="secondary"
        onPress={() => navigation.navigate('Login')}
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
