export class Request {
  public _id: { $oid: string };
  public name: string;
  public author: string;
  public publishDate: string;
  public publisher: string;
  public edition: string;

  constructor(_id: { $oid: string }, name: string, author: string, publishDate: string, publisher: string, edition: string) {
    this._id = _id;
    this.name = name;
    this.author = author;
    this.publishDate = publishDate;
    this.publisher = publisher;
    this.edition = edition;
  }
}
