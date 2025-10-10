"use client";

const ListingSortBy = ({ setCurrentSortingOption, currentSortingOption }) => {
  const options = [
    { id: "latest", label: "Newest" },
    { id: "bestMatch", label: "Best match" },
    { id: "priceLow", label: "Price low" },
    { id: "priceHigh", label: "Price high" },
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
            checked={currentSortingOption == option.id}
            onChange={() => setCurrentSortingOption(option.id)}
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
