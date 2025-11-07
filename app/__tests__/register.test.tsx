import * as React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { Alert } from "react-native";
import Index from '../register';
import { useRoute } from '@react-navigation/native';

jest.spyOn(Alert, 'alert');

describe('Index (Login Screen)', () => {
});

//mock para router.push
// const mockPush = jest.fn();
// jest.mock('expo-router', () => ({
//     useRouter: () => ({
//         push: mockPush,
//     })
// }))


describe('Index (Login screen)', () => {
    it('renders correctly', () => {
        render(<Index />);
        expect(screen.getByPlaceholderText('ejemplo@correo.com')).toBeTruthy();
        expect(screen.getByPlaceholderText('Usuario234')).toBeTruthy();
        expect(screen.getByPlaceholderText('Ex4mpl3pa55')).toBeTruthy();
        expect(screen.getByPlaceholderText('repite: Ex4mpl3pa55')).toBeTruthy(); 
        expect(screen.getByText('Registrarse')).toBeTruthy();
    })
    it('shows alerts when fields are empty', async () => {
        const { getByPlaceholderText, getAllByText } = render(<Index />);

        const emailInput = getByPlaceholderText('ejemplo@correo.com');
        const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
        const loginButton = getAllByText('Registrarse')[0];

        fireEvent.changeText(emailInput, '');
        fireEvent.changeText(passwordInput, '');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor, llena todos los campos');
        });
    });
    // it('shows alerts when only email is empty', async () => {
    //     const { getByPlaceholderText, getAllByText } = render(<Index />);

    //     const emailInput = getByPlaceholderText('ejemplo@correo.com');
    //     const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
    //     const loginButton = getAllByText('Registrarse')[0];

    //     fireEvent.changeText(emailInput, '');
    //     fireEvent.changeText(passwordInput, 'AaBbCc*?*?');
    //     fireEvent.press(loginButton);

    //     await waitFor(() => {
    //         expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor, agrega un email');

    //     });
    // });
    // it('shows alerts when only password is empty', async () => {
    //     const { getByPlaceholderText, getAllByText } = render(<Index />);

    //     const emailInput = getByPlaceholderText('ejemplo@correo.com');
    //     const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
    //     const loginButton = getAllByText('Registrarse')[0];

    //     fireEvent.changeText(emailInput, 'jaguilar57@ucol.mx');
    //     fireEvent.changeText(passwordInput, '');
    //     fireEvent.press(loginButton);

    //     await waitFor(() => {
    //         expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor, agrega una contraseña');
    //     });
    // });
    // it('has correct keyboard type for email field', async () => {
    //     const { getByPlaceholderText } = render(<Index />);
    //     const emailInput = getByPlaceholderText('ejemplo@correo.com')
    //     expect(emailInput.props.keyboardType).toBe('email-address');
    // });
    // it('has secure text entry for password field', () => {
    //     const { getByPlaceholderText } = render(<Index />);
    //     const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
    //     expect(passwordInput.props.secureTextEntry).toBe(true);

    // });
});

// describe('Email Validation', () => {
//     it('accepts valid email formats', async () => {
//         const { getByPlaceholderText, getAllByText } = render(<Index />);

//         const emailInput = getByPlaceholderText('ejemplo@correo.com');
//         const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
//         const loginButton = getAllByText('Registrarse')[0];

//         fireEvent.changeText(emailInput, 'jaguilar57@gmail.com');
//         fireEvent.changeText(passwordInput, 'AaBbCc*?*?1');
//         fireEvent.press(loginButton);

//         await waitFor(() => {
//             expect(Alert.alert).toHaveBeenCalledWith('¡Éxito!', 'Inicio de sesión exitoso.\nCorreo: jaguilar57@gmail.com',
//                 [
//                     {
//                         text: 'OK',
//                         onPress: expect.any(Function)
//                     }
//                 ]
//             );
//         });
//     });
//     it('rejects invalid email formats', async () => {
//         const { getByPlaceholderText, getAllByText } = render(<Index />);

//         const emailInput = getByPlaceholderText('ejemplo@correo.com');
//         const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
//         const loginButton = getAllByText('Registrarse')[0];

//         fireEvent.changeText(emailInput, 'invalidemail');
//         fireEvent.changeText(passwordInput, 'AaBbCc*?*?1');
//         fireEvent.press(loginButton);

//         await waitFor(() => {
//             expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor, ingresa un correo electrónico válido');

//         });
//     });
// });

// describe('Password Validation', () => {
//     it('accepts valid passwords', async () => {
//         const { getByPlaceholderText, getAllByText } = render(<Index />);

//         const emailInput = getByPlaceholderText('ejemplo@correo.com');
//         const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
//         const loginButton = getAllByText('Registrarse')[0];

//         fireEvent.changeText(emailInput, 'jaguilar57@gmail.com');
//         fireEvent.changeText(passwordInput, 'AaBbCc*?*?1');
//         fireEvent.press(loginButton);

