import "@mdxeditor/editor/style.css";
import React from "react";
import CommercialAmenities from "./Amenities";
import CommercialFacilities from "./Facility";

// Editor wrapper component to handle the dynamic imports properly
const EditorWrapper = ({ value, onChange, placeholder }) => {
  const [Editor, setEditor] = React.useState(null);

  React.useEffect(() => {
    const loadEditor = async () => {
      try {
        const mod = await import("@mdxeditor/editor");
        setEditor({
          MDXEditor: mod.MDXEditor,
          listsPlugin: mod.listsPlugin,
          markdownShortcutPlugin: mod.markdownShortcutPlugin,
          toolbarPlugin: mod.toolbarPlugin,
          UndoRedo: mod.UndoRedo,
          BoldItalicUnderlineToggles: mod.BoldItalicUnderlineToggles,
          ListsToggle: mod.ListsToggle,
          headingsPlugin: mod.headingsPlugin,
        });
      } catch (error) {
        console.error("Failed to load MDX Editor:", error);
      }
    };

    loadEditor();
  }, []);

  if (!Editor) {
    return (
      <div
        className="p-3 border rounded bg-light d-flex align-items-center justify-content-center"
        style={{ minHeight: "200px" }}
      >
        <div className="text-center">
          <div
            className="spinner-border spinner-border-sm text-primary mb-2"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>Loading editor...</div>
        </div>
      </div>
    );
  }

  const {
    MDXEditor: MDXEditorComponent,
    listsPlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    ListsToggle,
    headingsPlugin,
  } = Editor;

  return (
    <MDXEditorComponent
      key="mdx-editor" // Add key to prevent re-mounting issues
      markdown={value || ""}
      onChange={onChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <UndoRedo />
              <div
                style={{
                  width: "1px",
                  height: "24px",
                  backgroundColor: "#dee2e6",
                  margin: "0 4px",
                }}
              />
              <BoldItalicUnderlineToggles />
              <div
                style={{
                  width: "1px",
                  height: "24px",
                  backgroundColor: "#dee2e6",
                  margin: "0 4px",
                }}
              />
              <ListsToggle />
            </div>
          ),
        }),
      ]}
      // contentEditableClassName="prose max-w-none"
      placeholder={placeholder || "Start writing..."}
    />
  );
};

