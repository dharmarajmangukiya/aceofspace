"use client";

const ListingStatus = ({ filterFunctions }) => {
  const options = [
    { id: "rent", label: "Rent", defaultChecked: true },
    { id: "lease", label: "Lease" },
  ];

  return (
    <>
      {options.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
        >
          <input
            className="form-check-input"
            type="radio"
            checked={filterFunctions?.listingStatus == option.id}
            onChange={() => filterFunctions.handlelistingStatus(option.id)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingStatus;
