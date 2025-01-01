const bcrypt = require('bcrypt');

const password = 'Admin@123'; // mật khẩu mới

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    console.log('Hashed password:', hash);
    console.log('\nSQL Query:');
    console.log(`UPDATE users SET password = '${hash}' WHERE email = 'admin@gmail.com';`);
}); 