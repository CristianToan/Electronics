import Topic from "../models/topic.model";
import createError from "http-errors";
import { ITopic } from "../types/modes";
const createDocument = async (payload: ITopic) => {
  const topic = await Topic.create(payload);
  return topic;
};

const findAll = async (query: any) => {
  const page_str = query.page;
  const limit_str = query.limit;
  const page = page_str ? parseInt(page_str as string) : 1;
  const limit = limit_str ? parseInt(limit_str as string) : 10;

  let objectFilters: any = {};
  if (query.keyword && query.keyword != "") {
    objectFilters = {
      ...objectFilters,
      topic_name: new RegExp(query.keyword, "i"),
    };
  }

  let objSort: any = {};
  const sortBy = query.sort || "updateAt";
  const orderBy = query.order && query.order == "ASC" ? 1 : -1;
  objSort = { ...objSort, [sortBy]: orderBy };

  const offset = (page - 1) * limit;
  const totalRecords = await Topic.countDocuments(objectFilters);

  const topics = await Topic.find({
    ...objectFilters,
  })
    .select("-__v -id")
    .sort(objSort)
    .skip(offset)
    .limit(limit);
  return {
    topics_list: topics,
    sort: objSort,
    filters: {
      topic_name: query.keyword || null,
    },
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
    },
  };
};

const findById = async (id: string) => {
  const topic = await Topic.findById(id, "-__v -id");
  if (!topic) {
    throw createError(400, "Topic Not Found!");
  }
  return topic;
};

const updateById = async (id: string, payload: ITopic) => {
  const topic = await findById(id);
  Object.assign(topic, payload);
  await topic.save();
  return topic;
};

const deleteById = async (id: string) => {
  const topic = await findById(id);
  await Topic.deleteOne({ _id: topic._id });
  return topic;
};

export default {
  createDocument,
  findAll,
  findById,
  updateById,
  deleteById,
};
