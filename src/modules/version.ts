const ITEM_NAME = 'version';

export default class version {
  public static setVersion(version: string) {
    return localStorage.setItem(ITEM_NAME, version);
  }
  public static getVersion() {
    return localStorage.getItem(ITEM_NAME);
  }

  /**
   * Kiểm tra version của client có trùng với version hệ thống
   * @param version Version hệ thống
   * @return True nếu trùng với version hệ thống
   */
  public static equalVersion(version: string) {
    var clientVersion = this.getVersion();
    if (clientVersion) {
      if (version > clientVersion) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}