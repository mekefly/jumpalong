export interface Nip04 {
  /**
   *
   * @param pubkey  对方的公钥
   * @param plaintext 密文
   */
  encrypt(pubkey: string, plaintext: string): Promise<string>
  /**
   *
   * @param pubkey 对方的公钥
   * @param ciphertext 明文
   */
  decrypt(pubkey: string, ciphertext: string): Promise<string>
}
