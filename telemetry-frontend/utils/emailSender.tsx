import axios from "axios";
import router from "next/router";

export const handleSendEmail = async (targetEmail:string,subject:string,message:string) => {
    console.log(targetEmail);
    console.log(subject);
    console.log(message);
    try {
      await axios.post('/api/emailsendapi', {
        to: targetEmail,
        subject: subject,
        text: message,
        html:  `
        <html>
          <head>
            <title>Email Verification</title>
          </head>
          <body>
            <p>${message}</p>
          </body>
        </html>
      `,
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

const handleVerifyEmail = (targetEmail:string,subject:string,message:string,userName:string)=>{
    const link = handleToken(userName,targetEmail);
    handleSendEmail(targetEmail,subject,message+""+link);
  }


    export const handleToken=(userName:string,targetEmail:string)=>{
    const generatedToken = generateToken(10);
    //random generation
    handleTokenUpdate(generatedToken,userName);
    const queryParams = `Token=${generatedToken}&username=${userName}&email=${targetEmail}`;
    return `localhost:3000/verify?${queryParams}`;
    }

  export const generateToken=(length:number)=>{
    const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    token += charset.charAt(randomIndex);
  }

  return token;
  }

  const handleTokenUpdate = async (newToken:string,userName:string)=>{
    const newValue=newToken;
    const target="token";
    try {
      await axios.post("/api/changeuserdataapi", {newValue,userName,target});
   }
   catch (error) {
     console.error("Error checking for user:", error);
   }
  }


export default handleVerifyEmail;


