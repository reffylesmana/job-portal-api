import prisma from "../config/prisma.js";

import ApiError from "../utils/ApiError.js";
import hashPassword from "../utils/hashPassword.js";
import comparePassword from "../utils/comparePassword.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

import dayjs from "dayjs";


class AuthService {

  async register(data) {
    const {
      name,
      email,
      password,
      role,
    } = data;


    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });


    if (existingUser) {
      throw new ApiError(
        409,
        "Email already registered"
      );
    }


    const hashedPassword = await hashPassword(password);


    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });


    return user;
  }



  async login(data) {

    const {
      email,
      password,
    } = data;


    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });


    if (!user) {
      throw new ApiError(
        401,
        "Invalid email or password"
      );
    }


    const passwordMatch = await comparePassword(
      password,
      user.password
    );


    if (!passwordMatch) {
      throw new ApiError(
        401,
        "Invalid email or password"
      );
    }


    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);



    await prisma.refreshToken.create({
      data: {
        token: refreshToken,

        expiresAt: dayjs()
          .add(7, "day")
          .toDate(),

        userId: user.id,
      },
    });



    return {

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      accessToken,

      refreshToken,

    };

  }




  async refreshToken(token) {


    const storedToken =
      await prisma.refreshToken.findUnique({

        where: {
          token,
        },

        include: {
          user: true,
        },

      });



    if (!storedToken) {

      throw new ApiError(
        401,
        "Invalid refresh token"
      );

    }



    if (
      dayjs()
      .isAfter(storedToken.expiresAt)
    ) {


      await prisma.refreshToken.delete({
        where:{
          id: storedToken.id,
        },
      });


      throw new ApiError(
        401,
        "Refresh token expired"
      );

    }



    const accessToken =
      generateAccessToken(
        storedToken.user
      );



    return {
      accessToken,
    };

  }




  async logout(token) {


    const storedToken =
      await prisma.refreshToken.findUnique({

        where:{
          token,
        },

      });



    if (!storedToken) {

      throw new ApiError(
        404,
        "Refresh token not found"
      );

    }



    await prisma.refreshToken.delete({

      where:{
        token,
      },

    });


    return true;

  }


}


export default new AuthService();