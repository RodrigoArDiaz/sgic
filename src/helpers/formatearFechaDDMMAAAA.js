const formatearFechaDDMMAAAA = (fecha) => {
  let splitArray = fecha.split("-");
  return splitArray[2] + "-" + splitArray[1] + "-" + splitArray[0];
};

export { formatearFechaDDMMAAAA };
