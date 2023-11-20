import { prisma } from "../client"


export async function createItem(name: string) {
  try {
    console.log(name);
    const t = await prisma.item.create({
      data: {
        name :name
      }
    });
    return t;
  } catch (error) {
    console.error('Error creating item', error);
    throw error;
  }
}

export async function getAllItems(){
  try {
    const items = await prisma.item.findMany();
    return items; // Return an array of user objects
  } catch (error) {
    console.error('Error getting all items:', error);
    throw error;
  }
}