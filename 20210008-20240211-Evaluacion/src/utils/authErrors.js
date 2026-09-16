const MESSAGES = {
  'auth/invalid-email': 'El correo electrónico no es válido.',
  'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
  'auth/user-not-found': 'No existe una cuenta con este correo.',
  'auth/wrong-password': 'La contraseña es incorrecta.',
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ya existe una cuenta con este correo.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/network-request-failed': 'Error de conexión. Verifica tu internet.',
  'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
  'auth/invalid-api-key': 'Las credenciales de Firebase en el .env no son válidas.',
  'auth/api-key-not-valid.-please-pass-a-valid-api-key.': 'Las credenciales de Firebase en el .env no son válidas.',
  'auth/configuration-not-found': 'Falta habilitar el método de correo/contraseña en Firebase Authentication.',
};

export function getAuthErrorMessage(error) {
  return MESSAGES[error?.code] || 'Ocurrió un error inesperado. Intenta de nuevo.';
}
