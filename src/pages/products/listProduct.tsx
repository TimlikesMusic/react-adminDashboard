import React from "react";
import { useSelect } from "@refinedev/core";
import { List, useDataGrid, EditButton, ShowButton } from "@refinedev/mui";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ListProduct = () => {
  const { dataGridProps } = useDataGrid<IProduct>({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  const {
    options: categories,
    query: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",
  });

  // We're defining the columns for our table according to the `<DataGrid />` component's `columns` prop.
  const columns = React.useMemo<GridColDef<IProduct>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 400,
        flex: 1,
      },
      {
        field: "category.id",
        headerName: "Category",
        minWidth: 250,
        flex: 0.5,

        type: "singleSelect",
        valueOptions: categories,
        display: "flex",
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }

          return categories?.find(
            (category) => category.value == row.category.id,
          )?.label;
        },
      },
      {
        field: "material",
        headerName: "Material",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "price",
        headerName: "Price",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: "Actions",
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <div>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </div>
          );
        },
      },
    ],
    [categories, isLoading],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};

interface IProduct {
  id: number;
  name: string;
  material: string;
  price: string;
  category: ICategory;
}

interface ICategory {
  id: number;
  title: string;
}


// import { useTable, useMany, useNavigation } from "@refinedev/core";

// import { Link } from "react-router";

// import "./css/listProduct.css"

// export const ListProduct = () => {
//   const { 
//     tableQuery: { data, isLoading },
//     current,
//     setCurrent,
//     pageCount,
//     sorters,
//     setSorters,
//    } = useTable({ 
//     pagination: { current: 1, pageSize: 10 },
//     sorters: { initial: [{ field: "id", order: "asc" }] },
//     syncWithLocation: true,
//   });

//   const { showUrl, editUrl } = useNavigation();

//   const { data: categories } = useMany({
//     resource: "categories",
//     ids: data?.data?.map((product) => product.category?.id) ?? [],
//   })

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const onPrevious = () => {
//     if (current > 1) {
//       setCurrent(current - 1);
//     }
//   };

//   const onNext = () => {
//     if (current < pageCount) {
//       setCurrent(current +1);
//     }
//   };

//   const onPage = (page: number) => {
//     setCurrent(page);
//   };

// //We use this function to get the current sorter for a field e.g. "asc" or "desc"
// const getSorter = (field: string): "asc" | "desc" | undefined => {
//   const sorter = sorters?.find((sorter) => sorter.field === field);
//   return sorter?.order;
// };

// const onSort = (field: string) => {
//   const sorter = getSorter(field);
//   setSorters(
//     sorter === "desc" ? [] : [
//       {
//         field,
//         order: sorter === "asc" ? "desc" : "asc",
//       },
//     ]
//   );
// };

// const indicator = { asc: "⬆️", desc: "⬇️" };

// return (
//   <div>
//     <h1>Products</h1>
//     <table>
//       <thead>
//         <tr>
//           <th onClick={() => onSort("id")}>
//             ID {indicator[getSorter("id") as "asc" | "desc"]}
//           </th>
//           <th onClick={() => onSort("name")}>
//             Name {indicator[getSorter("name") as "asc" | "desc"]}
//           </th>
//           <th>
//             Category
//           </th>
//           <th onClick={() => onSort("material")}>
//             Material {indicator[getSorter("material") as "asc" | "desc"]}
//           </th>
//           <th onClick={() => onSort("price")}>
//             Price {indicator[getSorter("price") as "asc" | "desc"]}
//           </th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//         <tbody>
//           {data?.data?.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>
//                 {
//                 categories?.data?.find(
//                   (category) => category.id == product.category?.id,
//                 )?.title
//                 }
//                 </td>
//               <td>{product.material}</td>
//               <td>{product.price}</td>
//               <td>
//                 {product.id && <Link to={showUrl("protected-products", product.id)} className="show-link">Show</Link>}
//                 {product.id && <Link to={editUrl("protected-products", product.id)} className="edit-link">Edit</Link>}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         <button type="button" onClick={onPrevious}>
//           {"<"}
//         </button>
//         <div>
//           {current - 1 > 0 && (
//             <span onClick={() => onPage(current - 1)}>{current - 1}</span>
//           )}
//           <span className="current">{current}</span>
//           {current + 1 < pageCount && (
//             <span onClick={() => onPage(current + 1)}>{current + 1}</span>
//           )}
//         </div>
//         <button type="button" onClick={onNext}>
//           {">"}
//         </button>
//       </div>
//     </div>
//   );
// };