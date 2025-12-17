import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  const API_USUARIOS = "https://68f69bb06b852b1d6f173af8.mockapi.io/api/usuarios";

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const emailGuardado = localStorage.getItem("authEmail");
    if (token) {
      const username = token.replace("fake-token-", "");
      setUsuario({
        nombre: username,
        email: emailGuardado || "",
      });
    }

    setCargando(false);
  }, []);

  // Registrar usuario
const registrarUsuario = async (nuevoUsuario) => {
  const response = await fetch(API_USUARIOS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...nuevoUsuario,
      rol: "user",
    }),
  });

  if (!response.ok) {
    throw new Error("Error al registrar usuario");
  }

  return await response.json();
};


  // Función para iniciar sesión
  const iniciarSesion = (username, emailIngresado) => {
    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token);
    localStorage.setItem("authEmail", emailIngresado);

    setUsuario({
      nombre: username,
      email: emailIngresado || "",
    });
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authEmail");
    setUsuario(null);
  };

  const value = {
    usuario,
    registrarUsuario,
    iniciarSesion,
    cerrarSesion,
    isAuthenticated: !!usuario, // ← Propiedad computada
    esAdmin: usuario?.nombre === 'admin',  
    cargando, 

  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
}