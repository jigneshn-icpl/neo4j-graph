const Cartography = require("../models/cartographyModel"); // your model
const inputData = require("../data/data.json");

const getGraphData = async (req, res) => {
    try {
        // const { id } = req.query; // Get the ID dynamically from the query parameter

        const result = await Cartography.aggregate([
            {
                $match: {
                    _id: "4:9214c9ea-67e3-4195-aa40-d285732321f2:6" // Match the provided ID
                }
            },
            {
                $graphLookup: {
                    from: "carto", // Collection name
                    startWith: "$parentID", // Start with the parent IDs
                    connectFromField: "parentID", // Field to follow for parents
                    connectToField: "_id", // Field to match for parents
                    as: "parents", // Output array field for parents
                    depthField: "depth" // Optional: Add depth information
                }
            }, {
                $graphLookup: {
                    from: "carto", // Collection name
                    startWith: "$childID", // Start with the current document's ID
                    connectFromField: "childID", // Field to follow for children
                    connectToField: "_id", // Field to match for children
                    as: "children", // Output array field for children
                    depthField: "depth" // Optional: Add depth information
                }
            }
        ]);

        res.json(result);
    } catch (err) {
        console.error("Graph lookup error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getGraphData };