import axios from 'axios';
import React, { useState } from 'react';

function EmailSender() {
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = async () => {
    try {
      await axios.post('/api/emailsendapi', {
        to: 'maxbm10@icloud.com',
        subject: 'Max test email',
        text: 'My test worked',
        html: '<p>This is the HTML content of the email</p>',
      });
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      {emailSent ? (
        <p>Email sent successfully!</p>
      ) : (
        <button onClick={handleSendEmail}>Send Email</button>
      )}
    </div>
  );
}

export default EmailSender;

