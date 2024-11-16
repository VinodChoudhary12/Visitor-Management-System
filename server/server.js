import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import qrcode from 'qrcode';
import cors from 'cors'
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
app.use(bodyParser.json({ limit: '10mb' })); // Adjust '10mb' as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'visitor_management'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

const generateQRCode = async (data) => {
    try {
        const qrCodeUrl = await qrcode.toDataURL(data); // Generate QR code as base64
        return qrCodeUrl; // Return base64 string
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw err; // Throw error to handle it later
    }
};





// Assuming Express and necessary middleware are already set up

// Assuming Express is already set up and database connection is established








// API to generate and store QR Code

// Visitor Meeting Request
app.post('/request-meeting', async (req, res) => {
    const { name, email, phone, meeting_time, meetingTo, Description, meetingToName, CompanyName } = req.body;

    // SQL query to insert the visitor information into the database
    const sql = 'INSERT INTO visitors (name, email, phone, meeting_time, meetingTo, Description , view_By_Visitor,meetingToName ,visitorCompany) VALUES (?, ?, ?, ?, ?, ?,1,?,?)';
    db.query(sql, [name, email, phone, meeting_time, meetingTo, Description, meetingToName, CompanyName], async (err, result) => {
        if (err) {
            console.error("Database insert error:", err);
            return res.status(500).json({ message: 'Error saving meeting request.' });
        }

        const visitorId = result.insertId; // Get the inserted visitor ID
        const qrData = `${visitorId}`;

        try {
            const qrCodeUrl = await generateQRCode(qrData); // Generate QR code
            const updateSql = 'UPDATE visitors SET qr_code = ? WHERE id = ?';
            db.query(updateSql, [qrCodeUrl, visitorId], (err) => {
                if (err) {
                    console.error("Database update error:", err);
                    return res.status(500).json({ message: 'Error saving QR code.' });
                }
                res.json({ message: 'Meeting Request Sent!', qr_code: qrCodeUrl });
            });
        } catch (err) {
            console.error('Error generating QR code:', err);
            res.status(500).json({ message: 'Error generating QR code' });
        }
    });
});

app.get('/qr-code/:id', (req, res) => {
    const visitorId = req.params.id;
    const sql = 'SELECT * FROM visitors WHERE id = ?';

    db.query(sql, [visitorId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database query error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        const qrCodeUrl = results[0];
        res.json({ qr_code: qrCodeUrl });
    });
});



// app.get('/visitor/:id', (req, res) => {
//     const visitorEmail = req.params.id;

//     // SQL query to join visitors and visitorAccount tables based on email
//     const sql = `
//         SELECT 
//             v.id AS visitor_id, 
//             v.name AS visitor_name, 
//             v.email AS visitor_email, 
//             v.phone AS visitor_phone, 
//             v.meeting_time, 
//             v.status, 
//             v.qr_code, 
//             v.entry_time, 
//             v.exit_time, 
//             v.meetingTo, 
//             v.Description, 
//             v.view_By_user, 
//             v.remark_By_User, 
//             v.view_By_Visitor,
//             va.email AS account_email, 
//             va.image AS account_image
//         FROM 
//             visitors v
//         LEFT JOIN 
//             visitorAccount va ON va.email = v.email 
//         WHERE 
//             v.email = ?
//     `;

//     db.query(sql, [visitorEmail], (err, result) => {
//         if (err) throw err;
//         if (result.length > 0) {
//             const visitor = result[0];

//             // Convert the image (if it exists) from Buffer to Base64 format
//             if (visitor.account_image) {
//                 visitor.account_image = visitor.account_image.toString('base64');
//                 visitor.account_image = `data:image/jpeg;base64,${visitor.account_image}`;
//             }

//             // Send the result as JSON
//             res.json(visitor);
//         } else {
//             res.status(404).json({ message: 'Visitor not found' });
//         }
//     });
// });


// app.get('/visitor/:id', (req, res) => {
//     const visitorId = req.params.id;

//     // SQL query to join visitors and visitoraccount tables based on visitor_id foreign key
//     const sql = 'Select * from visitors where id = ?'

//     db.query(sql, [visitorId], (err, result) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             res.status(500).json({ message: 'Database query error' });
//             return;
//         }

//         if (result.length > 0) {
//             const visitor = result[0];

//             // Convert the image (if it exists) from Buffer to Base64 format
//             if (visitor.account_image) {
//                 visitor.account_image = visitor.account_image.toString('base64');
//                 visitor.account_image = `data:image/jpeg;base64,${visitor.account_image}`;
//             }

