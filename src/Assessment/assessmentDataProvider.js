const FindAll = () => {
  return new Promise((resolve, reject) => {
    Assessment.findAll({
      where: {
        isDeleted: false
      }
    })
      .then((assessment) => {
        resolve(assessment);
      })
      .catch((error) => {
        reject(error);
      });
  });
}