const AgreementTypeStep = ({ formData, onDataChange, subType }) => {
  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  return (
    <div className="agreement-type-step">
      <h4 className="title fz17 mb30">Preferred Agreement Type</h4>

      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">
            What makes your property unique *
          </label>
          <textarea
            className="form-control filterInput"
            rows="4"
            placeholder="Describe what makes your property unique (50-5000 characters)"
            value={formData.propertyUnique || ""}
            onChange={(e) =>
              handleInputChange("propertyUnique", e.target.value)
            }
            minLength={50}
            maxLength={5000}
          ></textarea>
          <small className="text-muted">
            {formData.propertyUnique?.length || 0}/5000 characters
          </small>
        </div>
      </div>
    </div>
  );
};

export default AgreementTypeStep;
