import exprpess, { Request, Response } from "express";
import FinRecordModel from "../schema/fin-record";

const router = exprpess.Router();

router.get('/getAllByUserID/:userId', async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId
      const records = await FinRecordModel.find({userId: userId });
      if (records.length  === 0) {
        return res.status(404).send("No records found for the user.")
      }
      res.status(200).send(records);

    } catch (err) {
      res.status(500).send(err); 
    }
});



export default router;