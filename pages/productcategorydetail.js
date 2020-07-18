import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Form, Button, Input, Checkbox } from "antd";
import axios from "axios";
import headers from "../components/headers";

const ProductCategoryDetail = () => {
	const [categoryData, setCategoryData] = useState();
	const router = useRouter();
	const [form] = Form.useForm();

	const onFinish = (values) => {
		if (categoryData) {
			axios
				.patch(
					"https://hungree-surya.web.app/api/productcategory/" +
						router.query.id,
					values,
					headers(localStorage.getItem("token"))
				)
				.catch((err) => {
					console.log(err);
				});
		} else {
			axios
				.post(
					"https://hungree-surya.web.app/api/productcategory",
					{ name: values.name, isDeleted: false },
					headers(localStorage.getItem("token"))
				)
				.catch((err) => {
					console.log(err);
				});
		}
		router.push("/productcategories");
	};

	useEffect(() => {
		if (router.query.id) {
			console.log("ada query");
			axios
				.get(
					"https://hungree-surya.web.app/api/productcategory/" +
						router.query.id,
					headers(localStorage.getItem("token"))
				)
				.then((res) => {
					setCategoryData(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [router.query]);

	useEffect(() => {
		form.setFieldsValue({
			name: categoryData && categoryData.name,
		});
	}, [categoryData]);

	return (
		<div className="page-wrap">
			<Form name="form" form={form} onFinish={onFinish}>
				<Form.Item name="name" label="Name" rules={[{ required: true }]}>
					<Input />
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

export default ProductCategoryDetail;
