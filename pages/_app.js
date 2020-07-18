import Head from "next/head";
import "antd/dist/antd.css";
import "../styles/style.css";
import MenuBar from "../components/menubar";

const _app = (props) => {
	const { Component, pageProps } = props;

	return (
		<div>
			<Head>
				<title>Hungree_Surya </title>
			</Head>
			{props.router.route != "/login" && <MenuBar />}
			<Component {...pageProps} />
		</div>
	);
};

export default _app;
