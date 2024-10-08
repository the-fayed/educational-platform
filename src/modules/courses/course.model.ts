import mongoose from "mongoose";

import { ICourse } from "./course.interface";

export const Course = new mongoose.Schema({
   name: {
      type: String,
      minLength: 3,
      maxLength: 128,
      required: true,
      unique: true
   },
   level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Level',
      required: true
   }
}, 
{ timestamps: true }
);

Course.pre('save', function(next) {
   this.set('name', this.get('name').charAt(0).toUpperCase() + this.get('name').slice(1));
   next();
});

export const CourseModel = mongoose.model<ICourse>("Course", Course);