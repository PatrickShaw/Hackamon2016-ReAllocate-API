var nodemailer = require('nodemailer');

exports.sendSuccessEmail = function sendEmail(recipientEmail, swappedIntoClass) {
    var authData = './mailer_config.json';
    var transporter = nodemailer.createTransport(
        {service: 'Gmail', auth: {user: authData.username, pass: authData.password}}
    );

    var mailOptions = {
        from: authData.username,                                                     // sender address
        to: recipientEmail,
        subject: 'ReAllocate: Swap',                                                 // Subject line
        text: 'ReAllocate has swapped you into ' + swappedIntoClass.unitCode + 
               ' ' + swappedIntoClass.type + ' at ' + swappedIntoClass.time + 
               ', ' + swappedIntoClass.location
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Message error: " + error);

        } else {
            console.log('Message sent: ' + info.response);

        }

    });

};

