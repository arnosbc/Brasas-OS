import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Form,
  Alert,
} from "@heroui/react";
import { FaFire } from "react-icons/fa";
import { useAuthStore } from "../stores/useAuthStore";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (password !== confirmPassword) {
      useAuthStore.setState({ error: "Las contraseñas no coinciden" });
      return;
    }

    try {
      await register(nombre, email, password);
      navigate("/");
    } catch {
      // Error manejado por el store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-red-900 to-amber-900 p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <FaFire className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Crear Cuenta</h1>
            <p className="text-gray-500 mt-1">Regístrate en Brasas OS</p>
          </div>

          {error && (
            <Alert color="danger" variant="flat" className="mb-6">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nombre completo"
              type="text"
              placeholder="Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              isRequired
              variant="bordered"
            />

            <Input
              label="Correo electrónico"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
              variant="bordered"
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
              variant="bordered"
            />

            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isRequired
              variant="bordered"
            />

            <Button
              type="submit"
              color="danger"
              size="lg"
              className="w-full font-semibold"
              isLoading={isLoading}
            >
              Crear cuenta
            </Button>
          </Form>

          <p className="text-center mt-6 text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-orange-600 hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
      </Card>
    </div>
  );
};