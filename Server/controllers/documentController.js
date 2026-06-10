const Document = require("../models/Document");

exports.createDocument = async (req, res) => {
  try {
    
    const document = await Document.create({
      title: req.body.title || "Untitled Document",
      content: req.body.content || "",
      owner: req.user.id,
    });

    res.status(201).json(document);
  } catch (error) {
    console.log("CREATE DOC ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getMyDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      owner: req.user.id,
    });

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.updateDocument = async (req, res) => {
  try {
    const { title, content } = req.body;

    const document = await Document.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const User = require("../models/User");

exports.shareDocument = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const document = await Document.findById(req.params.id);

    document.sharedWith.push(user._id);

    await document.save();

    res.status(200).json({
      message: "Document shared successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getSharedDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      sharedWith: req.user.id,
    });

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};