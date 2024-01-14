export class ItemModel {

  public title!: string;
  public description!: string;
  public image!: string;
  public price!: number;
  public rating!: number;
  public isAvailable!: boolean;
  public selected?: boolean

  constructor(model?: any) {
    Object.assign(this, model);
  }
}

