export interface ActiveUserData {
  /**
   * The "sub" (subject) claim identifies the principal that is the subject of the JWT.
   * The value of this property is the user's id.
   * The claims in a JWT are normally statements about the subject.
   * The subject value MUST either be scoped to be locally unique in the context of the issuer or be globally unique.
   */
  sub: number | string;
  /**
   * The "email" claim provides the email address of the user.
   * The value of this property is the user's email.
   * The email address is used to identify the user.
   */
  email: string;
}
