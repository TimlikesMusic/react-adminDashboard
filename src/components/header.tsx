import React from "react";
import { useGetIdentity, useLogout, useNavigation } from "@refinedev/core";

import { Link } from "react-router";

import "../pages/products/css/header.css"

export const Header = () => {
    const { mutate, isLoading } = useLogout();
    const { data: identity } = useGetIdentity<{ name: string }>();

    const { listUrl, createUrl } = useNavigation();

return (
    <>
    <h2>
        <span>Welcome, </span>
        <span>{identity?.name ?? ""}</span>
    </h2>
    <Link to={listUrl("protected-products")} className="listProducts">List Products</Link>
    <Link to={createUrl("protected-products")} className="createProduct">Create Product</Link>
    <button
        type="button"
        disabled={isLoading}
        onClick={() => mutate()}>
        Logout
    </button>
    </>
  );
};