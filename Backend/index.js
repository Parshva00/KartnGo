const signupService = require("./services/signup");
const loginService = require("./services/login");
const util = require("./utils/util");
const verifyService = require("./services/verify");

const healthPath = "/health";
const signUpPath = "/signup";
const loginPath = "/login";
const verifyPath = "/verify";

exports.handler = async (event) => {
  console.log("Request Event:", event);
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = util.buildResponse(200);
      break;
    case event.httpMethod === "POST" && event.path === signUpPath:
      const signUpBody = JSON.parse(event.body);
      response = await signupService.signup(signUpBody);
      break;
    case event.httpMethod === "POST" && event.path === loginPath:
      const loginBody = JSON.parse(event.body);
      response = await loginService.login(loginBody);
      break;

    case event.httpMethod === "POST" && event.path === verifyPath:
      const verifyBody = JSON.parse(event.body);
      response = await verifyService.verify(verifyBody);
      break;

    default:
      response = util.buildResponse(404, "404 Not found");
  }

  return response;
};
