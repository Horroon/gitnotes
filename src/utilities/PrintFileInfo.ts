export function PrintFileInfo(files: any): { filename: string; fileUrl: string }[] {
    const Files:{filename:string, fileUrl:string,}[] = []
    const fileInfo = {
      filename: "",
      fileUrl: "",
    };
    for (const key in files) {
      fileInfo.filename = files[key]?.filename;
      fileInfo.fileUrl = files[key]?.raw_url;
      Files.push(fileInfo)
    }
    return Files;
  }