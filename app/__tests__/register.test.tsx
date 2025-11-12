import * as React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native'; // <-- Asegúrate de tener esta importación
import { Alert } from "react-native";
import Index from '../register';
import { useRouter } from 'expo-router';

// Mock para Alert
jest.spyOn(Alert, 'alert');

// Mock para expo-router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  })
}));

describe('Index (Register Screen)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(<Index />);
    
    expect(screen.getByPlaceholderText('ejemplo@correo.com')).toBeTruthy();
    expect(screen.getByPlaceholderText('Usuario234')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ex4mpl3pa55')).toBeTruthy();
    expect(screen.getByPlaceholderText('repite: Ex4mpl3pa55')).toBeTruthy();
    expect(screen.getByText('Registrarse')).toBeTruthy();
  });

  it('shows alert when any field is empty', async () => {
    render(<Index />);

    const registerButton = screen.getByText('Registrarse');
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor, llena todos los campos');
    });
  });

  it('validates email format correctly', async () => {
    render(<Index />);

    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
    const userNameInput = screen.getByPlaceholderText('Usuario234');
    const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
    const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
    const registerButton = screen.getByText('Registrarse');

    // Fill form with invalid email
    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.changeText(userNameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'ValidPass1!');
    fireEvent.changeText(repeatPasswordInput, 'ValidPass1!');
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor, ingresa un correo electrónico válido');
    });
  });

  it('validates password strength requirements', async () => {
    render(<Index />);

    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
    const userNameInput = screen.getByPlaceholderText('Usuario234');
    const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
    const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
    const registerButton = screen.getByText('Registrarse');

    // Fill form with weak password
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(userNameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'weak');
    fireEvent.changeText(repeatPasswordInput, 'weak');
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error en Contraseña', 
        expect.stringContaining('La contraseña debe contener:')
      );
    });
  });

  it('shows error when passwords do not match', async () => {
    render(<Index />);

    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
    const userNameInput = screen.getByPlaceholderText('Usuario234');
    const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
    const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
    const registerButton = screen.getByText('Registrarse');

    // Fill form with mismatched passwords
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(userNameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'ValidPass1!');
    fireEvent.changeText(repeatPasswordInput, 'DifferentPass1!');
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Contraseña', 'Las contraseña no coincide');
    });
  });

  it('successfully registers with valid data', async () => {
    render(<Index />);

    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
    const userNameInput = screen.getByPlaceholderText('Usuario234');
    const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
    const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
    const registerButton = screen.getByText('Registrarse');

    // Fill form with valid data
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(userNameInput, 'testuser123');
    fireEvent.changeText(passwordInput, 'ValidPass1!');
    fireEvent.changeText(repeatPasswordInput, 'ValidPass1!');
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        '¡Éxito!',
        'Inicio de sesión exitoso.\nCorreo: test@example.com',
        [
          {
            text: 'OK',
            onPress: expect.any(Function)
          }
        ]
      );
    });
  });

  it('has correct input properties', () => {
    render(<Index />);
    
    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
    const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
    const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
    const userNameInput = screen.getByPlaceholderText('Usuario234');

    // Email input properties
    expect(emailInput.props.keyboardType).toBe('email-address');
    expect(emailInput.props.autoCapitalize).toBe('none');

    // Password input properties
    expect(passwordInput.props.secureTextEntry).toBe(true);
    expect(passwordInput.props.autoCapitalize).toBe('none');

    // Repeat password input properties
    expect(repeatPasswordInput.props.secureTextEntry).toBe(true);
    expect(repeatPasswordInput.props.autoCapitalize).toBe('none');

    // Username input properties
    expect(userNameInput.props.autoCapitalize).toBe('none');
  });

  describe('Password Validation Edge Cases', () => {
    it('rejects password without lowercase', async () => {
      render(<Index />);

      const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
      const userNameInput = screen.getByPlaceholderText('Usuario234');
      const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
      const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
      const registerButton = screen.getByText('Registrarse');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(userNameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'VALIDPASS1!');
      fireEvent.changeText(repeatPasswordInput, 'VALIDPASS1!');
      fireEvent.press(registerButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Error en Contraseña',
          expect.stringContaining('una letra minúscula')
        );
      });
    });

    it('rejects password without uppercase', async () => {
      render(<Index />);

      const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
      const userNameInput = screen.getByPlaceholderText('Usuario234');
      const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
      const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
      const registerButton = screen.getByText('Registrarse');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(userNameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'validpass1!');
      fireEvent.changeText(repeatPasswordInput, 'validpass1!');
      fireEvent.press(registerButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Error en Contraseña',
          expect.stringContaining('una letra mayúscula')
        );
      });
    });

    it('rejects password without special character', async () => {
      render(<Index />);

      const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
      const userNameInput = screen.getByPlaceholderText('Usuario234');
      const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
      const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
      const registerButton = screen.getByText('Registrarse');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(userNameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'ValidPass123');
      fireEvent.changeText(repeatPasswordInput, 'ValidPass123');
      fireEvent.press(registerButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Error en Contraseña',
          expect.stringContaining('carácter especial')
        );
      });
    });

    it('rejects password shorter than 8 characters', async () => {
      render(<Index />);

      const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
      const userNameInput = screen.getByPlaceholderText('Usuario234');
      const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
      const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
      const registerButton = screen.getByText('Registrarse');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(userNameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'Val1!');
      fireEvent.changeText(repeatPasswordInput, 'Val1!');
      fireEvent.press(registerButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Error en Contraseña',
          expect.stringContaining('longitud de al menos 8 caracteres')
        );
      });
    });
  });

  describe('Form State Management', () => {
    it('updates email state correctly', () => {
      render(<Index />);
      
      const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
      fireEvent.changeText(emailInput, 'new@example.com');
      
      expect(emailInput.props.value).toBe('new@example.com');
    });

    it('updates username state correctly', () => {
      render(<Index />);
      
      const userNameInput = screen.getByPlaceholderText('Usuario234');
      fireEvent.changeText(userNameInput, 'newuser');
      
      expect(userNameInput.props.value).toBe('newuser');
    });

    it('updates password state correctly', () => {
      render(<Index />);
      
      const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
      fireEvent.changeText(passwordInput, 'newpassword');
      
      expect(passwordInput.props.value).toBe('newpassword');
    });

    it('updates repeat password state correctly', () => {
      render(<Index />);
      
      const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
      fireEvent.changeText(repeatPasswordInput, 'repeatedpassword');
      
      expect(repeatPasswordInput.props.value).toBe('repeatedpassword');
    });
  });
});

