import Comment from "../models/comment.models.js";
import { ErrorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.User.id) {
      ErrorHandler(403, "You are not allowed to create this comment");
    }

    const newComment = new Comment({ content, postId, userId });

    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(ErrorHandler((404, "Comment not found")));
    }

    const userIndex = comment.likes.indexOf(req.User.id);

    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.User.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(ErrorHandler((404, "Comment not found")));
    }

    if (comment.userId !== req.User.id && !req.User.isAdmin) {
      return next(
        ErrorHandler(403, "You are not allowed to edit this comment")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );

    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(ErrorHandler((404, "Comment not found")));
    }

    if (comment.userId !== req.User.id && !req.User.isAdmin) {
      return next(
        ErrorHandler(403, "You are not allowed to edit this comment")
      );
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};
