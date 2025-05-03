
export type UserRole = "buyer" | "seller" | "admin" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  selectedRole: UserRole;
}

// Mock Users for Demo Purposes
export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Buyer User",
    email: "buyer@example.com",
    role: "buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
  },
  {
    id: "2",
    name: "Seller User",
    email: "seller@example.com",
    role: "seller",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy"
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max"
  }
];

export const ROLE_CONFIG = {
  buyer: {
    label: "Buyer",
    color: "buyer",
    description: "Browse and purchase products",
    path: "/dashboard/buyer"
  },
  seller: {
    label: "Seller",
    color: "seller",
    description: "List and sell products",
    path: "/dashboard/seller"
  },
  admin: {
    label: "Admin",
    color: "admin",
    description: "Manage the entire platform",
    path: "/dashboard/admin"
  }
};

// Simulated login function
export const loginUser = (email: string, password: string): Promise<User> => {
  // This would typically be an API call to your auth service
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find((u) => u.email === email);
      
      if (user && password === "password") {
        // Store user in localStorage (for demo purposes)
        localStorage.setItem("auth_user", JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 800); // Simulate network delay
  });
};

// Simulated signup function
export const signupUser = (
  name: string,
  email: string,
  password: string,
  role: UserRole
): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === email);
      if (existingUser) {
        reject(new Error("User with this email already exists"));
        return;
      }

      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        name,
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
      };

      // In a real app, we would save this user to the database
      // For this demo, we'll just store in localStorage
      localStorage.setItem("auth_user", JSON.stringify(newUser));
      resolve(newUser);
    }, 800); // Simulate network delay
  });
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("auth_user");
};

// Get the stored user
export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem("auth_user");
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};
