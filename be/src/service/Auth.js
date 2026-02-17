import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

export default class AuthService {
  constructor() {
    this.secretKey = secretKey;
  }
  async signUp({ userId, userPassword }) {
    try {

    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  }
  async generateToken(payload) {
    try {
      const token = jwt.sign(payload, this.secretKey, { expiresIn: "1h" });
      return token;
    } catch (error) {
      console.error("Error generating token:", error);
      throw error;
    }
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      console.error("Error verifying token:", error);
      throw error;
    }
  }
}
