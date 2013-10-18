
module.exports = process.dataset = process.dataset || (function () {
    var keyValueStorage = p = {};
    var dataset = Object.create(null);

    var finalize = function (key) {
        var desc = Object.getOwnPropertyDescriptor(dataset, key);
        desc.configurable = false;
        desc.writable = false;
        if (typeof dataset[key] === 'object') {
            Object.preventExtensions(dataset[key]);
        }
    };

    var clone = function (o) { // i'm lazy... sorry. tell me if you really need it
        return JSON.parse(JSON.stringify(o));
    };

    p.set = function (key, value, final) {
        dataset[key] = value;
        final && finalize(key);
    };
    p.get = function (key) {
        return dataset[key];
    };
    p.drop = function (key) {
        if (arguments.length > 1) {
            for (var i in arguments) {
                delete dataset[arguments[i]];
            }
            return;
        }
        delete dataset[key];
    };
    p.keys = function () {
        return Object.keys(dataset);
    };
    p.clone = function () {
        return clone(dataset);
    };
    p.dump = function () {
        console.log(dataset);
    };

    return Object.seal(Object.create(keyValueStorage));
}());
