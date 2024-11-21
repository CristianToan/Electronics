import { model, Schema } from "mongoose";
import { buildSlug } from "../helpers/buildSlug";

const postSchema = new Schema(
  {
    post_name: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      require: false,
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },

    isShowHome: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },

    comments: {
      user: { type: Schema.Types.ObjectId, ref: "Customer" },
      comment: { type: String, required: false },
      createdAt: { type: Date, default: Date.now },
    },

    slug: {
      type: String,
      require: false,
      maxLength: 255,
      unique: true,
      trim: true,
    },
    post_description: {
      type: String,
      maxLength: 500,
      trim: true,
      require: false,
    },
  },

  {
    timestamps: true,
  }
);

postSchema.pre("save", function (next) {
  const post = this;
  if (post.post_name && post.slug == null) {
    post.slug = buildSlug(post.post_name);
  }
  next();
});

const Post = model("Post", postSchema);
export default Post;
