import mongoose from "mongoose";
import Account from "../models/account.model.js";

export const balance = async (req, res) => {
    try {

        const account = await Account.findOne({ user: req.userId });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        return res.status(200).json({ balance: account.balance });
    } catch (error) {
        console.error("Error in fetching balance:", error);
    }
};

export const transfer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amnt, to } = req.body;

        const account = await Account.findOne({ user: req.userId }).session(session);
        if (!account || account.balance < amnt) {
            await session.abortTransaction();
            session.endSession();
            return res.status(401).json({ msg: "Insufficient Funds" });
        }

        const toAccount = await Account.findOne({ user: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ msg: "Invalid Account" });
        }

        await Account.updateOne(
            { user: req.userId },
            { $inc: { balance: -amnt } },
            { session }
        );

        await Account.updateOne(
            { user: to },
            { $inc: { balance: amnt } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();
        return res.json({ msg: "Amount Transferred Successfully" });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error in Transferring money:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
