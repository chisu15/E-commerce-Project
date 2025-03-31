import { Types } from "mongoose";

export interface ICreateCategory {
    title: string;
    description?: string;
    type: string;
    imgUrl?: string;
    slug: string;
    createdBy: Types.ObjectId | string;
    updatedBy?: Types.ObjectId | string;
    parentId?: Types.ObjectId | string;
  }
  
  export interface IUpdateCategory {
    title?: string;
    description?: string;
    type?: string;
    imgUrl?: string;
    slug?: string;
    updatedBy?: Types.ObjectId | string;
    parentId?: Types.ObjectId | string;
  }
  
  export interface IListCategory {
    page?: number;
    size?: number;
  }
  