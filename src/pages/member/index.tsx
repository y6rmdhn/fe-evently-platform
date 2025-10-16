import DasboardLayout from "@/components/layouts/DasboardLayout";
import Dasboard from "@/components/views/Member/Dasboard";

const DasboardMemberPage = () => {
  return (
    <DasboardLayout title="Dasboard" type="member" desc="Dasboard Member">
      <Dasboard />
    </DasboardLayout>
  );
};

export default DasboardMemberPage;
