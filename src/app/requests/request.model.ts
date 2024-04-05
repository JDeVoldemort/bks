export class Request {
  public id: string; // Add this line
  public _id: { $oid: string };
  public name: string;
  public author: string;
  public publishDate: string;
  public publisher: string;
  public edition: string;

  constructor(id: string, _id: { $oid: string }, name: string, author: string, publishDate: string, publisher: string, edition: string) {
    this.id = id; // And this line
    this._id = _id;
    this.name = name;
    this.author = author;
    this.publishDate = publishDate;
    this.publisher = publisher;
    this.edition = edition;
  }
}
