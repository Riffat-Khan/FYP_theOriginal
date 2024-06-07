import Service from "../models/service.model.js";

export const getUserServices = async (req, res) => {
  try {
    const patientID = req.user._id;

    const services = await Service.find({ createdBy: patientID }).populate(
      "modifiedBy",
      "fullname email"
    );

    if (!services) {
      return res.status(404).json({ error: "No services found" });
    }

    res.status(200).json(services);
  } catch (error) {
    console.log("Error in getAllServices controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({
      status: { $ne: "completed" },
    }).populate("createdBy", "fullname email");

    if (!services) {
      return res.status(404).json({ error: "No services found" });
    }

    res.status(200).json(services);
  } catch (error) {
    console.log("Error in getAllServices controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newService = new Service({
      title,
      description,
      createdBy: req.user._id,
    });

    if (newService) {
      await newService.save();

      res.status(201).json({
        _id: newService._id,
        title: newService.title,
        description: newService.description,
        createdBy: newService.createdBy,
      });
    } else {
      res.status(400).json({ error: "Invalid Service data" });
    }
  } catch (error) {
    console.log("Error in createService controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateService = async (req, res) => {
  try {
    const { serviceID } = req.params;
    const { title, description } = req.body;

    if (!serviceID) {
      return res.status(401).json({ error: "No ServiceID Provided" });
    }

    const service = await Service.findById(serviceID);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    if (service.status === "accepted") {
      return res.status(400).json({
        error: "Service is already accepted. You can not update it now",
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      serviceID,
      { title, description },
      { new: true }
    );

    res.json(updatedService);
  } catch (error) {
    console.log("Error in acceptService controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const acceptService = async (req, res) => {
  try {
    const { serviceID } = req.params;
    const careTakerId = req.user._id;

    if (!serviceID) {
      return res.status(401).json({ error: "No ServiceID Provided" });
    }

    const service = await Service.findById(serviceID);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    if (service.status === "accepted") {
      return res.status(400).json({ error: "Service is already accepted" });
    }

    const updatedService = await Service.findByIdAndUpdate(
      serviceID,
      { status: "accepted", modifiedBy: careTakerId },
      { new: true }
    );

    res.json(updatedService);
  } catch (error) {
    console.log("Error in acceptService controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