//         await waitFor(() => {
//             expect(Alert.alert).toHaveBeenCalledWith('¡Éxito!', 'Inicio de sesión exitoso.\nCorreo: jaguilar57@gmail.com',
//                 [
//                     {
//                         text: 'OK',
//                         onPress: expect.any(Function)
//                     }
//                 ]
//             );
//         });
//     });
//     it('rejects invalid passwords without uppercase', async () => {
//         const { getByPlaceholderText, getByText } = render(<Index />);

//         const emailInput = getByPlaceholderText('ejemplo@correo.com');
//         const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
//         const loginButton = getByText('Registrarse');

//         fireEvent.changeText(emailInput, 'jaguilar57@gmail.com');
//         fireEvent.changeText(passwordInput, 'aabbcc*?*?1');
//         fireEvent.press(loginButton);

//         await waitFor(() => {
//             expect(Alert.alert).toHaveBeenCalledWith('Error en Contraseña', 'La contraseña debe contener:\n• una letra mayúscula');
//         });
//     });
//     it('rejects invalid passwords without lowercase', async () => {
//         const { getByPlaceholderText, getAllByText } = render(<Index />);

//         const emailInput = getByPlaceholderText('ejemplo@correo.com');
//         const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
//         const loginButton = getAllByText('Registrarse')[0];

//         fireEvent.changeText(emailInput, 'jaguilar57@gmail.com');
//         fireEvent.changeText(passwordInput, 'AABBCC*?*?1');
//         fireEvent.press(loginButton);

//         await waitFor(() => {
//             expect(Alert.alert).toHaveBeenCalledWith('Error en Contraseña', 'La contraseña debe contener:\n• una letra minúscula');

//         });
//     });
//     it('rejects invalid passwords without special characters', async () => {
//         const { getByPlaceholderText, getAllByText } = render(<Index />);

//         const emailInput = getByPlaceholderText('ejemplo@correo.com');
//         const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
//         const loginButton = getAllByText('Registrarse')[0];

//         fireEvent.changeText(emailInput, 'jaguilar57@gmail.com');
//         fireEvent.changeText(passwordInput, 'aabbccABC1');
//         fireEvent.press(loginButton);

//         await waitFor(() => {
//             expect(Alert.alert).toHaveBeenCalledWith('Error en Contraseña', 'La contraseña debe contener:\n• un carácter especial (@, (, !, ), %, *, ?, &)');

//         });
//     });
//     it('rejects invalid passwords shorter than 8 characters', async () => {
//         const { getByPlaceholderText, getAllByText } = render(<Index />);

//         const emailInput = getByPlaceholderText('ejemplo@correo.com');
//         const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
//         const loginButton = getAllByText('Registrarse')[0];

//         fireEvent.changeText(emailInput, 'jaguilar57@gmail.com');
//         fireEvent.changeText(passwordInput, 'AbCaB1?');
//         fireEvent.press(loginButton);

//         await waitFor(() => {
//             expect(Alert.alert).toHaveBeenCalledWith('Error en Contraseña', 'La contraseña debe contener:\n• una longitud de al menos 8 caracteres');

//         });
//     });
//     it('rejects invalid passwords without number', async () => {
//         const { getByPlaceholderText, getAllByText } = render(<Index />);

//         const emailInput = getByPlaceholderText('ejemplo@correo.com');
//         const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
//         const loginButton = getAllByText('Registrarse')[0];

//         fireEvent.changeText(emailInput, 'jaguilar57@gmail.com');
//         fireEvent.changeText(passwordInput, 'AaBbCc*?*?');
//         fireEvent.press(loginButton);

//         await waitFor(() => {
//             expect(Alert.alert).toHaveBeenCalledWith('Error en Contraseña', 'La contraseña debe contener:\n• un numero (0-9)');

//         });
//     });
//     it('rejects invalid passwords with only numbers and special characters', async () => {
//         const { getByPlaceholderText, getAllByText } = render(<Index />);

//         const emailInput = getByPlaceholderText('ejemplo@correo.com');
//         const passwordInput = getByPlaceholderText('Ex4mpl3pa55');
//         const loginButton = getAllByText('Registrarse')[0];

//         fireEvent.changeText(emailInput, 'jaguilar57@gmail.com');
//         fireEvent.changeText(passwordInput, '234*?*?1');
//         fireEvent.press(loginButton);

//         await waitFor(() => {
//             expect(Alert.alert).toHaveBeenCalledWith('Error en Contraseña', 'La contraseña debe contener:\n• una letra minúscula\n• una letra mayúscula');

//         });
//     });
//     it('navigates to register screen on register button press', async () => {
//         const { getByText } = render(<Index />);
//         const registerButton = getByText('Registro');

//         fireEvent.press(registerButton);

//         await waitFor(() => {
//             expect(mockPush).toHaveBeenCalledWith({
//                 pathname: '/register',
//             });
//         });
//     });
// });
