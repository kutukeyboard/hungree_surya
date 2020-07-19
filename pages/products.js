import { Table, Space, Button } from "antd";
import { useState, useEffect } from "react";

import axios from "axios";
import headers from "../components/headers";
import { useRouter } from "next/router";

const Products = () => {
	const [productData, setProductData] = useState();
	const router = useRouter();

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
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
								`/productdetail/${record.id}`,
								`productdetail?id=${record.id}`
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
									"https://hungree-surya.web.app/api/product/" + record.id,
									{ name: record.name, price: record.price, category:record.category, isDeleted: true },
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
				"https://hungree-surya.web.app/api/product",
				headers(localStorage.getItem("token"))
			)
			.then((res) => {
				setProductData(res.data);
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
			<h2>Product </h2>
			<Button
				type="primary"
				onClick={() => {
					router.push("/productdetail");
				}}
			>
				Add New
			</Button>
			<Table columns={columns} dataSource={productData} />
		</div>
	);
};

export default Products;
