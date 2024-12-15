import { redirect } from "react-router-dom";

const HomeLoader =  () => {
	if (localStorage.getItem("token") === null) {
		console.log(localStorage.getItem("token"));
		return redirect("login");
	} else {
		return null;
	}
};

export { HomeLoader };
