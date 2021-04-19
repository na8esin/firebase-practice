import { Collection, } from 'fireorm';


@Collection('books')
export class Book {
  id!: string;
  title?: string;
}

