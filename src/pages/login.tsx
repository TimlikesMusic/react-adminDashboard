import React from "react";
import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2
        text="Dashboard Anmeldung"
        collapsed={false} />
      }
      formProps={{
        defaultValues: {
          email: "demo@demo.com",
          password: "demodemo",
        },
      }}
    />
  );
};

// import React from "react";
// import { useLogin } from "@refinedev/core";
// import "./products/css/login.css"

// export const Login = () => {
//     const { mutate, isLoading } = useLogin();

//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         const data = Object.fromEntries(new FormData(event.currentTarget).entries());

//         mutate(data);
//     };

//     return (
//         <div>
//           <h1>Login</h1>
//           <form onSubmit={onSubmit}>
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               // We're providing default values for demo purposes.
//               defaultValue="demo@demo.com"
//             />
    
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               // We're providing default values for demo purposes.
//               defaultValue="demodemo"
//             />
    
//             {isLoading && <span>loading...</span>}
//             <button type="submit" disabled={isLoading}>
//               Submit
//             </button>
//           </form>
//         </div>
//       );
// };