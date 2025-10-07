"use client";
import { useKycList } from "@/hooks/api/admin/kyc";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const KycTable = dynamic(() => import("./KycTable"), {
  ssr: false,
  loading: () => (
    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
      <div className="packages_table table-responsive">
        <table className="table-style3 table at-savesearch">
          <thead className="t-head">
            <tr>
              {[
                "Customer Details",
                "Document Type",
                "Document ID",
                "Submitted Date",
                "Actions",
              ].map((header) => (
                <th key={header} scope="col" style={{ whiteSpace: "nowrap" }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="t-body">
            <tr>
              <td colSpan="5" className="text-center py-4">
                <p className="text-muted mb-0">Loading...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
});

const KycList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const { data: kycList, refetch, isFetching } = useKycList();

  useEffect(() => {
    if (!kycList) {
      setData([]);
      return;
    }
    const filtered =
      kycList?.data?.filter((item) => {
        const user = item.userId || {};
        const email = (user.email || "").toLowerCase();
        const firstName = (user.firstName || "").toLowerCase();
        const lastName = (user.lastName || "").toLowerCase();
        const q = search.toLowerCase();
        return (
          email.includes(q) || firstName.includes(q) || lastName.includes(q)
        );
      }) ?? [];
    setData(filtered);
  }, [search, kycList]);

  return (
    <div>
      {/* Header */}
      <div className="row align-items-center pb40">
        <div className="col">
          <div className="dashboard_title_area">
            <h2>KYC Approval</h2>
            <p className="text">
              Review and approve pending KYC submissions below.
            </p>
          </div>
        </div>
        <div className="col">
          <div className="item1 mb15-sm d-flex align-items-center justify-content-end">
            <div className="search_area">
              <input
                type="text"
                className="form-control bdrs12"
                placeholder="Search"
                required
                style={{ width: "250px", maxWidth: "100%" }}
                value={search}
                onChange={(e) => {
                  const v = e.target.value;
                  setSearch(v);
                }}
              />
              <label>
                <span className="flaticon-search" />
              </label>
            </div>
          </div>
          {/* End item1 */}
        </div>
      </div>

      {/* Table */}
      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
        <div className="packages_table table-responsive">
          <KycTable data={data} refetch={refetch} isFetching={isFetching} />

          {/* <div className="mt30">
                        <Pagination />
                      </div> */}
        </div>
      </div>
    </div>
  );
};

export default KycList;
