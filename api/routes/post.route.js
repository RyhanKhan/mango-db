import express from "express";
import {
  postpH,
  postPrecipitation,
  postHumidity,
  postNitrogenContent,
  postSoilMoisture,
  postTemperature,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/ph", postpH);

router.post("/humidity", postHumidity);

router.post("/nitrogen-content", postNitrogenContent);

router.post("/soil-moisture", postSoilMoisture);

router.post("/temperature", postTemperature);

router.post("/precipitation", postPrecipitation);

export default router;
