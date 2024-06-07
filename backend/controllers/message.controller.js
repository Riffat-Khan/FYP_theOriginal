import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import Service from "../models/service.model.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//     });

//     if (newMessage) {
//       conversation.messages.push(newMessage._id);
//     }

//     await Promise.all([conversation.save(), newMessage.save()]);

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

//COPILOT SUGGESTION
// import findOrCreate from 'mongoose-findorcreate';

// Add the findOrCreate plugin to the Conversation schema
// Conversation.plugin(findOrCreate);

// export const sendMessage = async (req, res) => {
//   try {
//     const { message, serviceId } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     const service = await Service.findOneAndUpdate(
//       { _id: serviceId, status: 'accepted' },
//       {},
//       { new: true }
//     );

//     if (!service) {
//       return res.status(404).json({ error: "Service not found or not accepted" });
//     }

//     let [conversation, created] = await Conversation.findOrCreate({
//       participants: { $all: [senderId, receiverId] },
//     });

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//     });

//     if (newMessage) {
//       conversation.messages.push(newMessage._id);
//       await conversation.save();
//     }

//     await newMessage.save();

//     if (!service.conversationID) {
//       service.conversationID = conversation._id;
//       await service.save();
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: serviceId } = req.params;
    const senderId = req.user._id;

    let service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    if (service.status !== "accepted") {
      return res.status(400).json({ error: "Service not accepted" });
    }

    const receiverId = service.createdBy.equals(senderId)
      ? service.modifiedBy
      : service.createdBy;

    let conversation = service.conversationID
      ? await Conversation.findById(service.conversationID)
      : await Conversation.create({ participants: [senderId, receiverId] });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    let savePromises = [newMessage.save()];

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      savePromises.push(conversation.save());
    }

    if (!service.conversationID) {
      service = await Service.findByIdAndUpdate(
        serviceId,
        { conversationID: conversation._id },
        { new: true }
      );
    }

    await Promise.all(savePromises);

    //OLD CODE
    //BY sending receiver Id in params

    // let conversation = await Conversation.findOne({
    //   participants: { $all: [senderId, receiverId] },
    // });

    // if (!conversation) {
    //   conversation = await Conversation.create({
    //     participants: [senderId, receiverId],
    //   });
    // }

    // const newMessage = new Message({
    //   senderId,
    //   receiverId,
    //   message,
    // });

    // if (newMessage) {
    //   conversation.messages.push(newMessage._id);
    // }

    // await Promise.all([conversation.save(), newMessage.save()]);

    // service.conversationID = conversation._id;
    // await service.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const getMessages = async (req, res) => {
//   try {
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     }).populate("messages");

//     if (!conversation) {
//       return res.status(404).json({ error: "Conversation not found" });
//     }

//     res.status(200).json(conversation.messages);
//   } catch (error) {
//     console.log("Error in getMessage controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const getMessages = async (req, res) => {
  try {
    const { id: serviceId } = req.params;

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const conversation = await Conversation.findById(
      service.conversationID
    ).populate("messages");

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
