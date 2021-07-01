var curry = function (fn) {
    var args = [].slice.call(arguments, 1);
    console.log(args)
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        console.log(newArgs)
        return fn.apply(this, newArgs);
    };
};

function add(a, b) {
    return a + b;
}

curry((a)=>{console.log(a)},2,1)

// var addCurry = curry(add, 1, 2);