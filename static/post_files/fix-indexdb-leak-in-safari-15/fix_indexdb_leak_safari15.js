// ==UserScript==
// @name        Fix indexedDB leak
// @description Fixes the Safari 15 indexedDB database leaking by removing the databases() function.
// @author      Manual
// @namespace   catto.io
// @match       *://*/*
// @inject-at   document-start
// ==/UserScript==

window.indexedDB.databases = undefined
