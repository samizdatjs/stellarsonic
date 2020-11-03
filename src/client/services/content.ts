export class ContentService {
  public files: string[] = [];

  public constructor(
    private field: string,
    private url: string
  ) {
    if (url !== '') {
      this.listFiles();
    }
  }

  public async uploadFile(file: File) {
    const formData = new FormData();
    formData.append(this.field, file);
    await fetch(this.url, {
      method: 'POST',
      body: formData,
    });
    this.files = await this.listFiles();
  }

  public async deleteFile(path: string) {
    await fetch(path, {
      method: 'DELETE',
    });
    this.files = await this.listFiles();
  }

  public async listFiles() {
    const resp = await fetch(this.url);
    const fileNames = await resp.json() as string[];
    return this.files = fileNames.map(name => `${this.url}/${name}`);
  }
}
