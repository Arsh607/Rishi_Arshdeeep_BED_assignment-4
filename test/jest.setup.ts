jest.mock("../src/config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));