"use client";
import CommonTable from "@/components/common/CommonTable";
import { useDeleteProperty } from "@/hooks/api/property";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DeletePropertyModal from "./DeletePropertyModal";

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "pending-style style1";
    case "approved":
    case "published":
      return "pending-style style2";
    case "processing":
    case "rejected":
      return "pending-style style3";
    default:
      return "pending-style style1";
  }
};

const getStatusLabel = (status) => {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const PropertyDataTable = ({ properties = [], isLoading = false }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());

  const { mutate: deleteProperty, isPending: isDeleting } = useDeleteProperty();

  // Cleanup modal on unmount
  useEffect(() => {
    return () => {
      const backdrop = document.getElementById("deletePropertyModalBackdrop");
      if (backdrop) backdrop.remove();
      document.body.classList.remove("modal-open");
    };
  }, []);

  const getPropertyImage = (property) => {
    if (imageErrors.has(property.id)) {
      return "/images/no-image.png";
    }
    if (property.images && property.images.length > 0) {
      return property.images[0];
    }
    return "/images/no-image.png";
  };

  const handleImageError = (propertyId) => {
    setImageErrors((prev) => new Set(prev).add(propertyId));
  };

  const getPropertyTitle = (property) => {
    if (property.apartmentName) return property.apartmentName;
    if (property.buildingName) return property.buildingName;
    return `${property.propertyType || "Property"} in ${property.city || ""}`;
  };

  const getPropertyLocation = (property) => {
    const parts = [property.address, property.city, property.state].filter(
      Boolean
    );
    return parts.join(", ");
  };

  const getPropertyPrice = (property) => {
    if (property.expectedRent) {
      return `₹${property.expectedRent.toLocaleString()}/mo`;
    }
    return "Price not set";
  };

  // const handleEdit = (property) => {
  //   // TODO: Navigate to edit page when ready
  //   router.push(`/dashboard-add-property?id=${property.id}`);
  // };

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    // Trigger Bootstrap modal using data attributes
    const modalElement = document.getElementById("deletePropertyModal");
    if (modalElement) {
      // Try different Bootstrap versions
      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      } else if (window.$ && window.$.fn.modal) {
        // jQuery Bootstrap
        window.$(modalElement).modal("show");
      } else {
        // Fallback: manually trigger modal
        modalElement.classList.add("show");
        modalElement.style.display = "block";
        modalElement.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        // Add backdrop
        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop fade show";
        backdrop.id = "deletePropertyModalBackdrop";
        document.body.appendChild(backdrop);
      }
    }
  };

  const handleDeleteConfirm = (propertyId) => {
    deleteProperty(propertyId, {
      onSuccess: () => {
        toast.success("Property deleted successfully");
        // Close modal
        const modalElement = document.getElementById("deletePropertyModal");
        if (modalElement) {
          // Try different Bootstrap versions
          if (window.bootstrap && window.bootstrap.Modal) {
            const modal = window.bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
          } else if (window.$ && window.$.fn.modal) {
            // jQuery Bootstrap
            window.$(modalElement).modal("hide");
          } else {
            // Fallback: manually close modal
            modalElement.classList.remove("show");
            modalElement.style.display = "none";
            modalElement.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");

            // Remove backdrop
            const backdrop = document.getElementById(
              "deletePropertyModalBackdrop"
            );
            if (backdrop) backdrop.remove();
          }
        }
        // Refetch properties
        queryClient.invalidateQueries({ queryKey: ["myProperties"] });
        setPropertyToDelete(null);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete property"
        );
      },
    });
  };

  const handleView = (property) => {
    router.push(`/property-detail/${property.id}`);
  };

  const columns = [
    {
      key: "listing",
      header: "Listing title",
      width: 400,
      render: (property) => (
        <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
          <div
            className="list-thumb"
            style={{
              width: 94,
              height: 94,
              minWidth: 94,
              minHeight: 94,
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <Image
              width={94}
              height={94}
              style={{
                width: 94,
                height: 94,
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={getPropertyImage(property)}
              alt="property"
              onError={() => handleImageError(property.id)}
            />
          </div>
          <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
            <div className="h6 list-title">
              <Link href={`/property-detail/${property.id}`}>
                {getPropertyTitle(property)}
              </Link>
            </div>
            <p className="list-text mb-0">{getPropertyLocation(property)}</p>
            <div className="list-price">
              <span>{getPropertyPrice(property)}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "datePublished",
      header: "Date Published",
      width: 200,
      render: (property) => property.createdAt || "N/A",
    },
    {
      key: "status",
      header: "Status",
      width: 120,
      render: (property) => (
        <span className={getStatusStyle(property.status)}>
          {getStatusLabel(property.status)}
        </span>
      ),
    },
    {
      key: "view",
      header: "View",
      width: 140,
      render: (property) => (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => handleView(property)}
        >
          <i className="fas fa-eye me-1"></i>
          View
        </button>
      ),
    },
    {
      key: "action",
      header: "Action",
      width: 120,
      render: (property) => (
        <div className="d-flex">
          {/* <button
            className="icon"
            style={{ border: "none" }}
            data-tooltip-id={`edit-${property.id}`}
            onClick={() => handleEdit(property)}
          >
            <span className="fas fa-pen fa" />
          </button> */}
          <button
            className="icon"
            style={{ border: "none" }}
            data-tooltip-id={`delete-${property.id}`}
            onClick={() => handleDeleteClick(property)}
          >
            <span className="flaticon-bin" />
          </button>

          <ReactTooltip id={`edit-${property.id}`} place="top" content="Edit" />
          <ReactTooltip
            id={`delete-${property.id}`}
            place="top"
            content="Delete"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <CommonTable
        columns={columns}
        data={properties}
        isLoading={isLoading}
        emptyMessage="No properties found. Start by adding your first property!"
        stickyLastColumns={1}
      />
      <DeletePropertyModal
        property={propertyToDelete}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default PropertyDataTable;