// Tests adicionales - AQUÍ ESTÁ LA CORRECCIÓN
describe('Additional Register Tests', () => {
  // Asegúrate de que estas funciones estén disponibles en este scope
  it('handles multiple validation errors in password', async () => {
    render(<Index />); // <-- Ahora render está definido

    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
    const userNameInput = screen.getByPlaceholderText('Usuario234');
    const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
    const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
    const registerButton = screen.getByText('Registrarse');

    // Password without uppercase, lowercase, and too short
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(userNameInput, 'testuser');
    fireEvent.changeText(passwordInput, '123!');
    fireEvent.changeText(repeatPasswordInput, '123!');
    fireEvent.press(registerButton);

    await waitFor(() => {
      const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
      const errorMessage = alertCall[1];
      
      expect(errorMessage).toContain('una letra minúscula');
      expect(errorMessage).toContain('una letra mayúscula');
      expect(errorMessage).toContain('longitud de al menos 8 caracteres');
    });
  });

  it('accepts various valid email formats', async () => {
    render(<Index />); // <-- Ahora render está definido

    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
    const userNameInput = screen.getByPlaceholderText('Usuario234');
    const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
    const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
    const registerButton = screen.getByText('Registrarse');

    const validEmails = [
      'user.name@domain.com',
      'user+tag@domain.co.uk',
      'user@sub.domain.com'
    ];

    for (const validEmail of validEmails) {
      jest.clearAllMocks();
      
      fireEvent.changeText(emailInput, validEmail);
      fireEvent.changeText(userNameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'ValidPass1!');
      fireEvent.changeText(repeatPasswordInput, 'ValidPass1!');
      fireEvent.press(registerButton);

    await waitFor(() => {
      // Verifica que se llamó a Alert.alert con los argumentos correctos
      expect(Alert.alert).toHaveBeenCalledWith(
        '¡Éxito!',
        `Inicio de sesión exitoso.\nCorreo: ${validEmail}`,
        [
          {
            text: 'OK',
            onPress: expect.any(Function)
          }
        ]
      );
    });
  }
});

  it('rejects various invalid email formats', async () => {
    render(<Index />); // <-- Ahora render está definido

    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
    const userNameInput = screen.getByPlaceholderText('Usuario234');
    const passwordInput = screen.getByPlaceholderText('Ex4mpl3pa55');
    const repeatPasswordInput = screen.getByPlaceholderText('repite: Ex4mpl3pa55');
    const registerButton = screen.getByText('Registrarse');

    const invalidEmails = [
      'invalid',
      'invalid@',
      '@domain.com',
      'invalid@domain',
      'invalid@.com'
    ];

    for (const invalidEmail of invalidEmails) {
      jest.clearAllMocks();
      
      fireEvent.changeText(emailInput, invalidEmail);
      fireEvent.changeText(userNameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'ValidPass1!');
      fireEvent.changeText(repeatPasswordInput, 'ValidPass1!');
      fireEvent.press(registerButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Error', 
          'Por favor, ingresa un correo electrónico válido'
        );
      });
    }
  });
});