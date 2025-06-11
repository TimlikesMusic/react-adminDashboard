import { useForm } from "@refinedev/react-hook-form";
import { Create, useAutocomplete, SaveButton } from "@refinedev/mui";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Controller } from "react-hook-form";

export const CreateProduct = () => {
  const {
    register,
    control,
    saveButtonProps,
    formState: { errors },
  } = useForm();

  const { autocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
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
        <SaveButton {...saveButtonProps} />
      </Box>
    </Create>
  );
};

// import { useForm, useSelect } from "@refinedev/core";
// import "./css/createProduct.css";

// //Same procede as in "editProduct" with useForm and "listProduct" useShow
// export const CreateProduct = () => {
//   const { onFinish, mutation } = useForm();

//   const { options } = useSelect({
//     resource: "categories",
//     // optionLabel: "titel",
//     // optionValue: "id",
//   })

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // Using FormData to get the form values and convert it to an object.
//     const data = Object.fromEntries(new FormData(event.currentTarget).entries());
//     // Calling onFinish to submit with the data we've collected from the form.
//     onFinish({
//       ...data,
//       price: Number(data.price).toFixed(2),
//     });
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <label htmlFor="name">Name</label>
//       <input type="text" id="name" name="name" />

//       <label htmlFor="description">Description</label>
//       <textarea id="description" name="description" />

//       <label htmlFor="price">Price</label>
//       <input type="number" id="price" name="price" step=".01" />

//       <label htmlFor="material">Material</label>
//       <input type="text" id="material" name="material" />

//       <label htmlFor="category">Category</label>
//       <select id="category" name="category">
//         {options?.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>

//       <button type="submit">Submit</button>
//       {mutation.isSuccess && <span>successfully submitted!</span>}
//     </form>
//   );
// };