//             // Send the result as JSON
//             res.json(visitor);
//         } else {
//             res.status(404).json({ message: 'Visitor not found' });
//         }
//     });
// });


app.get('/visitor/:id', (req, res) => {
    const visitorId = req.params.id;

    // SQL query to join visitors and visitoraccount tables based on the email field
    const sql = `
        SELECT 
            v.*, 
            va.image AS account_image 
        FROM 
            visitors v
        LEFT JOIN 
            visitoraccount va ON va.email = v.email 
        WHERE 
            v.id = ?
    `;

    db.query(sql, [visitorId], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ message: 'Database query error' });
            return;
        }

        if (result.length > 0) {
            const visitor = result[0];

            // Convert the image (if it exists) from Buffer to Base64 format
            if (visitor.account_image) {
                visitor.account_image = visitor.account_image.toString('base64');
                visitor.account_image = `data:image/jpeg;base64,${visitor.account_image}`;
            }

            // Send the result as JSON
            res.json(visitor);
        } else {
            res.status(404).json({ message: 'Visitor not found' });
        }
    });
});




app.get('/users', (req, res) => {
    const sql = "SELECT * FROM USERS WHERE role !='SECURITY'";
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            result.forEach(user => {
                if (user.image) {
                    // Convert the Buffer to Base64
                    user.image = user.image.toString('base64');
                    // Optionally add the data URI prefix for proper rendering in img tag
                    user.image = `data:image/jpeg;base64,${user.image}`;
                }
            });
            res.json(result);
        } else {
            res.status(404).json({ message: 'Users not found' });
        }
    });
});


app.get("/my-metting/:name", (req, res) => {
    const name = req.params.name;
    const selectSql = `
        SELECT id, name, email, phone, meetingTo, meetingToName,visitorCompany,
               DATE_FORMAT(meeting_time, "%Y-%m-%d %H:%i:%s") AS meeting_time, 
               entry_time, exit_time, Description, qr_code, status, view_By_user 
        FROM visitors 
        WHERE meetingTo = ? AND meeting_time >= NOW() ORDER BY meeting_time ASC`;
    const updateSql = 'UPDATE visitors SET view_By_user = TRUE WHERE meetingTo = ?';

    // Run the SELECT query with formatted meeting_time and future filtering
    db.query(selectSql, name, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            // Run the UPDATE query to set view_By_user to TRUE
            db.query(updateSql, name, (updateErr) => {
                if (updateErr) throw updateErr;

                // Send the retrieved data after updating
                res.json(result);
            });
        } else {
            res.status(404).json({ message: 'Visitor not found' });
        }
    });
});





app.get("/pendingMeetings/:name", (req, res) => {
    const name = req.params.name;
    const selectSql = `
        SELECT id, name, email, phone, meetingTo,meetingToName,visitorCompany,
               DATE_FORMAT(meeting_time, "%Y-%m-%d %H:%i:%s") AS meeting_time, 
               entry_time, exit_time, Description, qr_code, status, view_By_user 
        FROM visitors 
        WHERE meetingTo = ? AND status = 'PENDING' AND meeting_time >= NOW() 
        ORDER BY meeting_time ASC`;

    // Run the SELECT query with formatted meeting_time and future filtering
    db.query(selectSql, [name], (err, result) => {
        if (err) {
            console.error(err); // log error details for troubleshooting
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.length > 0) {
            res.json(result); // Send result if records are found
        } else {
            res.status(404).json({ message: 'No pending meetings found' });
        }
    });
});

app.get("/todayUserMeetings/:name", (req, res) => {
    const name = req.params.name;

    // SQL Query to select upcoming meetings for the specified user
    const selectSql = `
        SELECT id, name, email, phone, meetingTo, meetingToName,visitorCompany,
               DATE_FORMAT(meeting_time, "%Y-%m-%d %H:%i:%s") AS meeting_time, 
               entry_time, exit_time, Description, qr_code, status, view_By_user 
        FROM visitors 
        WHERE meetingTo = ? AND DATE(meeting_time) = CURDATE()
        ORDER BY meeting_time ASC
    `;

    // SQL Query to update view_By_user to TRUE for the specified user
    const updateSql = 'UPDATE visitors SET view_By_user = TRUE WHERE meetingTo = ?';

    db.query(selectSql, [name], (err, result) => {
        if (err) {
            console.error("Error fetching meetings:", err);
            res.status(500).json({ error: "An error occurred while fetching meetings." });
            return;
        }
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: 'No upcoming meetings found for this user.' });
        }
    });
});

