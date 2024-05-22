// function to ensure async errors are passed to the error-handling middleware, avoiding unhandled promise rejections

module.exports = func => { // function that takes another function as an argument
    return (req, res, next) => {
        func(req, res, next).catch(next); // if function returns a rejected promise, error is caught and passed to the next middleware
    }
}