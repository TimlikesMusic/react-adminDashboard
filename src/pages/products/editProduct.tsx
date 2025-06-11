import { useForm } from "@refinedev/react-hook-form";
import { Edit, useAutocomplete, SaveButton } from "@refinedev/mui";

import "./css/createProduct.css"

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Controller } from "react-hook-form";

export const EditProduct = () => {
  const {
    register,
    control,
    saveButtonProps,
    refineCore: { query },
    formState: { errors },
  } = useForm();

  const { autocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: query?.data?.data?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
        autoComplete="off"
      >
        <TextField
          {...register("name")}
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message?.toString()}
        />
        <TextField
          {...register("description")}
          multiline
          label="Description"
          error={!!errors.description}
          helperText={errors.description?.message?.toString()}
        />
        <TextField
          {...register("material")}
          label="Material"
          error={!!errors.material}
          helperText={errors.material?.message?.toString()}
        />
        {/* We're using Controller to wrap the Autocomplete component and pass the control from useForm */}
        <Controller
          control={control}
          name="category"
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              id="category"
              {...autocompleteProps}
              {...field}
              onChange={(_, value) => field.onChange(value)}
              getOptionLabel={(item) => {
                return (
                  autocompleteProps?.options?.find(
                    (option) => option?.id == item?.id,
                  )?.title ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                return (
                  value === undefined || option?.id == (value?.id ?? value)
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.category}
                  helperText={errors.category?.message?.toString()}
                />
              )}
            />
          )}
        />

        <TextField
          {...register("price")}
          label="Price"
          error={!!errors.price}
          helperText={errors.price?.message?.toString()}
        />

        {/* SaveButton renders a submit button to submit our form */}
        <SaveButton {...saveButtonProps} />
      </Box>
    </Edit>
  );
};

// //First we hardcoded the resources: "id" and "products"
// //action: "edit", resource: "products", id: "123",
// //The same procedere in "listProduct.tsx"
// //We let refine infer the "id" and "product" parameter from the URL

// export const EditProduct = () => {
//   const { onFinish, mutation, query } = useForm();

//   const record = query?.data?.data;

//   const { options } = useSelect({
//     resource: "categories",
//   });

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // Using FormData to get the form values and convert it to an object.
//     const data = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
//     // Calling onFinish to submit with the data we've collected from the form.
//     onFinish({
//       ...data,
//       price: Number(data.price).toFixed(2),
//       category: { id: Number(data.category) },
//     });
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <label htmlFor="name">Name</label>
//       <input type="text" id="name" name="name" defaultValue={record?.name} />

//       <label htmlFor="description">Description</label>
//       <textarea
//         id="description"
//         name="description"
//         defaultValue={record?.description}
//       />

//       <label htmlFor="price">Price</label>
//       <input
//         type="text"
//         id="price"
//         name="price"
//         pattern="\d*\.?\d*"
//         defaultValue={record?.price}
//       />

//       <label htmlFor="material">Material</label>
//       <input
//         type="text"
//         id="material"
//         name="material"
//         defaultValue={record?.material}
//       />

//       <label htmlFor="category">Category</label>
//       <select id="category" name="category">
//         {options?.map((option) => (
//           <option
//             key={option.value}
//             value={option.value}
//             selected={record?.category.id == option.value}
//           >
//             {option.label}
//           </option>
//         ))}
//       </select>

//       <button type="submit">Submit</button>
//       {mutation.isSuccess && <span>successfully submitted!</span>}
//     </form>
//   );
// };