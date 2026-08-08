const express = require("express");
const router = express.Router();

const ScholarController = require("../controllers/scholar.controller.js");

const  authenticate  = require("../middlewares/authenticate.middleware.js");
const { authorizeScholar } = require("../middlewares/authorize.Middleware.js");


// Get all scholarships
router.get("/", ScholarController.Scholarship);


// Get single scholarship
router.get("/:id", ScholarController.show);

// Create scholarship
router.post(
    "/",
    authenticate,
    ScholarController.create
);


// Edit scholarship

router.put(
    "/:id",
    authenticate,
    authorizeScholar,
    ScholarController.Edit
);


// Delete scholarship

router.delete(
    "/:id",
    authenticate,
    authorizeScholar,
    ScholarController.Delete
);


module.exports = router;