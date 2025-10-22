"use client";

import Loader from "./Loader";

/**
 * CommonTable Component
 *
 * A reusable table component with support for sticky columns
 *
 * @param {Array} columns - Array of column definitions
 *   Example: [
 *     {
 *       key: 'name',
 *       header: 'Name',
 *       render: (row) => <div>{row.name}</div>,
 *       className: 'custom-class' // optional
 *     }
 *   ]
 * @param {Array} data - Array of data rows
 * @param {number} stickyFirstColumns - Number of columns to stick on the left (default: 0)
 * @param {number} stickyLastColumns - Number of columns to stick on the right (default: 0)
 * @param {string} className - Additional table className
 * @param {boolean} isLoading - Loading state
 * @param {string} emptyMessage - Message to show when no data
 */
const CommonTable = ({
  columns = [],
  data = [],
  stickyFirstColumns = 0,
  stickyLastColumns = 0,
  className = "",
  isLoading = false,
  emptyMessage = "No data available",
}) => {
  const getStickyStyle = (index, isHeader = false) => {
    const totalColumns = columns.length;
    let style = {};

    // Sticky left columns
    if (stickyFirstColumns > 0 && index < stickyFirstColumns) {
      let leftOffset = 0;
      for (let i = 0; i < index; i++) {
        const prevColWidth = columns[i].width || 0;
        leftOffset += prevColWidth;
      }

      style = {
        position: "sticky",
        left: leftOffset > 0 ? `${leftOffset}px` : 0,
        zIndex: isHeader ? 9 : 8,
        backgroundColor: "white",
        boxShadow:
          index === stickyFirstColumns - 1
            ? "2px 0 5px -2px rgba(0, 0, 0, 0.1)"
            : "none",
      };
    }

    // Sticky right columns
    if (stickyLastColumns > 0 && index >= totalColumns - stickyLastColumns) {
      let rightOffset = 0;
      for (let i = totalColumns - 1; i > index; i--) {
        const nextColWidth = columns[i].width || 0;
        rightOffset += nextColWidth;
      }

      style = {
        position: "sticky",
        right: rightOffset > 0 ? `${rightOffset}px` : 0,
        zIndex: isHeader ? 9 : 8,
        backgroundColor: "white",
        boxShadow:
          index === totalColumns - stickyLastColumns
            ? "-2px 0 5px -2px rgba(0, 0, 0, 0.1)"
            : "none",
      };
    }

    return style;
  };

  const getColumnStyle = (column, index) => {
    const stickyStyle = getStickyStyle(index);
    const widthStyle = column.width
      ? { width: `${column.width}px`, minWidth: `${column.width}px` }
      : {};
    const backgroundColor = stickyStyle.backgroundColor || "white";

    return { ...stickyStyle, ...widthStyle, backgroundColor };
  };

  if (isLoading) {
    return <Loader />;
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-0">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table
        className={`table-style3 table at-savesearch ${className}`}
        style={{ backgroundColor: "white" }}
      >
        <thead className="t-head">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                scope="col"
                className={column.headerClassName || ""}
                style={{
                  ...getColumnStyle(column, index),
                  backgroundColor: "white",
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="t-body">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((column, colIndex) => {
                const CellTag = colIndex === 0 ? "th" : "td";
                const cellProps = colIndex === 0 ? { scope: "row" } : {};

                return (
                  <CellTag
                    key={column.key}
                    {...cellProps}
                    className={`vam ${column.className || ""}`}
                    style={{
                      ...getColumnStyle(column, colIndex),
                      backgroundColor: "white",
                    }}
                  >
                    {column.render
                      ? column.render(row, rowIndex)
                      : row[column.key]}
                  </CellTag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
