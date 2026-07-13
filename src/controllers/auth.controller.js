import authService from "../services/auth.service.js";

import ApiResponse from "../utils/ApiResponse.js";

import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validators/auth.validator.js";

class AuthController {
  async register(req, res, next) {
    try {
      const validatedData = registerSchema.parse(req.body);

      const user = await authService.register(validatedData);

      return res
        .status(201)
        .json(new ApiResponse(201, "User registered successfully", user));
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const validatedData = loginSchema.parse(req.body);

      const result = await authService.login(validatedData);

      return res
        .status(200)
        .json(new ApiResponse(200, "Login successful", result));
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const validatedData = refreshTokenSchema.parse(req.body);

      const result = await authService.refreshToken(
        validatedData.refreshToken
      );

      return res
        .status(200)
        .json(new ApiResponse(200, "Token refreshed successfully", result));
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const validatedData = refreshTokenSchema.parse(req.body);

      await authService.logout(validatedData.refreshToken);

      return res
        .status(200)
        .json(new ApiResponse(200, "Logout successful", null));
    } catch (error) {
      next(error);
    }
  }

  async profile(req, res) {
    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile fetched successfully",
        req.user
      )
    );
  }

  async recruiterOnly(req, res) {
  return res.status(200).json(
    new ApiResponse(
      200,
      "Welcome Recruiter",
      req.user
    )
  );
}

async adminOnly(req, res) {
  return res.status(200).json(
    new ApiResponse(
      200,
      "Welcome Admin",
      req.user
    )
  );
}
}

export default new AuthController();