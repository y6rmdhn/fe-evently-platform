import DasboardLayout from "@/components/layouts/DasboardLayout";
import Event from "@/components/views/Admin/Event";

const AdminEventPage = () => {
  return (
    <DasboardLayout
      title="Event"
      type="admin"
      desc="List of all Events, create new event, and manage existing events."
    >
      <Event />
    </DasboardLayout>
  );
};

export default AdminEventPage;
