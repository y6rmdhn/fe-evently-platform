import AuthLayouts from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Auth/Login";

const LoginPage = () => {
  return (
    <AuthLayouts title="Evently | Login">
      <Login />
    </AuthLayouts>
  );
};

export default LoginPage;
