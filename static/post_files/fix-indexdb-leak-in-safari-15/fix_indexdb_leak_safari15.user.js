// ==UserScript==
// @name        Fix indexedDB leak
// @description Fixes the Safari 15 indexedDB database leaking by removing the databases() function.
// @author      Manual
// @version     1.3
// @updateURL   https://catto.io/post_files/fix-indexdb-leak-in-safari-15/fix_indexdb_leak_safari15.user.js
// @downloadURL https://catto.io/post_files/fix-indexdb-leak-in-safari-15/fix_indexdb_leak_safari15.user.js
// @include     *
// ==/UserScript==

// mock function to not cause errors
const dummyFunc = () => { return new Promise((resolve) => { resolve([]) } ) };

// for some reason, the function keeps randomly reverting to the original function
// so this will hopefully prevent that from happening

// the interval is set to 5ms, but it shouldn't cause too much CPU usage
// as the function is simple and higher values are less reliable

setInterval(function() {
    if (indexedDB.databases === dummyFunc) {
        return
    }
        window.indexedDB.databases = dummyFunc
        globalThis.indexedDB.databases = dummyFunc
        indexedDB.databases = dummyFunc
        console.log("Removing indexedDB.databases")
}, 5);
