export class Inventory {
  public id: string; // Add this line
  public _id: any;
  public name: string;
  public pages: number;
  public author: string;
  public publishDate: string;
  public aquireDate: string;
  public publisher: string;
  public edition: string;

  constructor(id: string, name: string, pages: number, author: string, publishDate: string, aquireDate: string, publisher: string, edition: string) {
    this.id = id; // And this line
    this.name = name;
    this.pages = pages;
    this.author = author;
    this.publishDate = publishDate;
    this.aquireDate = aquireDate;
    this.publisher = publisher;
    this.edition = edition;
  }
}
