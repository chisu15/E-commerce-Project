export enum RoleType {
    ADMIN = 'admin',
    USER = 'user',
    SELLER = 'seller',
  }
  
  export const Role = {
    ADMIN: RoleType.ADMIN,
    USER: RoleType.USER,
    SELLER: RoleType.SELLER,
  } as const;
  
  export type Role = (typeof Role)[keyof typeof Role];
  