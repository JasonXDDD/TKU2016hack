var Restaurant = require('./models').Restaurant;
var EatLog = require('./models').EatLog;
var User = require('../user/models').User;
var sequelize = app.db;

var addRestaurant = function(creator, name, address, lat, lng, area, suiteTime, avarage_cost, mealType){
    var restaurant, user;
    return sequelize.transaction(function(t){
        return Restaurant.create({
            name: name,
            address: address,
            lat: lat,
            lng: lng,
            area: area,
            suiteTime: suiteTime,
            avarage_cost: avarage_cost,
            mealType: mealType
        }, {transaction: t})
        .then(function(_restaurant){
            restaurant = _restaurant;
            return User.findById(creator)
        }) 
        .then(function(_user){
            user = _user;
            return user.addRestaurant(restaurant, {transaction: t});
        })
        .then(function(){
            return restaurant.setCreator(user, {transaction: t});
        })
        .catch(function(err){
            console.error('Add restaurant error!', err);
        })
    }) 
};

var getRestaurant = function(id){
    return Restaurant.findById(id);
}

var getRestaurantListByArea = function(area){
    return Restaurant.findAll({
        where: {
            area: area
        }
    })
}

var editRestaurant = function(id, name,address, lat, lng, area, suiteTime, avarage_cost, mealType){
    return sequelize.transaction(function(t){
        return Restaurant.findById(id)
        .then(function(_restaurant){
            tmpRestaurant = _restaurant;
            
            if(name) tmpRestaurant.name = name;
            if(address) tmpRestaurant.address = address;
            if(lat) tmpRestaurant.lat = lat;
            if(lng) tmpRestaurant.lng = lng;
            if(area) tmpRestaurant.area = area;
            if(suiteTime) tmpRestaurant.suiteTime = suiteTime;
            if(avarage_cost) tmpRestaurant.avarage_cost = avarage_cost;
            if(mealType) tmpRestaurant.mealType = mealType;
            
            return tmpRestaurant.save({transaction: t});
        }) 
    }) 
}

var deleteRestaurant = function(id){
    return sequelize.transaction(function(t){
       return Restaurant.findById(id)
        .then(function(_restaurant){
            return _restaurant.destroy({transaction: t});
        }) 
    }) 
}

var addEatLog = function(creator, restaurant_id, content, cost, date){
    var eatLog, user, restaurant;
    return sequelize.transaction(function(t){
        return EatLog.create({
            content: content,
            cost: cost,
            date: new Date(date)
        }, {transaction: t})
        .then(function(_eatlog){
            eatLog = _eatlog;
            return User.findById(creator)
        })
        .then(function(_user){
            user = _user;
            return Restaurant.findById(restaurant_id);
        })
        .then(function(_restaurant){
            restaurant = _restaurant;
            return user.addEatLog(eatLog, {transaction: t});
        })
        .then(function(){
            return restaurant.addEatLog(eatLog, {transaction: t});
        })
        .then(function(){
            return eatLog.setRestaurant(restaurant, {transaction: t});
        })
        .then(function(){
            return eatLog.setCreator(user, {transaction: t});
        })
        .catch(function(err){
            console.error('Add eatlog error!', err);
            t.rollback();
        })
    }) 
}

var getEatLog = function(id){
    return EatLog.findById(id);
}

var getEatLogListByUser = function(userId){
    return EatLog.findAll({
        where: { creatorUid: userId }
    });
}

var editEatLog = function(id, content, cost, date){
    return sequelize.transaction(function(t){
        return EatLog.findById(id)
        .then(function(_eatlog){
            tmpEatLog = _eatlog;
            
            if(content) tmpEatLog.content = content;
            if(cost) tmpEatLog.cost = cost;
            if(date) tmpEatLog.date = new Date(date);
            
            return tmpEatLog.save({transaction: t});
        }) 
    }) 
}

var deleteEatLog = function(id){
    return sequelize.transaction(function(t){
       return EatLog.findById(id)
        .then(function(_eatlog){
            return _eatlog.destroy({transaction: t});
        }) 
    }) 
}

module.exports.addRestaurant = addRestaurant;
module.exports.getRestaurant = getRestaurant;
module.exports.editRestaurant = editRestaurant;
module.exports.deleteRestaurant = deleteRestaurant;
module.exports.getRestaurantListByArea = getRestaurantListByArea;

module.exports.addEatLog = addEatLog;
module.exports.getEatLog = getEatLog;
module.exports.getEatLogListByUser = getEatLogListByUser;
module.exports.editEatLog = editEatLog;
module.exports.deleteEatLog = deleteEatLog;
