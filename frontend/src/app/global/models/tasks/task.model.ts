export class TaskModel {
  public _id!: string; // generated by mongoDB
  public title!: string;
  public description!: string;
  public quantity!: number;
  public completed!: boolean;
  public category!: string;
  public createdAt!: Date; // generated by mongoDB
  public updatedAt!: Date; // generated by mongoDB
  public image!: string;
  constructor(model?: any) {
    Object.assign(this, model);
  }

}
