const { login } = require("./users");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/user");

describe("Login Controller", () => {
  const testReq = {
    body: {
      email: "test@email.com",
      password: "testpassword",
    },
  };

  const testRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should return token and user object with status code 200", async () => {
    const mockUser = {
      _id: "mockUserId",
      email: "test@example.com",
      password: await bcrypt.hash("testpassword", 10),
      subscription: "basic",
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockToken");
    User.findByIdAndUpdate.mockResolvedValue();

    await login(testReq, testRes);

    expect(testRes.status).toHaveBeenCalledWith(200);
    expect(testRes.json).toHaveBeenCalledWith({
      token: "mockToken",
      user: {
        email: "test@example.com",
        subscription: "basic",
      },
    });
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith("mockUserId", {
      token: "mockToken",
    });
  });

  test("Response includes user object with email and subscription fields", async () => {
    await login(testReq, testRes);

    const user = testRes.json.mock.calls[0][0].user;

    expect(user).toBeDefined();
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("subscription");
  });
});
