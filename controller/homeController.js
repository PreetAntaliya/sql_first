const connection = require('../config/db')
const fs = require('fs')

const home = (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const formattedData = rows.map(user => ({
            id: user.id,
            name: user.name,
            mobile: user.mobile,
            profile_pic: user.profile_pic,
        }));

        res.render('index', { formattedData });
    });
};

const adduser = async (req, res) => {
    try {
        const { name, mobile } = req.body;
        const profilePic = req.file.path;
        const result = await connection.query('INSERT INTO users (name, mobile, profile_pic) VALUES (?, ?, ?)', [name, mobile, profilePic]);
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.query.id;
        const result = await connection.query('DELETE FROM users WHERE id = ?', userId);
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const editPage = async (req, res) => {
    try {
        const userId = req.query.id;
        const query = 'SELECT * FROM users WHERE id = ?';
        connection.query(query, [userId], (err, rows, fields) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            if (!rows || rows.length === 0) {
                return res.status(404).send('User not found');
            }

            const user = rows[0];
            res.render('edit', { user });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};



const updateUser = async (req, res) => {
    console.log("Update user route called");
    console.log("Request Body:", req.body);
    try {
        const userId = req.body.id;
        const { name, mobile } = req.body;
        let profilePic = req.body.oldProfilePic;
        
        if (req.file) {
            profilePic = req.file.path;
            await fs.unlinkSync(req.body.oldProfilePic);
        }
        
        const result = await connection.query('UPDATE users SET name = ?, mobile = ?, profile_pic = ? WHERE id = ?', [name, mobile, profilePic, userId]);
        console.log("Result of Update:", result);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    home,
    adduser,
    deleteUser,
    updateUser,
    editPage
};