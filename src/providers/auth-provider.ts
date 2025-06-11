import { AuthProvider } from "@refinedev/core"

export const authProvider: AuthProvider = {
    onError: async (error) => {
        if (error?.status === 401) {
            return {
                logout: true,
                error: { name: "401", message: "Unauthorized" },
            };
        }

        return {};
        
    },

    getIdentity: async () => {
        const response = await fetch("https://api.fake-rest.refine.dev/auth/me", {
        headers: {
            Authorization: localStorage.getItem("JWT") || "null",
      },
    });

    if (response.status < 200 || response.status > 299) {
      return null;
    }

    const data = await response.json();

    return data;
    },

    logout: async () => {
        localStorage.removeItem("JWT");
        return { success: true, redirectTo: "/login" };
        //We just remove the token to logout the user
    },

    //login method receives an object with all the values from our useLogin hook
    login: async ({ email, password }) => {
        const response = await fetch(
            "https://api.fake-rest.refine.dev/auth/login",
            {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        const data = await response.json();

        if(data.token) {
            localStorage.setItem("JWT", data.token);
            return { success: true, redirectTo: "/" };
        }

        return { success: false};
    },

    check: async () => {
        const token = localStorage.getItem("my_access_token");
        return { authenticated: Boolean(token) };
    },
};