"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItems = exports.createItem = void 0;
const client_1 = require("../client");
function createItem(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(name);
            const t = yield client_1.prisma.item.create({
                data: {
                    name: name
                }
            });
            return t;
        }
        catch (error) {
            console.error('Error creating item', error);
            throw error;
        }
    });
}
exports.createItem = createItem;
function getAllItems() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield client_1.prisma.item.findMany();
            return items; // Return an array of user objects
        }
        catch (error) {
            console.error('Error getting all items:', error);
            throw error;
        }
    });
}
exports.getAllItems = getAllItems;
