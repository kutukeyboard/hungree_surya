import { useEffect, useState } from "react";

const Home = () => {
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			window.location.href = "/login";
		}
  }, []);
  
	return (
		<div className="page-wrap">
			<h2>Home</h2>
		</div>
	);
};

export default Home;
