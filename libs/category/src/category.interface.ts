export interface ICreateCategory {
    title: string;
    description?: string;
    type: string;
    imgUrl?: string;
    slug: string;
    createdBy: string;   // string vì sẽ được convert sang ObjectId
    updatedBy?: string;
    parentId?: string;
  }
  
  export interface IUpdateCategory {
    title?: string;
    description?: string;
    type?: string;
    imgUrl?: string;
    slug?: string;
    updatedBy?: string;
    parentId?: string;
  }
  
  export interface IListCategory {
    page?: number;
    size?: number;
  }
  