const PricingDetailsStep = ({
  formData,
  onDataChange,
  subType,
  errors,
  touched,
}) => {
  const isShowroom = subType === "Showroom";
  const [description, setDescription] = React.useState(
    formData.propertyDescription || ""
  );
  const [isMounted, setIsMounted] = React.useState(false);

  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const handleDescriptionChange = (markdown) => {
    setDescription(markdown);
    handleInputChange("description", markdown);
  };

  // Sync description state when formData changes
  React.useEffect(() => {
    if (formData.propertyDescription !== description) {
      setDescription(formData.propertyDescription || "");
    }
  }, [formData.propertyDescription]);

  // Handle mounting for client-side only rendering
  React.useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Function to count characters (excluding markdown syntax)
  const getCharacterCount = (text) => {
    return text.replace(/[#*`_~\[\]()]/g, "").length;
  };

  const characterCount = getCharacterCount(description);

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;
  };

  return (
    <div className="pricing-details-step">
      <h4 className="title fz17 mb30">Add Pricing & Details</h4>

      {/* Ownership */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="mb-3">Ownership *</h5>
        </div>
        <div className="col-md-12 mb-3">
          <div className="form-style2 input-group">
            {["Freehold", "Leasehold", "Power of attorney"].map((option) => (
              <div className="selection" key={`ownership-${option}`}>
                <input
                  id={`ownership-${option}`}
                  type="radio"
                  name="ownershipType"
                  value={option}
                  checked={formData.ownershipType === option}
                  onChange={(e) =>
                    handleInputChange("ownershipType", e.target.value)
                  }
                />
                <label htmlFor={`ownership-${option}`}>{option}</label>
              </div>
            ))}
          </div>
          {getFieldError("ownershipType") && (
            <div className="text-danger">{getFieldError("ownershipType")}</div>
          )}
        </div>
      </div>

      {/* Price Details */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="mb-3">Price Details</h5>
        </div>

        {isShowroom ? (
          <div className="col-md-6 mb-3">
            <label className="form-label">Booking amount *</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control filterInput"
                placeholder="Enter booking amount"
                value={formData.bookingAmount || ""}
                onChange={(e) =>
                  handleInputChange("bookingAmount", e.target.value)
                }
              />
              <span className="input-group-text">₹</span>
            </div>
            {getFieldError("bookingAmount") && (
              <div className="text-danger">
                {getFieldError("bookingAmount")}
              </div>
            )}
          </div>
        ) : (
          <div className="col-md-6 mb-3">
            <label className="form-label">Expected Lease Amount *</label>
            <div className="input-group">
              <input
                type="number"
                className={`form-control filterInput ${
                  getFieldError("expectedLeaseAmount") ? "is-invalid" : ""
                }`}
                placeholder="Enter lease amount"
                value={formData.expectedLeaseAmount || ""}
                onChange={(e) =>
                  handleInputChange("expectedLeaseAmount", e.target.value)
                }
              />
              <span className="input-group-text">₹/sq ft</span>
            </div>
            {getFieldError("expectedLeaseAmount") && (
              <div className="text-danger">
                {getFieldError("expectedLeaseAmount")}
              </div>
            )}
          </div>
        )}

        <div className="col-md-6 mb-3">
          <label className="form-label">Additional pricing</label>
          <div className="d-flex flex-wrap gap-3">
            {[
              "Price Negotiable",

              ...(isShowroom
                ? ["Tax and Govt charges excluded"]
                : ["Digi & UPS included", "Electricity & Water excluded"]),
            ].map((option) => (
              <div
                key={option}
                className="form-check d-flex align-items-center gap-2"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`pricing-${option}`}
                  checked={
                    formData.additionalPricing?.includes(option) || false
                  }
                  onChange={(e) => {
                    const currentPricing = formData.additionalPricing || [];
                    const updatedPricing = e.target.checked
                      ? [...currentPricing, option]
                      : currentPricing.filter((p) => p !== option);
                    handleInputChange("additionalPricing", updatedPricing);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`pricing-${option}`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {getFieldError("additionalPricing") && (
            <div className="text-danger">
              {getFieldError("additionalPricing")}
            </div>
          )}
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label className="form-label">Maintenance</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control filterInput"
              placeholder="Enter maintenance "
              value={formData.maintenanceAmount || ""}
              onChange={(e) =>
                handleInputChange("maintenanceAmount", e.target.value)
              }
            />
            <select
              className="form-select filterSelect"
              value={formData.maintenancePeriod || "Monthly"}
              onChange={(e) =>
                handleInputChange("maintenancePeriod", e.target.value)
              }
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annually">Annually</option>
            </select>
            <span className="input-group-text">/unit</span>
          </div>
        </div>

        {!isShowroom && (
          <div className="col-md-6 mb-3">
            <label className="form-label">Security deposit</label>
            <div className="d-flex align-items-center gap-3 mb-2">
              {["Fixed", "Multiple of rent", "None"].map((option) => (
                <div
                  key={option}
                  className="form-check d-flex align-items-center gap-2"
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="securityDeposit"
                    id={`security-${option}`}
                    value={option}
                    checked={formData.securityDeposit === option}
                    onChange={(e) =>
                      handleInputChange("securityDeposit", e.target.value)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`security-${option}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>

            {formData.securityDeposit === "Fixed" && (
              <div className="input-group">
                <input
                  type="number"
                  className="form-control filterInput"
                  placeholder="Enter amount"
                  value={formData.securityDepositAmount || ""}
                  onChange={(e) =>
                    handleInputChange("securityDepositAmount", e.target.value)
                  }
                />
                <span className="input-group-text">₹</span>
              </div>
            )}

            {formData.securityDeposit === "Multiple of rent" && (
              <div className="input-group">
                <input
                  type="number"
                  className="form-control filterInput"
                  placeholder="Enter months"
                  value={formData.securityDepositMonths || ""}
                  onChange={(e) =>
                    handleInputChange("securityDepositMonths", e.target.value)
                  }
                />
                <span className="input-group-text">months</span>
              </div>
            )}
          </div>
        )}
      </div>
      {!isShowroom && (
        <>
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label className="form-label">Lock-in period *</label>
              <div className="input-group">
                <input
                  type="number"
                  className={`form-control filterInput no-spinner ${
                    getFieldError("lockInPeriod") ? "is-invalid" : ""
                  }`}
                  placeholder="Enter lock-in period"
                  value={formData.lockInPeriod || ""}
                  onChange={(e) =>
                    handleInputChange("lockInPeriod", e.target.value)
                  }
                />
                <span className="input-group-text">months</span>
              </div>
              {getFieldError("lockInPeriod") && (
                <div className="text-danger">
                  {getFieldError("lockInPeriod")}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Yearly rent increase</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control filterInput"
                  placeholder="Enter percentage"
                  value={formData.yearlyRentIncrease || ""}
                  onChange={(e) =>
                    handleInputChange("yearlyRentIncrease", e.target.value)
                  }
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <h5 className="mb-3">Is your property fire NOC certified? *</h5>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-style2 input-group">
                {["Yes", "No"].map((option) => (
                  <div className="selection" key={`fireNocCertified-${option}`}>
                    <input
                      id={`fireNocCertified-${option}`}
                      type="radio"
                      name="fireNocCertified"
                      value={option}
                      checked={formData.fireNocCertified === option}
                      onChange={(e) =>
                        handleInputChange("fireNocCertified", e.target.value)
                      }
                    />
                    <label htmlFor={`fireNocCertified-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {getFieldError("fireNocCertified") && (
                <div className="text-danger">
                  {getFieldError("fireNocCertified")}
                </div>
              )}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <h5 className="mb-3">Occupancy Certificate *</h5>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-style2 input-group">
                {["Yes", "No"].map((option) => (
                  <div
                    className="selection"
                    key={`occupancyCertificate-${option}`}
                  >
                    <input
                      id={`occupancyCertificate-${option}`}
                      type="radio"
                      name="occupancyCertificate"
                      value={option}
                      checked={formData.occupancyCertificate === option}
                      onChange={(e) =>
                        handleInputChange(
                          "occupancyCertificate",
                          e.target.value
                        )
                      }
                    />
                    <label htmlFor={`occupancyCertificate-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {getFieldError("occupancyCertificate") && (
                <div className="text-danger">
                  {getFieldError("occupancyCertificate")}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Property Description with MDX Editor */}
      <div className="row mb-4">
        <div className="col-md-12 mb-3">
          <label className="form-label">
            {isShowroom
              ? "What makes your property unique *"
              : "Describe your property *"}
          </label>
          <div className="rich-text-editor" style={{ minHeight: "300px" }}>
            {isMounted ? (
              <EditorWrapper
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Tell a story about your property... Try creating a list with bullet points or numbers!"
              />
            ) : (
              <div
                className="p-3 border rounded bg-light d-flex align-items-center justify-content-center"
                style={{ minHeight: "200px" }}
              >
                <div className="text-center">
                  <div
                    className="spinner-border spinner-border-sm text-primary mb-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div>Loading editor...</div>
                </div>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <small className="text-muted">
              {characterCount}/5000 characters
            </small>
          </div>
          {getFieldError("description") && (
            <div className="text-danger">{getFieldError("description")}</div>
          )}
        </div>
      </div>

      {/* Facilities & Amenities */}
      <div>
        <div className="widget-wrapper mb0">
          <h6 className="list-title mb10">Amenities</h6>
        </div>
        <CommercialAmenities
          selected={formData.amenities}
          onSelectionChange={(value) => handleInputChange("amenities", value)}
        />
      </div>
      <div>
        <div className="widget-wrapper mb0">
          <h6 className="list-title mb10">Facilities</h6>
        </div>
        <CommercialFacilities
          selected={formData.facilities}
          onSelectionChange={(value) => handleInputChange("facilities", value)}
        />
      </div>

      <div className="row mt-3">
        <div className="col-md-12 mb-3">
          <button
            type="button"
            className="ud-btn btn-thm"
            onClick={() => console.log("Preview form:", formData)}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingDetailsStep;
