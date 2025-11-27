import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import axios from "axios";

//  mock navigate
const navigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

// mock useUser
const mockSetUser = vi.fn();
vi.mock("@/hooks/useUser", () => ({
  useUser: () => ({
    user: null,
    setUser: mockSetUser,
  }),
}));

// mock useCsrfToken
const mockSetCsrf = vi.fn();
vi.mock("@/hooks/useCsrfToken", () => ({
  useCsrfToken: () => ({
    csrfToken: null,
    setCsrfToken: mockSetCsrf,
  }),
}));

//  importLogin APRES les mocks
import { Login } from "@/pages/Login";
import { apiUrl } from "@/config";

describe("Login", () => {
  test("soumet le formulaire et appelle axios + navigate + setUser", async () => {
    const mockedPost = vi.mocked(axios.post);

    mockedPost.mockResolvedValue({
      status: 200,
      data: {
        user: { id: 1, username: "john" },
        csrfToken: "TOKEN123",
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    // Remplir le formulaire
    await userEvent.type(
      screen.getByLabelText(/adresse mail/i),
      "test@gmail.com",
    );
    await userEvent.type(screen.getByLabelText(/mot de passe/i), "123456");

    // Cliquer sur "Connexion"
    await userEvent.click(screen.getByRole("button", { name: /connexion/i }));

    // Vérifier l'appel axios
    expect(axios.post).toHaveBeenCalledWith(
      apiUrl + "/login",
      {
        email: "test@gmail.com",
        password: "123456",
      },
      { withCredentials: true },
    );

    // Vérifier que setUser est appelé
    expect(mockSetUser).toHaveBeenCalledWith({
      id: 1,
      username: "john",
    });

    // Vérifier que setCsrfToken est appelé
    expect(mockSetCsrf).toHaveBeenCalledWith("TOKEN123");

    // Vérifier la navigation
    expect(navigate).toHaveBeenCalledWith("/", { replace: true });
  });
});
