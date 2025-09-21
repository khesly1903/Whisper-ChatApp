import User from "../models/user.model.js";
import { getMessages } from "./message.controller.js";

// sent contact request
export const sendContactRequest = async (req, res) => {
  try {
    const senderID = req.user._id;
    const sender = await User.findById(senderID);

    // const { receiverID } = req.body;
    const { receiverID } = req.query;
    const receiver = await User.findById(receiverID);

    if (senderID.toString() === receiverID) {
      return res
        .status(400)
        .json({ message: "You cannot send contact request to yourself" });
    }

    // check receiver exist
    if (!receiver) {
      return res.status(400).json({ message: "User not found" });
    }

    // check already contact
    const isAlreadyContact = sender.contacts.some(
      // ?? maybe ID comperison
      (contact) => contact.user.toString() === receiverID
    );
    if (isAlreadyContact) {
      return res.status(400).json({ message: "Already in contact" });
    }

    // check already sended contact request
    const alreadySent = sender.contactRequests.sent.some(
      (request) => request.user.toString() === receiverID
    );
    if (alreadySent) {
      return res.status(400).json({ message: "Contact request already sent" });
    }

    // sent contact request
    // sender's sent
    await User.findByIdAndUpdate(senderID, {
      $push: {
        "contactRequests.sent": {
          user: receiverID,
          sentAt: new Date(),
        },
      },
    });
    // receiver's received
    await User.findByIdAndUpdate(receiverID, {
      $push: {
        "contactRequests.received": {
          user: senderID,
          receivedAt: new Date(),
        },
      },
    });
    res.status(200).json({ message: "Contact requst sent succesfully" });
  } catch (error) {
    console.log("Error in sendContactRequest:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// cancel sended request
export const cancelContactRequest = async (req, res) => {
  const userID = req.user._id;
  const { receiverID } = req.query;

  try {
    // remove from sender's sended contact request
    await User.findByIdAndUpdate(userID, {
      $pull: {
        "contactRequests.sent": { user: receiverID },
      },
    });

    // remove from receiver's received contact request
    await User.findByIdAndUpdate(receiverID, {
      $pull: {
        "contactRequests.received": { user: userID },
      },
    });

    res.status(200).json({ message: "Contact request cancelled" });
  } catch (error) {
    console.log("Error in cancelContactRequest:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// remove the contact
export const removeContact = async (req, res) => {
  const userID = req.user._id;
  const { receiverID } = req.query;

  try {
    // remove from user
    await User.findByIdAndUpdate(userID, {
      $pull: {
        contacts: { user: receiverID },
      },
    });

    // remove from other side
    await User.findByIdAndUpdate(receiverID, {
      $pull: {
        contacts: { user: userID },
      },
    });

    res.status(200).json({ message: "Contact removed" });
  } catch (error) {
    console.log("Error in cancelContactRequest:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// accept contact request
export const acceptContactRequest = async (req, res) => {
  try {
    const userID = req.user._id;
    const { senderID } = req.query;

    // add both useres each others contacts
    // receiver user
    await User.findByIdAndUpdate(userID, {
      $push: {
        contacts: {
          user: senderID,
          addedAt: new Date(),
        },
      },
      $pull: {
        "contactRequests.received": { user: senderID },
      },
    });

    // sender user
    await User.findByIdAndUpdate(senderID, {
      $push: {
        contacts: {
          user: userID,
          addedAt: new Date(),
        },
      },
      $pull: {
        "contactRequests.sent": { user: userID },
      },
    });

    // if accept then for the chatbar
    // it will look like last message time
    await User.updateOne(
      { _id: userID },
      {
        $set: {
          "contacts.$[elem].lastMessageTime": new Date(),
        },
      },
      {
        arrayFilters: [{ "elem.user": senderID }],
      }
    );

    // for the receiver
    await User.updateOne(
      { _id: senderID },
      {
        $set: {
          "contacts.$[elem].lastMessageTime": new Date(),
        },
      },
      {
        arrayFilters: [{ "elem.user": userID }],
      }
    );

    res.status(200).json({ message: "Contact request accepted" });
  } catch (error) {
    console.log("Error in acceptContactRequest:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// reject contact request
export const rejectContactRequest = async (req, res) => {
  try {
    const userID = req.user._id;
    const { senderID } = req.query;

    // receiver reject
    await User.findByIdAndUpdate(userID, {
      $pull: {
        "contactRequests.received": { user: senderID },
      },
    });

    // senders request delete
    await User.findByIdAndUpdate(senderID, {
      $pull: {
        "contactRequests.sent": { user: userID },
      },
    });

    res.status(200).json({ message: "Contact request rejected" });
  } catch (error) {
    console.log("Error in rejectContactRequest:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all contact requests
export const getContactRequests = async (req, res) => {
  try {
    const userID = req.user._id;
    const user = await User.findById(userID)
      .populate("contactRequests.received.user", "nickName fullName profilePic")
      .populate("contactRequests.sent.user", "nickName fullName profilePic");

    res.status(200).json({
      received: user.contactRequests.received,
      sent: user.contactRequests.sent,
    });
  } catch (error) {
    console.log("Error in getContactRequests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all contacts
export const getContacts = async (req, res) => {
  try {
    const userID = req.user._id;
    const user = await User.findById(userID)
      .select("contacts")
      .populate("contacts.user", "nickName fullName profilePic");

    res.status(200).json(user.contacts);
  } catch (error) {
    console.log("Error in getContacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
