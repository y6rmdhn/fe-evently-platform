import AuthLayouts from "@/components/layouts/AuthLayout";
import Register from "@/components/views/Auth/Register";

const RegisterPage = () => {
  return (
    <AuthLayouts title="Evently | Register">
      <Register />
    </AuthLayouts>
  );
};

export default RegisterPage;
