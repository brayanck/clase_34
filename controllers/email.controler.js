const nodemailer = require("nodemailer");
const { MAIL_ID, MP } = require('../config/config');

const sendEmail = async (data) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: MAIL_ID,
                pass: MP,
            }
        });

        const info = await transporter.sendMail({
            from: '"Hey" <abc@gmail.com>', 
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html
        });

        req.logger.info("Message sent: %s", info.messageId);
        req.logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        req.logger.warn("Error sending email:", error);
    }
};

module.exports = sendEmail;