import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { contactsService } from "../services/contacts-service";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsService.find(
      {},
      req.query.skip as string,
      req.query.limit as string,
    );
    res.status(StatusCodes.OK).json({ contacts }).end();
  } catch (err) {
    next(err);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const contacts = await contactsService.search(
      req.query.term as string,
      req.query.skip as string,
      req.query.limit as string,
    );
    res.status(StatusCodes.OK).json({ contacts }).end();
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const result = await contactsService.insertOne(req.body);
    res.status(StatusCodes.OK).json({ contactId: result.insertedId }).end();
  } catch (err) {
    next(err);
  }
});

router.post("/:contactId", async (req, res, next) => {
  try {
    await contactsService.update(req.params["contactId"], req.body);
    res.status(StatusCodes.OK).end();
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contactsService.delete(req.params["contactId"]);
    res.status(StatusCodes.OK).json({ result }).end();
  } catch (err) {
    next(err);
  }
});

export const ContactsRouter = router;
