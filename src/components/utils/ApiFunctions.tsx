import axios, { AxiosResponse } from "axios";

export const api = axios.create({
	baseURL: "http://localhost:9090"
});

export const getHeader = (): { [key: string]: string } => {
	const token = localStorage.getItem("token");
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	};
};

interface CustomerRoleResponse {
	role: string;
}

export async function checkRoleCustomer(token: string): Promise<boolean> {
	try {
		const response: AxiosResponse<CustomerRoleResponse> = await api.get("/check-role-customer", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data.role === "ROLE_CUSTOMER";
		} else {
			throw new Error(`Role check failed with status: ${response.status}`);
		}
	} catch (error) {
		console.error("Role check error:", error);
		return false;
	}
}

interface LoginData {
	email: string;
	password: string;
}

interface CustomerData {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	avatar: string;
	token: string;
}

export async function loginCustomer(login: LoginData): Promise<CustomerData | null> {
	try {
		const response: AxiosResponse<CustomerData> = await api.post("/login-customer", login);
		if (response.status >= 200 && response.status < 300) {
			const customerData = response.data;

			if (customerData.token) {
				localStorage.setItem("token", customerData.token);
				localStorage.setItem("adminId", customerData.id);
				localStorage.setItem("email", customerData.email);
				localStorage.setItem("firstName", customerData.firstName);
				localStorage.setItem("lastName", customerData.lastName);
				localStorage.setItem("avatar", customerData.avatar);

				const isAdmin = await checkRoleCustomer(customerData.token);
				if (isAdmin) {
					return customerData;
				} else {
					localStorage.removeItem("token");
					throw new Error("Access restricted to Customers only.");
				}
			} else {
				throw new Error("No token received from server");
			}
		} else {
			throw new Error(`Login failed with status: ${response.status}`);
		}
	} catch (error) {
		console.error("Login error:", error);
		return null;
	}
}

export async function registerCustomer(formData: FormData): Promise<any> {
	try {
		const response = await api.post("/register-customer", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data);
		} else {
			throw new Error(`Customer registration error: ${error.message}`);
		}
	}
}

export async function getAllAddress(): Promise<any[]> {
	try {
		const result = await api.get("/api/address/all");
		if (result.status === 204 || !result.data || result.data.length === 0) {
			return [];
		}
		return result.data;
	} catch (error: any) {
		console.error("Error fetching address:", error);
		throw new Error(`Error fetching address: ${error.response?.data?.message || error.message}`);
	}
}

export async function getAllCategory(): Promise<any[]> {
	try {
		const result = await api.get("/admin/category/all");
		if (result.status === 204 || !result.data || result.data.length === 0) {
			return [];
		}
		return result.data;
	} catch (error: any) {
		console.error("Error fetching category:", error);
		throw new Error(`Error fetching category: ${error.response?.data?.message || error.message}`);
	}
}

export async function getAllJob(): Promise<any[]> {
	try {
		const result = await api.get("/employer/job/active");
		if (result.status === 204 || !result.data || result.data.length === 0) {
			return [];
		}
		return result.data;
	} catch (error: any) {
		console.error("Error fetching job:", error);
		throw new Error(`Error fetching job: ${error.response?.data?.message || error.message}`);
	}
}

export async function getEmployer(email: string): Promise<any[]> {
	try {
		const response = await api.get(`/employer/show-profile/${email}`, {
		});
		return response.data;
	} catch (error: any) {
		console.error("Error fetching employer profile:", error);
		throw error;
	}
}


