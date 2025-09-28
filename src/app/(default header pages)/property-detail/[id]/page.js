// "use client";

import PropertyInfo from "@/components/PropertyInfo/PropertyInfo";

export const metadata = {
  title: "Property Single V1 || Settle Wise - Real Estate NextJS Template",
};

const PropertyDetailPage = async (props) => {
  const params = await props.params;
  return <PropertyInfo id={params?.id} />;
};

export default PropertyDetailPage;
