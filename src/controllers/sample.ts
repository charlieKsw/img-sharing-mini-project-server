import * as Utils from "../utils";
import * as Samples from "../services/sample";

const createSample = async (req, res) => {
  try {
    await Utils.checkRequiredFields(req.body, ["name", "email"]);
    let { name, email } = req.body;
    let payload = { name, email };
    // Start to save sample
    await Samples.createSample(payload);
    return Utils.returnApiResponse(res, { email });
  } catch (e) {
    return Utils.returnApiResponse(
      res,
      { error: `Cannot create Sample - ${e}` },
      500
    );
  }
};

export { createSample };
