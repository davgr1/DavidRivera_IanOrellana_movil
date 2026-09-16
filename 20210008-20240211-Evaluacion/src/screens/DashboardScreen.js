import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import AppTextInput from '../components/AppTextInput';
import ScreenContainer from '../components/ScreenContainer';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUserProfile';
import { colors } from '../theme/colors';
import { isValidDate } from '../utils/validation';

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const { profile, loading, updateProfile } = useUserProfile(user?.uid);

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [studentId, setStudentId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.nombreCompleto || '');
      setBirthDate(profile.fechaNacimiento || '');
      setStudentId(profile.carnet || '');
      setImageUrl(profile.imageUrl || '');
    }
  }, [profile]);

  const startEditing = () => {
    setFormError('');
    setSuccessMessage('');
    setEditing(true);
  };

  const cancelEditing = () => {
    if (profile) {
      setFullName(profile.nombreCompleto || '');
      setBirthDate(profile.fechaNacimiento || '');
      setStudentId(profile.carnet || '');
      setImageUrl(profile.imageUrl || '');
    }
    setErrors({});
    setFormError('');
    setEditing(false);
  };

  const validate = () => {
    const next = {};
    if (!fullName.trim()) next.fullName = 'Ingresa tu nombre completo.';
    if (!isValidDate(birthDate)) next.birthDate = 'Usa el formato AAAA-MM-DD.';
    if (!studentId.trim()) next.studentId = 'Ingresa tu carnet institucional.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async () => {
    setFormError('');
    setSuccessMessage('');
    if (!validate()) return;
    setSaving(true);
    try {
      await updateProfile({
        nombreCompleto: fullName.trim(),
        fechaNacimiento: birthDate.trim(),
        carnet: studentId.trim(),
        imageUrl: imageUrl.trim(),
      });
      setSuccessMessage('Datos actualizados correctamente.');
      setEditing(false);
    } catch (error) {
      setFormError('No se pudo guardar. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ScreenContainer>
        <Text style={styles.loadingText}>Cargando tu información...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Mi perfil</Text>

      <AppCard style={styles.avatarCard}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarInitial}>
              {(profile?.nombreCompleto || user?.email || '?').charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <Text style={styles.email}>{user?.email}</Text>
      </AppCard>

      <AppCard style={styles.formCard}>
        {editing ? (
          <>
            <AppTextInput
              label="Nombre completo"
              value={fullName}
              onChangeText={setFullName}
              error={errors.fullName}
            />
            <AppTextInput
              label="Fecha de nacimiento (AAAA-MM-DD)"
              value={birthDate}
              onChangeText={setBirthDate}
              error={errors.birthDate}
            />
            <AppTextInput
              label="Carnet institucional"
              value={studentId}
              onChangeText={setStudentId}
              error={errors.studentId}
            />
            <AppTextInput
              label="URL de imagen de perfil"
              value={imageUrl}
              onChangeText={setImageUrl}
              autoCapitalize="none"
            />

            {formError ? <Text style={styles.formError}>{formError}</Text> : null}

            <AppButton title="Guardar cambios" onPress={handleSave} loading={saving} />
            <AppButton
              title="Cancelar"
              variant="secondary"
              onPress={cancelEditing}
              style={styles.secondaryButton}
            />
          </>
        ) : (
          <>
            <InfoRow label="Nombre completo" value={profile?.nombreCompleto} />
            <InfoRow label="Fecha de nacimiento" value={profile?.fechaNacimiento} />
            <InfoRow label="Carnet institucional" value={profile?.carnet} />

            {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

            <AppButton title="Editar información" onPress={startEditing} />
          </>
        )}
      </AppCard>

      <AppButton
        title="Cerrar sesión"
        variant="secondary"
        onPress={logout}
        style={styles.logoutButton}
      />
    </ScreenContainer>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  loadingText: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  avatarCard: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.accent,
  },
  email: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  formCard: {
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 14,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 2,
    fontWeight: '600',
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  formError: {
    color: colors.error,
    marginBottom: 12,
    textAlign: 'center',
  },
  successText: {
    color: colors.accent,
    marginBottom: 12,
    textAlign: 'center',
  },
  secondaryButton: {
    marginTop: 12,
  },
  logoutButton: {
    marginTop: 4,
  },
});
