import { Router } from "express";
const router = Router();

router.get("/status", async (req, res) => {
    res.send("Ok");
});



export {router}