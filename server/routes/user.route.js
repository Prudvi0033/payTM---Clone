import User from "../models/user.model.js"

export const profile = async (req, res) => {
    try {

        if(!req.user){
            return res.json("No authorized to access this")
        }

        return res.status(200).json({
            id : req.user._id,
            username : req.user.username,
            name : req.user.name
        })

    } catch (error) {
        console.log("Error in showing userProfile");
    }
}

export const editProfile = async (req, res) => {
   try {
    const fields = [
        "name",
        "username",
        "password"
    ]

    const updateData = {}

    for(const filed of fields){
        if(req.body[filed]){
            updateData[filed] = req.body[filed]
        }
    }
    const userId = req.user._id

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true }
    ).select("-password");

    if(!user){
        res.status(400).status("No user found")
    }

    return res.status(200).json({
        msg: "Profile updated successfully",
        user
    });

   } catch (error) {
        console.log("Error in updating user Info",error);
   }


    
}

export const getConnections = async (req, res) => {
    try {
        const filter = req.query.filter || ""; 
        const users = await User.find({
            name: { $regex: filter, $options: "i" } 
        });

        res.json({
            user : users
        });
    } catch (error) {
        console.error("Error in searching user:", error);
        res.status(500).json({ message: "An error occurred while searching for users" });
    }
};
