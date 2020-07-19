import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Form, Button, Input, Checkbox, Select } from "antd";
import axios from "axios";
import headers from "../components/headers";

const ProductDetail = () => {
	const [productData, setProductData] = useState();
	const [categoryData, setCategoryData] = useState();
	const [selectedCategory, setSelectedCategory] = useState();
	const router = useRouter();
	const [form] = Form.useForm();
	const { Option } = Select;

	const onFinish = (values) => {
		if (productData) {
			axios
				.patch(
					"https://hungree-surya.web.app/api/product/" + router.query.id,
					{
						name: values.name,
						price: values.price,
						category: selectedCategory,
						isDeleted: false,
					},
					headers(localStorage.getItem("token"))
				)
				.catch((err) => {
					console.log(err);
				});
		} else {
			axios
				.post(
					"https://hungree-surya.web.app/api/product",
					{
						name: values.name,
						price: values.price,
						category: selectedCategory,
						isDeleted: false,
					},
					headers(localStorage.getItem("token"))
				)
				.catch((err) => {
					console.log(err);
				});
		}
		router.push("/products");
	};

	useEffect(() => {
		if (router.query.id) {
			axios
				.get(
					"https://hungree-surya.web.app/api/product/" + router.query.id,
					headers(localStorage.getItem("token"))
				)
				.then((res) => {
					setProductData(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
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
	}, [router.query]);

	useEffect(() => {
		form.setFieldsValue({
			name: productData && productData.name,
			price: productData && productData.price,
			category: productData && productData.category,
		});
	}, [productData]);

	return (
		<div className="page-wrap">
			<Form name="form" form={form} onFinish={onFinish}>
				<Form.Item name="name" label="Name" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="price" label="Price" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="category" label="Category">
					<Select
						onChange={(cat) => {
							setSelectedCategory(cat);
						}}
					>
						{categoryData &&
							categoryData.map((item) => {
								return (
									<Option values={item.name} key={item.name}>
										{item.name}
									</Option>
								);
							})}
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Save
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ProductDetail;
