const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Post content is required'],
    trim: true,
    maxlength: [1000, 'Post content cannot exceed 1000 characters'],
    minlength: [1, 'Post content cannot be empty']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post must have an author']
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  likesCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Indexes for better performance
postSchema.index({ author: 1, createdAt: -1 }); // For user's posts
postSchema.index({ createdAt: -1 }); // For feed sorting
postSchema.index({ 'likes.user': 1 }); // For like lookups

// Update likes count when likes array changes
postSchema.pre('save', function (next) {
  if (this.isModified('likes')) {
    this.likesCount = this.likes.length;
  }
  next();
});

// Virtual for formatted creation date
postSchema.virtual('formattedDate').get(function () {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Ensure virtual fields are included in JSON
postSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', postSchema);
