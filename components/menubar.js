import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Dropdown, Button } from "antd";
import {
	HomeFilled,
	LockFilled,
	LogoutOutlined,
	MenuOutlined,
	CloseOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
const { SubMenu } = Menu;
const MenuBar = (props) => {
	const router = useRouter();
	const [menuMode, setMenuMode] = useState();
	const [menuVisible, setMenuVisible] = useState();

	const showMainMenu = () => {
		return (
			<Menu
				mode={menuMode}
				style={
					menuMode == "inline" ? { width: "100vw" } : { padding: "0 50px" }
				}
				onClick={() => setMenuVisible(false)}
			>
				{menuMode == "inline" && (
					<Menu.Item
						key="close"
						style={{ textAlign: "right" }}
						onClick={() => setMenuVisible(false)}
					>
						<CloseOutlined />
					</Menu.Item>
				)}
				<Menu.Item key="Home">
					<a href="/">
						<HomeFilled />
						Home
					</a>
				</Menu.Item>
				<Menu.Item key="ProductCategories">
					<a href="/productcategories">Product Category</a>
				</Menu.Item>
				<Menu.Item key="Products">
					<a href="/products">Product</a>
				</Menu.Item>
				<Menu.Item key="Logout" style={{ float: "right" }}>
					<Button
						onClick={() => {
							localStorage.clear();
							window.location.href = "/login";
						}}
					>
						Logout
					</Button>
				</Menu.Item>
				{/* {props.menuList && props.menuList.map((menu, index) => {
        return menu.child.length > 0 ? (
          <SubMenu key={index} title={menu.caption}>  
            {menu.child.map((child, childIndex) => {
              return (
                <Menu.Item key={child.caption + childIndex}>
                  <Link href={child.url}>
                    <a>{child.caption}</a>
                  </Link>
                </Menu.Item>
              );
          })}
          </SubMenu>
        ) : (
          <Menu.Item key={index}>
            <Link href={menu.url ? menu.url : ""}>
              <a>{menu.caption}</a>
            </Link>
          </Menu.Item>
        );
      })} */}
			</Menu>
		);
	};

	const checkWindowSize = () => {
		if (window.innerWidth > 599) {
			setMenuMode("horizontal");
		} else {
			setMenuMode("inline");
		}
	};
	useEffect(() => {
		window.addEventListener("resize", checkWindowSize);
		checkWindowSize();
		return () => window.removeEventListener("resize", checkWindowSize);
	}, [checkWindowSize]);

	return (
		<div>
			{menuMode == "inline" ? (
				<Dropdown overlay={showMainMenu()} visible={menuVisible}>
					<a
						className="ant-dropdown-link"
						onclick={(e) => {
							e.preventDefault();
							setMenuVisible(!menuVisible);
						}}
					>
						<MenuOutlined style={{ margin: "20px" }} />
					</a>
				</Dropdown>
			) : (
				showMainMenu()
			)}
		</div>
	);
};
export default MenuBar;
