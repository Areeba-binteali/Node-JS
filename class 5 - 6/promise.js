// Three states of promise
// made promise -> new Promise(); -> state -> pending
// completed promise -> promise-result -> state -> resolve
// didn't complete a promise -> promise-error/empty -> state -> reject



function callPromise() {
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 1 resolved!");
        }, 2000)
    });

    const promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 2 resolved!");
        }, 4000)
    });

    console.log(promise1);
    console.log(promise2)
}

callPromise();

// promise1.then(console.log("promise 1 resolved"));
// promise2.then(console.log("promise 2 resolved"));

// promise1.then(console.log("Resolved promise 1")).then(promise2.then(console.log("Resolved promise 2")))

// promise1.then(console.log("Promise resolved!"))

