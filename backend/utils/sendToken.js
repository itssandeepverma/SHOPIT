// Create token and save in the cookie
export default (user, statusCode, res) => {
  // Create JWT Token
  console.log("before getting token");
  const token = user.getJwtToken();
  console.log("After getting token");

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000  //ms for 7 days
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    token,
  });

  
};  