import DasboardLayout from "@/components/layouts/DasboardLayout";
import Dasboard from "@/components/views/Admin/Dasboard";

const AdminDasboardPage = () => {
  return (
    <DasboardLayout title="Dasboard" type="admin" desc="Dasboard Admin">
      <Dasboard />
    </DasboardLayout>
  );
};

export default AdminDasboardPage;