//This is not Good make this proper
app.get('/bellIcon/:name', (req, res) => {
    const name = req.params.name;
    const selectSql = 'SELECT id, name, email, phone, meetingTo,meetingToName,visitorCompany, DATE_FORMAT(meeting_time, "%Y-%m-%d %H:%i:%s") AS meeting_time, entry_time, exit_time, Description, qr_code, status, view_By_user FROM visitors WHERE meetingTo = ? AND view_By_user = false';
    db.query(selectSql, name, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result); // Return the first visitor details
        } else {
            res.status(200).json({ message: 'Visitor not found' });
        }
    });
})

function formatMeetingTime(meetingTime) {
    const date = new Date(meetingTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0'); // 24-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}





app.post('/visitor/status/:id', (req, res) => {
    const visitorId = req.params.id;
    const { status } = req.body;
    const time = formatMeetingTime(new Date()); // Formatted current date-time

    let sql = '';

    if (status === "CHECKED_IN") {
        sql = `UPDATE visitors SET status = ?, entry_time = ? WHERE id = ?;`;
    } else {
        sql = `UPDATE visitors SET status = ?, exit_time = ? WHERE id = ?;`;
    }
    db.query(sql, [status, time, visitorId], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Visitor status updated', time });
    });
});


app.post('/approve/:id', (req, res) => {
    const visitorId = req.params.id;
    const { status, remark_By_User } = req.body;

    if (!status) {
        return res.status(400).json({ "Error": "Status is missing or invalid" });
    }

    try {

        const sql = remark_By_User
            ? 'UPDATE visitors SET status = ?, view_By_Visitor = 0, remark_By_User = ? WHERE id = ?'
            : 'UPDATE visitors SET status = ?, view_By_Visitor = 0 WHERE id = ?';




        // Parameters for SQL query
        const params = remark_By_User ? [status, remark_By_User, visitorId] : [status, visitorId];
        // console.log("SQL Query:", sql);
        // console.log("Parameters:", params);

        // Execute the query
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred while updating the status.' });
            }

            const message = status === "APPROVED" ? 'Visitor Approved' : 'Visitor Rejected';
            return res.status(200).json({ message });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while processing the request.', err });
    }
});





app.post('/signup', upload.single('image'), async (req, res) => {
    const { name, username, password, role, location } = req.body;
    const imageBuffer = req.file ? req.file.buffer : null;

    try {
        // Hash the password for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert user data with hashed password and image
        const sql = 'INSERT INTO users (name, username, password, role, location, image) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [name, username, hashedPassword, role, location, imageBuffer], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: 'Error adding user' });
            }
            res.status(200).json({ message: 'User added successfully' });
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ error: 'Error while signing up user' });
    }
});
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

//     db.query(sql, [username, password], (err, results) => {
//         if (err) {
//             console.error('Error querying database:', err);
//             return res.status(500).json({ success: false, message: 'Internal server error' });
//         }

//         if (results.length > 0) {
//             const user = results[0];

//             // Check if the user has an image stored in the database
//             if (user.image) {
//                 // Convert the image Buffer to a Base64 string
//                 const base64Image = Buffer.from(user.image).toString('base64');
//                 user.image = base64Image; // Update the user object with the Base64 string
//             }

//             // Send the user object (with Base64 image) back in the response
//             res.status(200).json({ success: true, user, message: 'Login successful' });
//         } else {
//             res.status(401).json({ success: false, message: 'Invalid username or password' });
//         }
//     });
// });

// app.post('/VisitorLogin', (req, res) => {
//     const { email, password } = req.body;
//     const sql = 'SELECT * FROM visitoraccount WHERE email = ? AND password = ?'; // Corrected "password"

//     db.query(sql, [email, password], (err, results) => {
//         if (err) {
//             console.error('Error querying database:', err);
//             return res.status(500).json({ success: false, message: 'Internal server error' });
//         }

//         if (results.length > 0) {
//             // Assuming the image is stored as a Buffer in the "image" column
//             const user = results[0];

//             // Convert the image Buffer to Base64 string (if an image exists)
//             if (user.image) {
//                 const base64Image = Buffer.from(user.image).toString('base64');
//                 user.image = base64Image; // Update the user object with the Base64 string
//             }

//             res.status(200).json({ success: true, user, message: 'Login successful' });
//         } else {
//             res.status(401).json({ success: false, message: 'Invalid username or password' });
//         }
//     });
// });



