const bcrypt = require("bcrypt");

//hashed password
exports.hashedPassword = (password)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(10, (err,salt)=>{
            if(err){
                reject(err);
                }
                bcrypt.hash(password, salt, (err,hash)=>{
                    if(err){
                        reject(err);
                        }
                        resolve(hash);
                        });
        });
    });
    
}
//compare password
exports.comparePassword = (password, hash)=>{
        return bcrypt.compare(password, hash);
    }