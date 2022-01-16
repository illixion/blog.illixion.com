// ==UserScript==
// @name        Fix indexedDB leak
// @description Fixes the Safari 15 indexedDB database leaking by removing the databases() function.
// @author      Ixion
// @version     1.1
// @updateURL   https://illixion.com/post_files/fix-indexdb-leak-in-safari-15/fix_indexdb_leak_safari15.user.js
// @downloadURL https://illixion.com/post_files/fix-indexdb-leak-in-safari-15/fix_indexdb_leak_safari15.user.js
// @match       *://*/*
// @run-at      document-start
// ==/UserScript==

window.indexedDB.databases = undefined
