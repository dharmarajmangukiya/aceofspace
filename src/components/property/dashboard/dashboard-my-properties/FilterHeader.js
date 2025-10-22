const FilterHeader = ({
  onSearchTermChange,
  searchTerm = "",
  sortValue = "",
  onSortChange,
  isLoading = false,
}) => {
  const handleSearchTermChange = (value) => {
    onSearchTermChange?.(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    onSortChange?.(value);
  };

  return (
    <div className="dashboard_search_meta d-md-flex align-items-center justify-content-xxl-end">
      <div className="item1 mb15-sm">
        <div className="search_area">
          <input
            type="text"
            className="form-control bdrs12"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            required
          />
          <label style={{ cursor: "pointer" }}>
            <i
              className={
                isLoading ? "fas fa-spinner fa-spin" : "flaticon-search"
              }
            />
          </label>
        </div>
      </div>
      {/* End item1 */}

      <div className="page_control_shorting bdr1 bdrs12 py-2 ps-3 pe-2 mx-1 mx-xxl-3 bgc-white mb15-sm maxw160">
        <div className="pcs_dropdown d-flex align-items-center">
          <span style={{ minWidth: "50px" }} className="title-color">
            Sort by:
          </span>
          <select
            className="form-select show-tick"
            value={sortValue}
            onChange={handleSortChange}
          >
            <option value="">Select Sort</option>
            <option value="price_low_high">Price Low to High</option>
            <option value="price_high_low">Price High to Low</option>
            <option value="date_new_old">Date New to Old</option>
            <option value="date_old_new">Date Old to New</option>
            <option value="name_a_z">Name A to Z</option>
            <option value="name_z_a">Name Z to A</option>
          </select>
        </div>
      </div>
      <a href="#" className="ud-btn btn-thm">
        Add New Property
        <i className="fal fa-arrow-right-long" />
      </a>
    </div>
  );
};

export default FilterHeader;
