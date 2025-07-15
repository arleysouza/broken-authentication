import express from "express";
import { isLogged, loginInsecure, loginSecure, loginSecureExpire, logout, register } from "../controllers/UserController";
import { authentication, loginRateLimiter } from "../middewares";

const router = express.Router();

router.post("/login-insecure", loginInsecure);
router.post("/login-secure", loginRateLimiter, loginSecure); // Exercício 1
router.post("/login-rate-limiter", loginRateLimiter, loginInsecure); // Exercício 1
router.post("/register", register); // Exercício 2
router.post("/login-expire", loginRateLimiter, loginSecureExpire);  // Exercício 3
router.post("/logout", logout); // Exercício 3
router.post("/is-logged", authentication, isLogged);  // Exercício 3

export default router;