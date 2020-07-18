import { Table, Tag, Space, Button } from "antd";
import { useState, useEffect } from "react";

import axios from "axios";
import headers from "../components/headers";
import { useRouter } from "next/router";

const ProductCategories = () => {
	const [categoryData, setCategoryData] = useState();
	const router = useRouter();

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Action",
			key: "action",
			render: (record) => (
				<Space size="middle">
					<Button
						onClick={() => {
							console.log(record.id);
							router.push(
								`/productcategorydetail/${record.id}`,
								`productcategorydetail?id=${record.id}`
							);
						}}
					>
						Edit
					</Button>
					<Button
						danger
						onClick={() => {
							axios
								.patch(
									"https://hungree-surya.web.app/api/productcategory/" +
										record.id,
									{ name: record.name, isDeleted: true },
									headers(localStorage.getItem("token"))
								)
								.then((data) => {
									router.reload();
								})
								.catch((err) => {
									console.log(err);
								});
						}}
					>
						Delete
					</Button>
				</Space>
			),
		},
	];

	const getData = () => {
		axios
			.get(
				"https://hungree-surya.web.app/api/productcategory",
				headers(localStorage.getItem("token"))
			)
			.then((res) => {
				setCategoryData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="page-wrap">
			<h2>Product Category</h2>
			<Button
				type="primary"
				onClick={() => {
					router.push("/productcategorydetail");
				}}
			>
				Add New
			</Button>
			<Table columns={columns} dataSource={categoryData} />
		</div>
	);
};

export default ProductCategories;
