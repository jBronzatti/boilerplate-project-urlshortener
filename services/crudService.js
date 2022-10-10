async function creater(req, res, data, model) {
  try {

    await data.save();
    
    res.json({"original_url":data.original_url, "short_url": data.short_url});
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar");
  }
}

async function getter(res, data, model, populates=[]) {
  try {
    const response = await model.find(data).populate(populates);

    return response;
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar");    
  }
}

module.exports = { creater, getter };