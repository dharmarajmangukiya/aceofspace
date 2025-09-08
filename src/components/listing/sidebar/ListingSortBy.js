"use client";

const ListingSortBy = ({ setCurrentSortingOption, currentSortingOption }) => {
  const options = [
    { id: "flexRadioDefault1", label: "Newest", defaultChecked: true },
    { id: "flexRadioDefault2", label: "Best match" },
    { id: "flexRadioDefault3", label: "Price low" },
    { id: "flexRadioDefault4", label: "Price high" },
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
            checked={currentSortingOption == option.label}
            onChange={() => setCurrentSortingOption(option.label)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingSortBy;
