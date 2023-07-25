const register = (req, res) => {
  res.send("Desde API/veterinarios");
};

const perfil = (req, res) => {
  res.send("Desde API/veterinarios/perfil");
};
export { register, perfil };
