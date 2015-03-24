/**
 * Created by bogdan on 24.03.15.
 */
var memcached = require("memcached"),
    config = require("config"),
    client = new memcached([config.memcached.host, config.memcached.port].join(':')),
    Q = require("q");

module.exports = {

    get: function (key) {
        var deferred = Q.defer();

        client.get(key, function (err, result) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    },


    set: function (key, value, ttl) {
        var deferred = Q.defer();

        client.set(key, value,ttl, function (err, result) {

            console.log(err);
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    },


    delete: function (key) {

        var deferred = Q.defer();

        client.del(key, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }
};