const BASE_URL = 'http://localhost:8000/'; // change as needed

export const signupUser = async(userData) => {
    const res = await fetch(`${BASE_URL}api/register/`, {
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(userData),
        credentials: 'include', // include cookies
    });
    if (!res.ok) throw new Error((await res.json()).detail || 'Signup failed');
    return await res.json();
}

// Login
export const loginUser = async (userData) => {
  const res = await fetch(`${BASE_URL}api/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
    credentials: 'include', // important
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
};

// Example: Get user profile
export const fetchUserProfile = async () => {
  const res = await fetch(`${BASE_URL}/me/`, {
    method: 'GET',
    credentials: 'include', // send cookies
  });
  if (!res.ok) throw new Error('Failed to fetch user');
  return await res.json();
};