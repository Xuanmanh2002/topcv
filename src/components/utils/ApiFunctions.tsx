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
		const response: AxiosResponse<CustomerRoleResponse> = await api.get("/api/customer/check-role-customer", {
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
		const response: AxiosResponse<CustomerData> = await api.post("/api/customer/login", login);
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
		const response = await api.post("/api/customer/register", formData, {
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

export async function getEmployer(email: string): Promise<any> {
	try {
		const response = await api.get(`/employer/show-profile/${email}`);
		return response.data;
	} catch (error: any) {
		if (error.response) {
			console.error(
				`Server error: ${error.response.status} - ${error.response.statusText}`
			);
		} else if (error.request) {
			console.error("No response received from server:", error.request);
		} else {
			console.error("Error occurred while setting up request:", error.message);
		}
		throw error;
	}
}

export async function getEmailByCompanyName(companyName: string): Promise<string> {
	try {
		const response = await api.get(`/employer/email-by-company?companyName=${companyName}`, {
			headers: getHeader(),
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(`Failed to fetch email with status: ${response.status}`);
		}
	} catch (error: any) {
		console.error("Error fetching email by company name:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}

export const createApplication = async (
	fullName: string,
	email: string,
	telephone: string,
	letter: string,
	cv: File,
	jobId: number,
	token: string
): Promise<any> => {
	const formData = new FormData();
	formData.append('fullName', fullName);
	formData.append('email', email);
	formData.append('telephone', telephone);
	formData.append('letter', letter);
	formData.append('cv', cv);
	formData.append('jobId', jobId.toString());

	try {
		const response = await api.post("/api/application-documents/add", formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	} catch (error: any) {
		const errorMessage = error.response?.data?.message || "Error creating application";
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
};

export async function getEmployerByRank(): Promise<EmployerResponse[]> {
	try {
		const response: AxiosResponse<EmployerResponse[]> = await api.get("/employer/list-employer-by-rank", {
			headers: getHeader(),
		});
		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(`Failed to fetch employers by rank with status: ${response.status}`);
		}
	} catch (error: any) {
		console.error("Error fetching employers by rank:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}
interface EmployerResponse {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	birthDate: Date;
	gender: string;
	telephone: string;
	addressId: string;
	companyName: string;
	avatar: string;
	rank: string;
	scale: string;
	fieldActivity: String;
}



interface ApplicationDocumentsResponse {
	id: number;
	fullName: string;
	email: string;
	telephone: string;
	cv: string | null;
	letter: string;
	status: string;
	createAt: string;
	jobId: number | null;
	jobName: String | null;
	employerId: string | null;
	companyName: string | null;
}

export const getAllApplicationsByCustomer = async (token: string): Promise<ApplicationDocumentsResponse[]> => {
	try {
		const response = await api.get("/api/application-documents/all", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		if (response.status >= 200 && response.status < 300) {
			const applicationDocuments: ApplicationDocumentsResponse[] = response.data;
			return applicationDocuments;
		} else {
			throw new Error(`Failed to fetch application documents with status: ${response.status}`);
		}
	} catch (error: any) {
		console.error("Error fetching application documents:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
};

export const getJobsByAdminAndStatusTrue = async (adminId: number): Promise<any[]> => {
	try {
		const response = await api.get(`/employer/job/all-job/${adminId}/active`, {
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(`Failed to fetch jobs with status: ${response.status}`);
		}
	} catch (error: any) {
		console.error("Error fetching jobs by admin and status true:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
};

export async function getJobById(jobId: number): Promise<any> {
	try {
		const token = localStorage.getItem("token");
		const response = await api.get(`/employer/job/${jobId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(`Failed to fetch job with status: ${response.status}`);
		}
	} catch (error: any) {
		console.error("Error fetching job:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}

export async function getCustomerById(): Promise<any> {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found.");
		}
		const response = await api.get(`/api/customer/show-profile`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		});
		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(`Failed to fetch customer profile with status: ${response.status}`);
		}

	} catch (error: any) {
		console.error("Error fetching customer profile:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}

export async function updateCustomerProfile(
	email: string,
	firstName: string,
	lastName: string,
	birthDateMillis: number | null,
	gender: string,
	telephone: string,
	addressId: number,
	avatar: File | null
): Promise<any> {
	const formData = new FormData();
	formData.append("email", email);
	formData.append("firstName", firstName);
	formData.append("lastName", lastName);

	if (birthDateMillis) {
		formData.append("birthDate", birthDateMillis.toString());
	}

	formData.append("gender", gender);
	formData.append("telephone", telephone);
	formData.append("addressId", addressId.toString());
	if (avatar) {
		formData.append("avatar", avatar);
	}

	try {
		const response = await api.put("/api/customer/update", formData, {
			headers: {
				...getHeader(),
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error: any) {
		console.error("Error updating customer profile:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}

export async function getActiveJobsByEmployer(employerId: number): Promise<number> {
	try {
		const response = await api.get("/employer/job/jobs-find-by-employer", {
			params: {
				adminId: employerId
			},
			headers: getHeader()
		});

		return response.data;
	} catch (error: any) {
		console.error("Error fetching active jobs:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}

export async function getActiveJobsByCategory(categoryId: number): Promise<number> {
	try {
		const response = await api.get("/employer/job/count-jobs-find-by-category", {
			params: {
				categoryId: categoryId
			},
			headers: getHeader()
		});

		return response.data;
	} catch (error: any) {
		console.error("Error fetching active jobs:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}


export interface Job {
	id: number;
	jobName: string;
	experience: string;
	applicationDeadline: Date;
	recruitmentDetails: string;
	price: string;
	employerId: string;
	categoryId: string;
	createAt: Date;
	employerEmail?: string;
	employerResponse: EmployerResponse;
	ranker: string;
	quantity: number;
	workingForm: string;
	gender: string;
}

export const getAllJobsByCategory = async (categoryId: number): Promise<Job[]> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found.");
		}
		const response: AxiosResponse<Job[]> = await api.get(`/employer/job/all-job-by-category`, {
			headers: getHeader(),
			params: { categoryId },
		});
		if (response.status === 204 || !response.data) {
			return [];
		}
		return response.data;
	} catch (error: any) {
		console.error("Error fetching jobs by category:", error);
		const errorMessage = error.response?.data?.message || "Unable to fetch jobs by category.";
		throw new Error(errorMessage);
	}
};

export const getAllJobsByAddress = async (addressId: number): Promise<Job[]> => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No authentication token found.");
		}
		const response: AxiosResponse<Job[]> = await api.get(`/employer/job/all-job-by-addressId`, {
			headers: getHeader(),
			params: { addressId },
		});
		if (response.status === 204 || !response.data) {
			return [];
		}
		return response.data;
	} catch (error: any) {
		console.error("Error fetching jobs by category:", error);
		const errorMessage = error.response?.data?.message || "Unable to fetch jobs by category.";
		throw new Error(errorMessage);
	}
};

export const getAllJobsByLocationAndCategory = async (categoryId: number, addressId: number): Promise<Job[]> => {
	try {
		const response: AxiosResponse<Job[]> = await api.get(`/employer/job/all-job-by-location-and-category`, {
			headers: getHeader(),
			params: {
				categoryId,
				addressId,
			},
		});

		if (response.status === 204 || !response.data) {
			return [];
		}

		return response.data;
	} catch (error: any) {
		console.error("Error fetching jobs by category and location:", error);
		const errorMessage = error.response?.data?.message || "Unable to fetch jobs by category and location.";
		throw new Error(errorMessage);
	}
};

interface Category {
	id: number;
	categoryName: string;
	description: string;
	createAt: string;
	images: string | null;
}

export async function getCategoriesWithJobs(): Promise<Category[]> {
	try {
		const response = await api.get("/admin/category/with-jobs", {
			headers: getHeader(),
		});

		if (response.status >= 200 && response.status < 300) {
			const categories: Category[] = response.data;
			return categories.map(category => ({
				...category,
				images: category.images
					? `data:image/jpeg;base64,${category.images}`
					: null,
			}));
		} else {
			throw new Error(`Failed to fetch categories with status: ${response.status}`);
		}
	} catch (error: any) {
		console.error("Error fetching categories with jobs:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}


export async function getEmployersWithJobs(): Promise<EmployerResponse[]> {
	try {
		const response: AxiosResponse<EmployerResponse[]> = await api.get("/employer/with-jobs", {
			headers: getHeader(),
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(`Failed to fetch employers with jobs. Status: ${response.status}`);
		}
	} catch (error: any) {
		console.error("Error fetching employers with jobs:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}



export async function searchJobs(keyword: string): Promise<Job[]> {
	try {
		const response = await api.get("/employer/job/search", {
			params: { keyword },
			headers: getHeader(),
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(`Failed to fetch jobs with status: ${response.status}`);
		}
	} catch (error: any) {
		console.error("Error searching jobs:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}

export interface Report {
	fullName: string;
	email: string;
	telephone: string;
	letter: string;
	address: string;
	jobId: number;
}

export const createReport = async (reportRequest: Report): Promise<any> => {
	try {
		const response = await api.post("/api/report/create-report", reportRequest, {
			headers: getHeader(),
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(`Failed to create report with status: ${response.status}`);
		}
	} catch (error: any) {
		console.error("Error creating report:", error);
		throw new Error(error.response?.data?.message || error.message);
	}
};



export async function getAllJobsGood(): Promise<Job[]> {
	try {
		const response: AxiosResponse<Job[]> = await api.get("/employer/job/job-service-good", {
			headers: getHeader(),
		});
		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(`Failed to fetch jobs with status: ${response.status}`);
		}
	} catch (error: any) {
		console.error("Error fetching jobs (good):", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}

export async function getAllJobsSexy(): Promise<Job[]> {
	try {
		const response: AxiosResponse<Job[]> = await api.get("/employer/job/job-service-sexy", {
			headers: getHeader(),
		});
		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(`Failed to fetch jobs with status: ${response.status}`);
		}
	} catch (error: any) {
		console.error("Error fetching jobs (sexy):", error);
		throw new Error(error.response?.data?.message || error.message);
	}
}
