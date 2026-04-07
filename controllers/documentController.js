import Document from "../models/Document.js";

// Upload a new document
export const uploadDoc = async (req, res) => {
  try {
    const doc = await Document.create(req.body);
    res.json(doc);
  } catch (error) {
    res.status(500).json({ msg: "Error uploading document", error: error.message });
  }
};

// Get all documents
export const getDocs = async (req, res) => {
  try {
    const docs = await Document.find();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching documents", error: error.message });
  }
};

// Update a document
export const updateDoc = async (req, res) => {
  try {
    const updatedDoc = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );
    res.json(updatedDoc);
  } catch (error) {
    res.status(500).json({ msg: "Error updating document", error: error.message });
  }
};

// Delete a document
export const deleteDoc = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ msg: "Document deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting document", error: error.message });
  }
};