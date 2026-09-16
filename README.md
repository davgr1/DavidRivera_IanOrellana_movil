# DavidRivera_IanOrellana_movil

Instituto Técnico Ricaldone — Tercer Año de Desarrollo de Software
Módulo 3.5: Desarrollo de componentes para dispositivos móviles
Evaluación Práctica: Desarrollo de Aplicaciones Móviles

**David José Rivera Avelar** — 20210008@ricaldone.edu.sv
**Ian Raúl Orellana Meza** — 20240211@ricaldone.edu.sv
## .env
API_KEY="AIzaSyDtvIDEXBGAAb8ARBfsOCxfV_NzXfAE18k"
AUTH_DOMAIN="evaluacion-f54a8.firebaseapp.com"
PROJECT_ID="evaluacion-f54a8"
STORAGE_BUCKET="evaluacion-f54a8.firebasestorage.app"
MESSAGING_SENDER_ID="935470492124"
APP_ID="1:935470492124:web:c944da2bfc789e56b08719"


## Descripción

Aplicación móvil desarrollada con React Native y Expo que permite la autenticación de usuarios
mediante Firebase Auth, gestionando las credenciales de conexión de forma segura a través de
variables de entorno (`.env`). La app está estructurada mediante componentes reutilizables
(botones, inputs, tarjetas y contenedor de pantalla propios) y cuenta con tres pantallas
conectadas por navegación:

- **Login**: acceso con correo y contraseña.
- **Registro**: creación de cuenta en Firebase Auth, almacenando en Cloud Firestore el nombre
  completo, fecha de nacimiento, carnet institucional y URL de imagen de perfil del usuario.
- **Dashboard (Perfil)**: muestra la información del usuario autenticado, permite actualizarla
  en tiempo real y cerrar sesión.

El código del proyecto vive dentro de la carpeta [`20210008-20240211-Evaluacion`](./20210008-20240211-Evaluacion).

## Cómo ejecutar el proyecto

\`\`\`bash
cd 20210008-20240211-Evaluacion
npm install
cp .env.example .env   # completar con las credenciales del proyecto de Firebase
npx expo start
\`\`\`

Luego escanea el código QR con la app Expo Go (Android/iOS). En Firebase, el proyecto debe
tener habilitado el proveedor **Correo/Contraseña** en Authentication → Sign-in method, y
Cloud Firestore creado con reglas que permitan lectura/escritura al usuario autenticado.

## Estructura del proyecto

\`\`\`
src/
├── components/   # AppButton, AppCard, AppTextInput, ScreenContainer (reutilizables)
├── config/       # Inicialización de Firebase (Auth + Firestore)
├── hooks/        # useAuth (contexto de sesión), useUserProfile (datos en Firestore)
├── navigation/   # Stack de navegación (Login/Registro ↔ Dashboard)
├── screens/      # LoginScreen, RegisterScreen, DashboardScreen
├── theme/        # Paleta de colores centralizada
└── utils/        # Validaciones y mapeo de errores de Firebase Auth
\`\`\`

## Dependencias principales

- `expo` (~54) y `expo-status-bar`
- `react` / `react-native`
- `firebase` — Firebase Authentication y Cloud Firestore (SDK modular)
- `@react-navigation/native` y `@react-navigation/native-stack` — navegación entre pantallas
- `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`
- `react-native-dotenv` — variables de entorno desde `.env`
- `@react-native-async-storage/async-storage` — persistencia de la sesión de Firebase Auth

## Paleta de colores

Paleta oscura aplicada en toda la interfaz de la aplicación:

| Uso | Color |
|---|---|
| Fondo principal | `#121420` |
| Fondo elevado / tarjetas | `#1B2432` |
| Superficie (inputs) | `#2C2B3C` |
| Superficie alterna / bordes | `#403F4C` |
| Acento (botones, enlaces) | `#B76D68` |
| Texto principal | `#FFFFFF` |
| Texto secundario | `#B8B8C4` |
| Error / validación | `#E0645C` |
