import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Après chaque test, on nettoie jsdom avant de lancer le suivant.
afterEach(() => {
  cleanup();
});

// Mock global de useUser
vi.mock("@/hooks/useUser", () => ({
  useUser: vi.fn(() => ({
    user: null,
    loading: false,
    setUser: vi.fn(),
  })),
}));

// Mock global de useNotificationCount
vi.mock("@/hooks/useNotificationCount", () => ({
  useNotificationCount: vi.fn(() => ({
    notifCount: 0,
    setNotifCount: vi.fn(),
  })),
}));

// Mock global de useNotificationsQuery
vi.mock("@/queries/useNotificationsQuery", () => ({
  useMarkNotificationAsReadQuery: vi.fn(() => ({
    mutate: vi.fn(),
  })),
}));

// Mock partiel de React Query
vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: vi.fn(),
    }),
  };
});

// --- socket ---
vi.mock("@/socket", () => ({
  socket: {
    connected: true,
    emit: vi.fn(),
    disconnect: vi.fn(),
  },
}));

vi.mock("axios", () => ({
  default: {
    post: vi.fn().mockResolvedValue({}), // simulation succès
  },
}));
