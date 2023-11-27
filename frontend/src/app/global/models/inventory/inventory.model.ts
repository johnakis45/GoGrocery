export class InventoryModel {

    public name!: string;
    public description!: string;
    public image!: string;
    public quantity!: number;
  
    constructor(model?: any) {
      Object.assign(this, model);
    }
  }
  
  