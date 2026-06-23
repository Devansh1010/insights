import { createResponse, StatusCode } from "@/lib/createResponse";
import { CreateImpactEvent, ImpactModel } from "../models/impact.model";
import { Types } from "mongoose";

export async function createImpactEvent({ actorId, articleId, authorId, eventType, metadata }: CreateImpactEvent) {

  try {
    const eventAlreadyExist = await ImpactModel
      .findOne({
        actorId,
        articleId,
        eventType
      })
      .lean()

    if (eventAlreadyExist) {
      const deletedEvent = await ImpactModel.findOneAndDelete({
        _id: eventAlreadyExist._id
      })

      if (deletedEvent) {
        return createResponse(
          { success: true, message: "Event Deleted" },
          StatusCode.OK
        );
      } else {
        return createResponse(
          { success: true, message: "Conflict to Delete Event" },
          StatusCode.CONFLICT
        );
      }
    } else {
      const createdEvent = await ImpactModel.create({
        actorId,
        articleId,
        authorId,
        eventType,
        metadata
      })

      if (createdEvent) {
        return createResponse(
          {
            success: true,
            message: "Event Created"
          },
          StatusCode.OK
        );
      } else {
        return createResponse(
          { success: true, message: "Conflict to Create Event" },
          StatusCode.CONFLICT
        );
      }
    }
  } catch (error) {
    console.log(error)
    return createResponse(
      { success: true, message: "Internal Error occured" },
      StatusCode.INTERNAL_ERROR
    );
  }
}

export async function getAllUserEvents({ filter }: { filter: { articleId: Types.ObjectId, actorId: Types.ObjectId } }) {

  try {
    const events = await ImpactModel
      .find(filter)
      .lean()

    if (events.length === 0) {
      return createResponse(
        {
          success: false,
          message: "No Events Found for User",
          data : []
        },
        StatusCode.OK
      )
    } else {
      return createResponse(
        {
          success: true,
          message: "Events found",
          data: events
        },
        StatusCode.OK
      );
    }
  } catch (error) {
    console.log(error)
    return createResponse(
      { success: false, message: "Internal Error Occured while getting Events" },
      StatusCode.INTERNAL_ERROR
    );
  }
}