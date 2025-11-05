import { TextInput, Text, Button, Alert } from "react-native";
import { styled } from 'styled-components/native';
import { useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

// Componentes styled fuera del componente funcional para mejor rendimiento
const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #EFEFEF;
  margin-bottom: 200px;
`;

const TextBoxContainer = styled.View`
  width: 250px;
  height: 45px;
  background: white;
  border: solid darkgray 3px;
  border-radius: 10px;
  margin-bottom: 30px;
  padding-horizontal: 10px;
  justify-content: center;
`;

const RedViewWithImage = styled.View`
  justify-content: center;
  align-items: center;
`;

const BoxImage = styled.Image`
  width: 250px;
  height: 180px;
  border-radius: 2px;
  margin-bottom: 50px;
`;

const CorreoView = styled(TextBoxContainer)``;

const PasswView = styled(TextBoxContainer)``;

const BtnView = styled.View`
  margin-top: 30px;
  width: 160px;
`;

const LabelView = styled.View`
  display: flex;
  justify-content: left;
  width: 250px;
  margin-bottom: 5px;
`;

// --- Función de Validación de Contraseña (Mejor ubicacion fuera de handleSubmit) ---
function validarPasswrd(password : string) {
  const errores = [];
  let isValid = true;

  // Requisito 1: Al menos una letra minúscula
  const regexMinuscula = /(?=.*[a-z])/;
  if (!regexMinuscula.test(password)) {
    errores.push("una letra minúscula");
    isValid = false;
  }

  // Requisito 2: Al menos una letra mayúscula
  const regexMayuscula = /(?=.*[A-Z])/;
  if (!regexMayuscula.test(password)) {
    errores.push("una letra mayúscula");
    isValid = false;
  }

  // Requisito 3: Al menos un carácter especial del conjunto @, (, !, ), %, *, ?, &
  // NOTA: Se usan solo los caracteres especiales sin necesidad de escapar todos
  const regexCaracterEspecial = /.*[@()!%*?&]/; 
  if (!regexCaracterEspecial.test(password)) {
    errores.push("un carácter especial (@, (, !, ), %, *, ?, &)");
    isValid = false;
  }

  // Requisito 4: Longitud mínima de 8 caracteres
  const regexLongitud = /^.{8,}$/;
  if (!regexLongitud.test(password)) {
    errores.push("una longitud de al menos 8 caracteres");
    isValid = false;
  }

  // Requisito 5: Almenos un numero 0-9
  const regexNumber = /(?=.*[0-9])/;
  if (!regexNumber.test(password)) {
    errores.push("un numero (0-9)");
    isValid = false;
  }

  return {
    isValid,
    errores
  };
}
// ---------------------------------------------------------------------------------


export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    router.push({
      pathname: "/register",
    });
  }

  function validarEmail() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const handleSubmit = () => {
    // 1. Validar campos vacíos
    if (!email && !password) {
      Alert.alert('Error', 'Por favor, llena ambos campos');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Por favor, agrega una contraseña');
      return;
    }
    if (!email) {
      Alert.alert('Error', 'Por favor, agrega un email');
      return;
    }


    // 2. Validar formato de email
    if (!validarEmail()) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return;
    }

    // 3. Validar formato de contraseña con retroalimentación
    const resultadoPassw = validarPasswrd(password);

    if (!resultadoPassw.isValid) {
      // Genera el mensaje de error con las deficiencias
      const mensajeError = resultadoPassw.errores.length > 0
        ? "La contraseña debe contener:\n• " + resultadoPassw.errores.join("\n• ")
        : "Por favor, ingresa una contraseña válida."; // Caso de reserva

      // Muestra la alerta. No se modifican los states, por lo tanto, no se borra el texto.
      Alert.alert('Error en Contraseña', mensajeError);
      return; // Detiene la ejecución si la contraseña es inválida
    }

    // 4. Si todo está bien, guardar datos y mostrar éxito
    const userData = {
      email: email,
      password: password,
      timestamp: new Date().toISOString()
    };

    console.log('Datos guardados:', userData);

    Alert.alert(
      '¡Éxito!',
      'Inicio de sesión exitoso.\nCorreo: ' + userData.email,
      [
        {
          text: 'OK',
          onPress: () => {
            // Si quieres limpiar después del éxito, descomenta estas líneas:
            // setEmail('');
            // setPassword('');
          }
        }
      ]
    );
  };

  // ... (JSX del componente)
  return (
    <MainContainer>
      <RedViewWithImage>
        <BoxImage
          source={require('./../assets/images/person_512dp_292929_FILL0_wght500_GRAD0_opsz48.png')}
          resizeMode="cover"
          testID = "icon-image"
        />
      </RedViewWithImage>

      <LabelView>
        <Text>Correo:</Text>
      </LabelView>
      <CorreoView>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="ejemplo@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </CorreoView>

      <LabelView>
        <Text>Contraseña:</Text>
      </LabelView>
      <PasswView>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Ex4mpl3pa55"
          secureTextEntry={true} // oculta la contraseña
          autoCapitalize="none"
        />
      </PasswView>

      <BtnView>
        <Button
          title="Iniciar Sesión"
          onPress={handleSubmit}
          color="lightblack"
        />
      </BtnView>

      <BtnView>
        <Button
          title="Registro"
          onPress={onRegister}
          color="lightblack"
        />
      </BtnView>
    </MainContainer>
  );
}