app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query to retrieve user data based on username
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        // Check if a user was found with the given username
        if (results.length > 0) {
            const user = results[0];

            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                // Check if the user has an image stored in the database
                if (user.image) {
                    // Convert the image Buffer to a Base64 string
                    user.image = Buffer.from(user.image).toString('base64');
                }

                // Send the user object (with Base64 image) back in the response
                res.status(200).json({ success: true, user, message: 'Login successful' });
            } else {
                // If the password does not match
                res.status(401).json({ success: false, message: 'Invalid password' });
            }
        } else {
            // If no user was found with the given username
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});



app.post('/VisitorLogin', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM visitoraccount WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (results.length > 0) {
            const user = results[0];

            // Verify the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                // Create a JWT token
                // const token = jwt.sign({ email: user.email, id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });

                // Convert the image Buffer to Base64 string if it exists
                if (user.image) {
                    user.image = Buffer.from(user.image).toString('base64');
                }

                res.status(200).json({ success: true, user, message: 'Login successful' });
            } else {
                res.status(401).json({ success: false, message: 'Invalid password' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});

app.post('/updateProfile', (req, res) => {
    const { email, name, image, id, Phone, role } = req.body; // Including 'role' in the request body

    const sql = 'UPDATE visitoraccount SET name = ?, email = ?, Phone = ? , image = ? WHERE id = ?';
    let usersql = ''; // Default usersql query to be empty

    // Check if the 'role' attribute exists in the request body
    if (role) {
        usersql = 'UPDATE users SET name = ?, username = ? , image = ? WHERE id = ?';
    }

    // Convert the base64 image back to a buffer before saving to the database
    const imageBuffer = image ? Buffer.from(image, 'base64') : null;

    // Update visitor account table
    db.query(sql, [name, email, Phone, imageBuffer, id], (err, results) => {
        if (err) {
            console.error('Error updating profile:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        // If role exists, update the users table as well
        if (usersql) {
            db.query(usersql, [name, email, imageBuffer, id], (err, results) => {
                if (err) {
                    console.error('Error updating users table:', err);
                    return res.status(500).json({ success: false, message: 'Error updating users table' });
                }

                return res.status(200).json({ success: true, message: 'Profile updated successfully' });
            });
        } else {
            // If no role is provided, just respond after updating the visitor account
            return res.status(200).json({ success: true, message: 'Profile updated successfully' });
        }
    });
});












// Check-In Visitor (Security)
app.post('/api/verify-qr-code', (req, res) => {
    const { qrCodeData } = req.body;

    // Validate the QR code data with your database
    const visitor = findVisitorByQRCode(qrCodeData);

    if (visitor) {
        res.status(200).json({ success: true, visitor });
    } else {
        res.status(404).json({ success: false, message: 'Invalid QR Code' });
    }
});



//this is correct
// app.post('/addVisitor', upload.single('image'), (req, res) => {
//     const { name, phone, email, password } = req.body;
//     const imageBuffer = req.file ? req.file.buffer : null; // Get the image as buffer

//     // SQL query to insert visitor data along with image (stored as BLOB)
//     const sql = 'INSERT INTO visitoraccount (name, phone, email, password, image) VALUES (?, ?, ?, ?, ?)';
//     db.query(sql, [name, phone, email, password, imageBuffer], (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(200).json({ message: 'Visitor added successfully' });
//     });
// });


app.post('/addVisitor', upload.single('image'), async (req, res) => {
    const { name, phone, email, password, CompanyName } = req.body;
    const imageBuffer = req.file ? req.file.buffer : null;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password

        // SQL query to insert visitor data along with hashed password and image
        const sql = 'INSERT INTO visitoraccount (name, phone, email, password, image ,CompanyName) VALUES (?, ?, ?, ?, ? ,?)';
        db.query(sql, [name, phone, email, hashedPassword, imageBuffer, CompanyName], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: 'Visitor added successfully' });
        });
    } catch (err) {
        res.status(500).json({ error: 'Error while adding visitor' });
    }
});



app.get('/VisitorMettings/:email', (req, res) => {
    const email = req.params.email;
    const selectSql = 'SELECT id, meetingToName, name, email, phone, meetingTo,meetingToName, DATE_FORMAT(meeting_time, "%Y-%m-%d %H:%i:%s") AS meeting_time, entry_time, exit_time, Description, qr_code, status, view_By_user ,remark_By_User FROM visitors WHERE email = ? AND meeting_time >= NOW() ORDER BY meeting_time ASC';
    db.query(selectSql, email, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result); // Return the first visitor details
        } else {
            res.status(200).json({ message: 'Visitor not found' });
        }
    });
})
app.get("/getNotifications/:email", (req, res) => {
    const email = req.params.email;
    const query = `SELECT * FROM visitors WHERE email = ? AND view_By_Visitor = 0`;

    db.query(query, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(results);
    });
});

