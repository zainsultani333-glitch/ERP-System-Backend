import Document from "../models/Document.js";

// Upload Document
export const uploadMultipleDocs = async (req, res) => {
  try {
    const files = req.files;
    const { relatedTo, uploadedBy } = req.body;

    // helper to get file url
    const getFile = (key) =>
      files?.[key]?.[0]?.path || null;

    const educationFiles =
      files?.Education?.map((f) => f.path) || [];

    const experienceFiles =
      files?.Experience?.map((f) => f.path) || [];

    const data = {
      relatedTo,
      uploadedBy,
      resume: getFile("Resume"),
      cnicFront: getFile("CNIC_FRONT"),
      cnicBack: getFile("CNIC_BACK"),
      passportPhoto: getFile("PassportPhoto"),
      education: educationFiles,
      experience: experienceFiles,
      onModel: "Employee",
    };

    // 🔥 CHECK IF EXISTS (update or create)
    let existing = await Document.findOne({ relatedTo });

    if (existing) {
      const updated = await Document.findByIdAndUpdate(
        existing._id,
        data,
        { new: true }
      );

      return res.json(updated);
    }

    const doc = await Document.create(data);

    res.json(doc);
  } catch (error) {
    res.status(500).json({
      msg: "Error uploading document",
      error: error.message,
    });
  }
};

// GET ALL DOCUMENTS (HR VIEW)
export const getDocs = async (req, res) => {
  try {
    const docs = await Document.find()
      .populate("relatedTo", "name email department designation")
      .sort({ createdAt: -1 });

    res.json(docs);
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching documents",
      error: error.message,
    });
  }
};

// UPDATE DOCUMENT
export const updateDoc = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ msg: "Document not found" });
    }

    // update fields
    doc.documentType = req.body.documentType || doc.documentType;
    doc.relatedTo = req.body.relatedTo || doc.relatedTo;

    // if new file uploaded
    if (req.file) {
      doc.fileUrl = req.file.path; // Cloudinary URL
    }

    const updated = await doc.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      msg: "Error updating document",
      error: error.message,
    });
  }
};

// DELETE DOCUMENT
export const deleteDoc = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ msg: "Document not found" });
    }

    await doc.deleteOne();

    res.json({ msg: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({
      msg: "Error deleting document",
      error: error.message,
    });
  }
};