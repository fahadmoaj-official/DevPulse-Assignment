import { Router } from "express";
import { IssueController } from "./issues.controllers";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { canModifyIssues } from "../../middleware/isAuthorizeForModify";
import { canDeleteIssues } from "../../middleware/isAuthorizeForDelete";
const router = Router();


router.post("/",isAuthenticated,IssueController.CreateIssue);
router.get("/",IssueController.GetAllIssues);
router.get("/:id",IssueController.GetIssueById);
router.patch("/:id",isAuthenticated,canModifyIssues,IssueController.updateIssueById);
router.delete("/:id",isAuthenticated,canDeleteIssues,IssueController.DeleteIssueById);



export default router;