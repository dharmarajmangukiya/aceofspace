# CommonTable Component

A reusable, dynamic table component with support for sticky columns (first n and last n columns).

## Features

- ✅ Dynamic column configuration
- ✅ Sticky first n columns (left side)
- ✅ Sticky last n columns (right side)
- ✅ Custom cell rendering
- ✅ Loading state
- ✅ Empty state
- ✅ Image fallback support
- ✅ Maintains existing table styling
- ✅ Subtle box shadows on sticky columns

## Usage

### Basic Example

```jsx
import CommonTable from "@/components/common/CommonTable";

const MyTableComponent = ({ data, isLoading }) => {
  const columns = [
    {
      key: "name",
      header: "Name",
      render: (row) => <strong>{row.name}</strong>,
    },
    {
      key: "email",
      header: "Email",
      render: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <span className="badge">{row.status}</span>,
    },
  ];

  return (
    <CommonTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyMessage="No data found"
    />
  );
};
```

### With Sticky Columns

```jsx
// Sticky first column and last 2 columns
<CommonTable
  columns={columns}
  data={data}
  stickyFirstColumns={1}
  stickyLastColumns={2}
/>
```

### Advanced Example (PropertyDataTable)

```jsx
const columns = [
  {
    key: "listing",
    header: "Listing title",
    render: (property) => (
      <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
        <div className="list-thumb">
          <Image
            width={110}
            height={94}
            src={property.image || "/images/no-image.png"}
            onError={(e) => (e.currentTarget.src = "/images/no-image.png")}
            alt="property"
          />
        </div>
        <div className="list-content">
          <h6>{property.title}</h6>
          <p>{property.location}</p>
        </div>
      </div>
    ),
  },
  {
    key: "date",
    header: "Date",
    render: (row) => row.createdAt || "N/A",
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <div className="d-flex gap-2">
        <button onClick={() => handleEdit(row)}>Edit</button>
        <button onClick={() => handleDelete(row)}>Delete</button>
      </div>
    ),
  },
];

<CommonTable
  columns={columns}
  data={properties}
  isLoading={isLoading}
  stickyLastColumns={1} // Make actions column sticky
  emptyMessage="No properties found"
/>;
```

## Props

| Prop                 | Type      | Default               | Description                             |
| -------------------- | --------- | --------------------- | --------------------------------------- |
| `columns`            | `Array`   | `[]`                  | Array of column definitions (see below) |
| `data`               | `Array`   | `[]`                  | Array of data rows                      |
| `stickyFirstColumns` | `number`  | `0`                   | Number of columns to stick on the left  |
| `stickyLastColumns`  | `number`  | `0`                   | Number of columns to stick on the right |
| `className`          | `string`  | `""`                  | Additional CSS classes for the table    |
| `isLoading`          | `boolean` | `false`               | Shows loading spinner                   |
| `emptyMessage`       | `string`  | `"No data available"` | Message when no data                    |

## Column Definition

```typescript
{
  key: string;              // Unique identifier for the column
  header: string;           // Column header text
  render?: (row, index) => ReactNode;  // Custom render function
  className?: string;       // CSS class for table cells
  headerClassName?: string; // CSS class for header cell
  width?: number;          // Column width in pixels (applies to both header and cells)
}
```

### Width Property

The `width` property sets both the width and minimum width of the column in pixels:

```jsx
const columns = [
  {
    key: "name",
    header: "Name",
    width: 200, // 200px width
  },
  {
    key: "email",
    header: "Email",
    width: 300, // 300px width
  },
  {
    key: "actions",
    header: "Actions",
    width: 120, // 120px width
  },
];
```

**Note:** Width is also used for calculating sticky column offsets, so it's important to set accurate widths for sticky columns to work properly.

## Image Fallback Pattern

```jsx
const handleImageError = (e) => {
  e.currentTarget.src = "/images/no-image.png";
};

<Image
  src={imageUrl || "/images/no-image.png"}
  onError={handleImageError}
  alt="..."
/>;
```

## Notes

- The component preserves existing table styling (table-style3, t-head, t-body)
- Sticky columns automatically get subtle box shadows for visual separation
- First column automatically uses `<th>` tag, others use `<td>`
- Loading state shows a centered spinner
- Empty state shows a centered message
