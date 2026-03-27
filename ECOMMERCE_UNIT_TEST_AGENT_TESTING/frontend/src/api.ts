export type SignupPayload = {
  username: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const response = await fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return response.json();
}