/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/sequelize/sequelize.d.ts" />
/// <reference path="../../../typings/express/express.d.ts" />

var model = require('./models');
var User = model.User;

// username, email, password, permission is required.

var addUser = function(firstName, lastName, username, email, password, permission, language){
    
    firstName = firstName || '';
    lastName = lastName || '';
    permission = permission || 1;
    language = language || 'zh-tw';
    
    return User.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        permission: permission, 
        language: language,
        locked: false
    })
    .then(function(user){
        return deleteSensitiveInformation(user);
    })
    .catch(function(err){
        console.log("Add user failed - " + err);  
        throw(err);
    });
}

var editUser = function(uid, firstName, lastName, username, email, password, permission, language){
    return User.findById(uid)
    .then(function(user){
       if(firstName) user.firstName = firstName;
       if(lastName) user.lastName = lastName;
       if(email) user.email = email;
       if(password) user.password = password;
       if(permission) user.permission = permission;
       if(language) user.language = language;
       return user.save()
       .catch(function(err){
           console.error('Edit user failed - ' + err);
       });
    })
    .catch(function(err){
        console.error('Edit user failed - ' + err);
    });
}

var getUserById = function(uid, getAllData){
    if (getAllData) return User.findById(uid);
    else {
        return User.findById(uid, 
        {attributes: ['firstName', 'lastName', 'username', 'email', 'permission', 'language', 'uid']})
    }
}

var getUserByEmail = function(email, getAllData){
    if(getAllData)
        return User.findOne({ where:{ email: email } });
    else {
        return User.findOne({
            where:{ email: email },
            attributes: ['firstName', 'lastName', 'username', 'email', 'permission', 'language', 'uid']
        });
    }
}

var deleteSensitiveInformation = function(user){
    if(user.password) delete user.password;
    if(user.createdAt) delete user.createdAt;
    if(user.updatedAt) delete user.updatedAt;
    
    if(user.dataValues.password) delete user.dataValues.password;
    if(user.dataValues.createdAt) delete user.dataValues.createdAt;
    if(user.dataValues.updatedAt) delete user.dataValues.updatedAt;
    
    return user;
}

module.exports.addUser = addUser;
module.exports.editUser = editUser;
module.exports.getUserById = getUserById;
module.exports.getUserByEmail = getUserByEmail;
module.exports.deleteSensitiveInformation = deleteSensitiveInformation;