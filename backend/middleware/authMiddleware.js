const authMiddleware = (req, res, next) => {
  console.log("Desde el middleware");
  next();
};

export default authMiddleware;
