import { Table, Tag, Space, Button } from "antd";
import { useState, useEffect } from "react";

import axios from "axios";
import headers from "../components/headers";

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Action",
		key: "action",
		render: () => (
			<Space size="middle">
				<Button>Edit</Button>
				<Button danger>Delete</Button>
				<a>Delete</a>
			</Space>
		),
	},
];

const ProductCategories = () => {
	const [categoryData, setCategoryData] = useState();

	const getData = () => {
		axios
			.get(
				"https://hungree-surya.web.app/api/productcategory",
				headers(localStorage.getItem("token"))
			)
			.then((res) => {
				setCategoryData(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getData;
	}, []);

	return (
		<div className="page-wrap">
			<h2>Product Category</h2>
			<Table columns={columns} dataSource={categoryData} />
		</div>
	);
};

export default ProductCategories;
