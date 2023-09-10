/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const url =\n  'http://api.weatherapi.com/v1/current.json?key=de6d61d5a3d04af183d160101230709&';\n\nasync function fetchApi() {\n  const img = document.querySelector('img');\n  const response = await fetch(\n    'http://api.weatherapi.com/v1/current.json?key=de6d61d5a3d04af183d160101230709&q=india',\n    { mode: 'cors' },\n  );\n  const weatherData = await response.json();\n  img.src = weatherData.current.condition.icon;\n  console.log(weatherData);\n}\n\nfetchApi().catch((err) => {\n  console.log(err);\n});\n\nasync function fetchWeather(location) {\n  const response = await fetch(`${url}&q=${location}`, { mode: 'cors' });\n  const data = await response.json();\n  return data;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sY0FBYztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0Esa0NBQWtDLElBQUksS0FBSyxTQUFTLEtBQUssY0FBYztBQUN2RTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcz9iNjM1Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHVybCA9XG4gICdodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9ZGU2ZDYxZDVhM2QwNGFmMTgzZDE2MDEwMTIzMDcwOSYnO1xuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEFwaSgpIHtcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgJ2h0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT1kZTZkNjFkNWEzZDA0YWYxODNkMTYwMTAxMjMwNzA5JnE9aW5kaWEnLFxuICAgIHsgbW9kZTogJ2NvcnMnIH0sXG4gICk7XG4gIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICBpbWcuc3JjID0gd2VhdGhlckRhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbjtcbiAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xufVxuXG5mZXRjaEFwaSgpLmNhdGNoKChlcnIpID0+IHtcbiAgY29uc29sZS5sb2coZXJyKTtcbn0pO1xuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFdlYXRoZXIobG9jYXRpb24pIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9JnE9JHtsb2NhdGlvbn1gLCB7IG1vZGU6ICdjb3JzJyB9KTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGE7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;