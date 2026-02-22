import {Resend} from 'resend';
import { ENV } from './env.js';

// import 'dotenv/config' ;  or
import dotenv from 'dotenv';
dotenv.config();

export const resendClient = new Resend(ENV.RESEND_API_KEY);

export const sender = {
    email : ENV.EMAIL_FROM,
    name : ENV.EMAIL_FROM_NAME,
};

// instead for writing, process.env.PORT ==> write ENV.PORT
