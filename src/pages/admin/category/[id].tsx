import DasboardLayout from "@/components/layouts/DasboardLayout";
import DetailCategory from "@/components/views/Admin/Category/DetailCategory";

const AdminDetailCategoryPage = () => {
  return (
    <DasboardLayout
      title="Detail Category"
      type="admin"
      desc="Manage infomation for this category"
    >
      <DetailCategory />
    </DasboardLayout>
  );
};

export default AdminDetailCategoryPage;
