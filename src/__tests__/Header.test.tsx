import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { useUser } from "@/hooks/useUser";
import { useNotificationCount } from "@/hooks/useNotificationCount";
import axios from "axios";

//describe permet de regrouper les tests
describe("Header", () => {
  //test pour réaliser un scénario de test -> ici l'affichage du logo du site
  test("affiche le logo du site", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Header activeBurgerMenu={false} handleActiveBurgerMenu={() => {}} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const logo = screen.getByAltText("Logo du site");
    expect(logo).toBeInTheDocument();
  });

  test("ouvre et ferme la barre de recherche au clique", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Header activeBurgerMenu={false} handleActiveBurgerMenu={() => {}} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // 1️⃣ Récupère le bouton avec aria-label "Ouvrir la recherche"
    const openBtn = screen.getByRole("button", { name: "Ouvrir la recherche" });

    // 2️⃣ Clique dessus → la search doit s'afficher
    fireEvent.click(openBtn);

    // Maintenant le bouton doit dire "Fermer la recherche"
    const closeBtn = screen.getByRole("button", {
      name: "Fermer la recherche",
    });
    expect(closeBtn).toBeInTheDocument();

    // 3️⃣ Clique encore → retour à l'état initial
    fireEvent.click(closeBtn);

    expect(
      screen.getByRole("button", { name: "Ouvrir la recherche" }),
    ).toBeInTheDocument();
  });

  test("affiche l'icône de connexion quand l'utilisateur n'est pas connecté", () => {
    const queryClient = new QueryClient();

    // 2️⃣ on rend le Header
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Header activeBurgerMenu={false} handleActiveBurgerMenu={() => {}} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // 3️⃣ on cherche le lien vers /connexion
    const connexionLink = screen.getByRole("link", { name: "" });

    // 4️⃣ on vérifie qu’il existe
    expect(connexionLink).toBeInTheDocument();
  });

  test("affiche la photo de profil de l'utilisateur quand il est connecté", () => {
    const mockUseUser = vi.mocked(useUser);
    mockUseUser.mockReturnValue({
      user: {
        id: 1,
        username: "test",
        image: "/avatar.jpg",
        email: "test@gmail.com",
        role: "user",
        created_at: "2018-10-20",
      },
      setUser: vi.fn(),
      loading: false,
    });

    const queryClient = new QueryClient();

    // 2️⃣ on rend le Header
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Header activeBurgerMenu={false} handleActiveBurgerMenu={() => {}} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // 3️⃣ on vérifie qu'il y a bien un avatar et un username
    const avatar = screen.getByAltText("Avatar de l'utilisateur");
    const dropDownMenu = screen.getByTitle("dropdown-icon");
    // 4️⃣ on vérifie qu’il existe
    expect(avatar).toBeInTheDocument();
    expect(dropDownMenu).toBeInTheDocument();
  });

  test("incrémente le compteur de notification quand l'utilisateur reçoit une notification", () => {
    const mockUseUser = vi.mocked(useUser);
    const count = 1;
    mockUseUser.mockReturnValue({
      user: {
        id: 1,
        username: "test",
        image: "/avatar.jpg",
        email: "test@gmail.com",
        role: "user",
        created_at: "2018-10-20",
      },
      setUser: vi.fn(),
      loading: false,
    });

    const mockUseNotificationCount = vi.mocked(useNotificationCount);
    mockUseNotificationCount.mockReturnValue({
      notifCount: count,
      setNotifCount: vi.fn(),
    });

    const queryClient = new QueryClient();

    // 2️⃣ on rend le Header
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Header activeBurgerMenu={false} handleActiveBurgerMenu={() => {}} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // Il y a plusieurs badge, celui du header et celui dans le menu burger, c'est pour ça que j'utilise getAllByLabelText
    const notifBadge = screen.getAllByLabelText("notification-count");

    // Les deux compteur doivent avoir la même valeur
    expect(notifBadge[0]).toHaveTextContent(count.toString());
    expect(notifBadge[1]).toHaveTextContent(count.toString());
  });

  test("déconnecte l'utilisateur", () => {
    const mockUseUser = vi.mocked(useUser);
    mockUseUser.mockReturnValue({
      user: {
        id: 1,
        username: "test",
        image: "/avatar.jpg",
        email: "test@gmail.com",
        role: "user",
        created_at: "2018-10-20",
      },
      setUser: vi.fn(),
      loading: false,
    });

    const queryClient = new QueryClient();

    // 2️⃣ on rend le Header
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Header activeBurgerMenu={false} handleActiveBurgerMenu={() => {}} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // bouton "Déconnexion"
    const logoutButton = screen.getByRole("button", { name: "se déconnecter" });

    fireEvent.click(logoutButton);
    // Vérifie les effets du logout
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/logout"),
      {},
      { withCredentials: true },
    );
  });
});
