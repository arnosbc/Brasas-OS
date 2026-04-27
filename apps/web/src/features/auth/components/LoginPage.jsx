import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Input,
  Button,
  Form,
  Alert,
  Checkbox,
} from "@heroui/react";
import { 
  FaFire, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaChartBar, 
  FaUsers, 
  FaBox, 
  FaGoogle, 
  FaArrowRight,
  FaConciergeBell
} from "react-icons/fa";
import { useAuthStore } from "../stores/useAuthStore";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      // Error manejado por el store
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[700px]">
        
        {/* Panel Izquierdo */}
        <div className="hidden lg:flex lg:w-1/2 relative p-12 text-white flex-col justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop")' }}
          />
          <div className="absolute inset-0 bg-orange-600/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/60 to-orange-900/95" />

          <div className="relative z-10 flex flex-col items-center text-center mt-8">
            <div className="w-24 h-24 border-3 border-white rounded-full flex items-center justify-center mb-6 shadow-lg">
              <FaFire className="text-5xl" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Brasas OS</h1>
            <p className="text-lg text-white/90 mb-12 max-w-sm">
              Administra tu restaurante de manera fácil y eficiente
            </p>

            <div className="space-y-8 text-left w-full max-w-sm">
              <FeatureItem icon={<FaChartBar />} title="Control total" desc="Ventas, productos y reportes" />
              <FeatureItem icon={<FaUsers />} title="Gestión de personal" desc="Roles y permisos" />
              <FeatureItem icon={<FaBox />} title="Inventario inteligente" desc="Control de stock y proveedores" />
            </div>
          </div>
        </div>

        {/* Panel Derecho */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white relative">
          
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-4">
              <FaConciergeBell className="text-3xl" />
            </div>
            <h2 className="text-4xl font-bold text-orange-600 mb-2">¡Bienvenido!</h2>
            <p className="text-gray-500">Inicia sesión para continuar</p>
          </div>

          {error && (
            <Alert color="danger" variant="flat" className="mb-6">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md mx-auto">
            <Input
              label="Correo electrónico"
              labelPlacement="outside"
              type="email"
              placeholder="ejemplo@restaurante.com"
              value={email}
              onValueChange={setEmail}
              isRequired
              variant="bordered"
              size="lg"
              startContent={<FaEnvelope className="text-gray-400 mr-2 text-sm" />}
              classNames={{ label: "font-semibold text-gray-700" }}
            />

            <Input
              label="Contraseña"
              labelPlacement="outside"
              type={isVisible ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              value={password}
              onValueChange={setPassword}
              isRequired
              variant="bordered"
              size="lg"
              startContent={<FaLock className="text-gray-400 mr-2 text-sm" />}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <FaEyeSlash className="text-xl text-gray-400" />
                  ) : (
                    <FaEye className="text-xl text-gray-400" />
                  )}
                </button>
              }
              classNames={{ label: "font-semibold text-gray-700" }}
            />

            <div className="flex justify-between items-center w-full mt-2">
              <Checkbox size="sm" color="warning">
                Recordarme
              </Checkbox>
              <Link to="#" className="text-sm text-orange-600 hover:underline font-medium">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full font-bold bg-[#ea580c] text-white shadow-md hover:bg-orange-700"
              isLoading={isLoading}
              endContent={!isLoading && <FaArrowRight />}
            >
              Iniciar sesión
            </Button>
          </Form>

          {/* Separador */}
          <div className="flex items-center gap-4 my-8 max-w-md mx-auto w-full">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400 font-medium">o continúa con</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Button
            variant="bordered"
            size="lg"
            className="w-full max-w-md mx-auto font-semibold text-gray-600 border-gray-300"
            startContent={<FaGoogle className="text-red-500 mr-2" />}
          >
            Continuar con Google
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-orange-600 hover:underline font-semibold">
              Regístrate
            </Link>
          </p>

          <footer className="absolute bottom-6 w-full left-0 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} <span className="text-orange-600 font-medium">Brasas OS</span>.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para las características del panel izquierdo
const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-lg leading-tight">{title}</h3>
      <p className="text-sm text-white/80">{desc}</p>
    </div>
  </div>
);