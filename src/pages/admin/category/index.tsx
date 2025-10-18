import DasboardLayout from "@/components/layouts/DasboardLayout";
import Category from "@/components/views/Admin/Category";

const AdminCategoryPage = () => {
  return (
    <DasboardLayout
      title="Category"
      type="admin"
      desc="List of all Categories, create new category, adn manage existing categories"
    >
      <Category />
    </DasboardLayout>
  );
};

export default AdminCategoryPage;
