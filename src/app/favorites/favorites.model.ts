export class Favorites {
  public _id: { $oid: string };
  public name: string;
  public pages: number;
  public author: string;
  public publishDate: string;
  public aquireDate: string;
  public publisher: string;
  public edition: string;

  constructor(_id: { $oid: string }, name: string, pages: number, author: string, publishDate: string, aquireDate: string, publisher: string, edition: string) {
    this._id = _id;
    this.name = name;
    this.pages = pages;
    this.author = author;
    this.publishDate = publishDate;
    this.aquireDate = aquireDate;
    this.publisher = publisher;
    this.edition = edition;
  }
}
