import express from "express";
import {addUser, getUser} from "../controller/user.js";
import {newConversation, getConversation} from "../controller/conversation.js";
import {newMessage, getMessage} from "../controller/message.js";

const route = express.Router();

route.post('/add', addUser);
route.get('/users', getUser);

route.post('/conversation/add',newConversation);
route.post('/conversation/get',getConversation);

route.post('/message/add',newMessage);
route.get('/message/get/:id', getMessage);


export default route;