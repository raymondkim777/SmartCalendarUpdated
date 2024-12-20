import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});
transporter.verify((error, success) => {
    if (error) {
      console.error('Nodemailer configuration error:', error);
    } else {
      console.log('Nodemailer is ready to send emails');
    }
  });
  

export async function POST(request) {
  try {
    const { routes, user } = await request.json(); // Parse JSON body from request
    console.error('the routes', user);
    if (!Array.isArray(routes)) {
      return new Response(JSON.stringify({ message: 'Invalid input format. "routes" must be a list of lists.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    routes.forEach((routeList) => {
        if (Array.isArray(routeList) && routeList.length > 0) {
          const firstEntry = routeList[0]; // No need for Object.fromEntries here
          console.error('what time is it handler:', firstEntry);
      
          if (firstEntry.start && !isNaN(new Date(firstEntry.start).getTime())) {
            const startTime = new Date(firstEntry.start);
            const emailSendTime = Date.now();
            const delay = 2
            console.error('Calculated delay (ms):', delay);
      
            if (delay > 0) {
              console.error('Scheduling email for:', emailSendTime);
              setTimeout(() => {
                sendEmailNotification(firstEntry, user);
              }, delay);
            } else {
              console.warn('Event time has already passed. No email scheduled.');
            }
          } else {
            console.error('Invalid or missing start time in entry:', firstEntry);
          }
        } else {
          console.error('Invalid or empty routeList:', routeList);
        }
      });
      

    return new Response(JSON.stringify({ message: 'Email notifications scheduled successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in sendemail handler:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


function sendEmailNotification(entry, user) {
  console.error('what time is it handler:', Date.now());
  
  // Convert the entry.start ISO string to a readable format
  const eventDate = new Date(entry.start); // Convert ISO string to Date object
  const readableDate = eventDate.toLocaleString('en-US', { 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true // Use 12-hour format
  });

  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user, // Use the user's email passed from the API call
      subject: `Your Smart Calendar Reminder: ${entry.name}`,
      text: `To make your Upcoming Event: ${entry.name}.
      You should go at ${readableDate}. Description: ${entry.description}`,
  };

  console.log('Sending email with options:', mailOptions);
  // Send the email using your mail-sending service here



transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
}

