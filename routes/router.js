
import { Router } from "express";
import {send_otp_func, verify_otp_func} from '../controllers/email-otp-controller.js'
import upload from "../utilities/file_handler_func.js";
import { verify_upload_authorization } from "../controllers/upload-authorization-controller.js";
import {  upload_url_generator } from "../controllers/file-upload-controller.js";
import { upload_list_generator } from "../controllers/view-file-controller.js";
import { send_file_links_func } from "../controllers/email-file-controller.js";
import { delete_upload_func } from "../controllers/file_delete_controller.js";
import { verify_profile_otp_func } from "../controllers/profile-authorization-controller.js";
 
const router=Router() 



router.post('/request_otp',send_otp_func)
router.post('/verify_otp',upload.array('sharedFile'),verify_otp_func)

router.delete('/delete_upload',delete_upload_func)

router.post('/access_upload_authorization',verify_upload_authorization)

router.post('/verify_profile_otp',verify_profile_otp_func)

// router.get('/testing',testing_func)

router.post('/upload_url',upload_url_generator)
router.post('/get_upload_list',upload_list_generator)
router.post('/share_file_links',send_file_links_func)



export default router