app.put("/markNotificationsAsViewed", (req, res) => {
    const email = req.body.email;
    const query = `UPDATE visitors SET view_By_Visitor = 1 WHERE email = ? AND view_By_Visitor = 0`;

    db.query(query, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: "Notifications marked as viewed." });
    });
});

app.get('/metting/:id', (req, res) => {
    const id = req.params.id;
    const selectSql = 'SELECT id, name, email, phone, meetingTo, DATE_FORMAT(meeting_time, "%Y-%m-%d %H:%i:%s") AS meeting_time, entry_time, exit_time, Description, qr_code, status, view_By_user ,remark_By_User FROM visitors WHERE id = ?';
    db.query(selectSql, id, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result); // Return the first visitor details
        } else {
            res.status(404).json({ message: 'Visitor not found' });
        }
    });
})


app.get("/cancelMeeting/:visitorId", (req, res) => {
    const id = req.params.visitorId;
    const updateQuery = "UPDATE visitors SET status = 'CANCELED' WHERE id = ?";

    db.query(updateQuery, [id], (err, result) => {
        if (err) throw err;

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Meeting successfully canceled" });
        } else {
            res.status(404).json({ message: "Visitor not found" });
        }
    });
});
app.get('/todayMeetings/:email', (req, res) => {
    const email = req.params.email;
    const selectSql = `
        SELECT id, name, email, phone, meetingTo, visitorCompany,meetingToName,
               DATE_FORMAT(meeting_time, "%Y-%m-%d %H:%i:%s") AS meeting_time, 
               entry_time, exit_time, Description, qr_code, status, 
               view_By_user, remark_By_User 
        FROM visitors 
        WHERE email = ? 
          AND DATE(meeting_time) = CURDATE() 
        ORDER BY meeting_time ASC
    `;

    db.query(selectSql, [email], (err, result) => {
        if (err) {
            console.error("Error fetching today's meetings:", err);
            res.status(500).json({ error: "An error occurred while fetching today's meetings." });
            return;
        }

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(200).json({ message: 'No meetings found for today.' });
        }
    });
});











app.get('/TodayAllMeetings', (req, res) => {
    const selectSql = `
        SELECT * 
        FROM visitors 
        WHERE status = 'APPROVED' 
          AND DATE(meeting_time) = CURDATE() 
        ORDER BY meeting_time ASC
    `;

    try {
        db.query(selectSql, (err, result) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ message: "Database query error", error: err });
            }

            //console.log("Query result:", result); // Debugging log

            if (result.length > 0) {
                res.json(result);
            } else {
                //console.log(selectSql);

                res.status(200).json({ message: 'No Meetings Today' });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ message: "Something went wrong", error });
    }
});





app.post('/reset-password', async (req, res) => {
    const { email, newPassword, username } = req.body;

    if (!newPassword || (!email && !username)) {
        return res.status(400).json({ error: 'Username, email, and new password are required.' });
    }

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Query to check if user exists in the `users` table
        const queryUser = 'SELECT * FROM users WHERE username = ? LIMIT 1';
        const queryVisitor = 'SELECT * FROM visitoraccount WHERE email = ? LIMIT 1';

        // First, check in the `users` table by username
        db.query(queryUser, [username], (err, userResult) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            if (userResult.length > 0) {
                // Update password for user in `users` table
                const updateQuery = 'UPDATE users SET password = ? WHERE username = ?';
                db.query(updateQuery, [hashedPassword, username], (updateErr) => {
                    if (updateErr) return res.status(500).json({ error: 'Error updating password' });
                    return res.status(200).json({ message: 'Password updated successfully for user.', table: 'users' });
                });
            } else {
                // If not found in `users`, check in `visitoraccount` by email
                db.query(queryVisitor, [email], (err, visitorResult) => {
                    if (err) return res.status(500).json({ error: 'Database error' });

                    if (visitorResult.length > 0) {
                        // Update password for visitor in `visitoraccount` table
                        const updateQuery = 'UPDATE visitoraccount SET password = ? WHERE email = ?';
                        db.query(updateQuery, [hashedPassword, email], (updateErr) => {
                            if (updateErr) return res.status(500).json({ error: 'Error updating password' });
                            return res.status(200).json({ message: 'Password updated successfully for visitor.', table: 'visitoraccount' });
                        });
                    } else {
                        // If neither email nor username found in any table
                        return res.status(404).json({ error: 'Username or email not found in users or visitors.' });
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ error: 'Error processing password reset.' });
    }
});


// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
