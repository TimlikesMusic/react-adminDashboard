import { useShow, useOne } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  NumberField,
  MarkdownField,
} from "@refinedev/mui";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const ShowProduct = () => {
  const {
    query: { data, isLoading },
  } = useShow();

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: data?.data?.category.id || "",
    queryOptions: {
      enabled: !!data?.data,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Show>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <TextField value={data?.data?.id} />

        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <TextField value={data?.data?.name} />

        <Typography variant="body1" fontWeight="bold">
          Description
        </Typography>
        <MarkdownField value={data?.data?.description} />

        <Typography variant="body1" fontWeight="bold">
          Material
        </Typography>
        <TextField value={data?.data?.material} />

        <Typography variant="body1" fontWeight="bold">
          Category
        </Typography>
        <TextField
          value={categoryIsLoading ? "Loading..." : categoryData?.data?.title}
        />

        <Typography variant="body1" fontWeight="bold">
          Price
        </Typography>
        <NumberField value={data?.data?.price} />
      </Stack>
    </Show>
  );
};

// import { useShow } from "@refinedev/core";

//   export const ShowProduct = () => {
//     const {
//       query: { data, isLoading },
//     } = useShow();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return <div>Product name: {data?.data.name}</div>;
// };

// //We previously hardcoded the id-paramter:
// //const { data, isLoading } = useOne({ resource: "products", id: 123 })

// //With useShow we tell refine to fetch the "id" from the router definition
// //It reads the "resource" and "id" definitions from the URL