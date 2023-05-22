export enum AuthMessage {
  Configured = 'configured',
  ConfirmSignUp = 'confirmSignUp',
  ForgotPassword = 'forgotPassword',
  ForgotPasswordFailure = 'forgotPassword_failure',
  ForgotPasswordSubmitFailure = 'forgotPasswordSubmit_failure',
  ForgotPasswordSubmitSuccessful = 'forgotPasswordSubmit',
  Loading = 'loading',
  RequireNewPassword = 'requireNewPassword',
  SignIn = 'signIn',
  SignOut = 'signOut',
  SignUp = 'signUp',
  SignedIn = 'signedIn',
  SignedOut = 'signedOut',
  SignedUp = 'signedUp',
  Unknown = 'unknown',
}

export enum AuthErrorTypes {
  Default = 'default',
  EmptyChallengeResponse = 'emptyChallengeResponse',
  EmptyCode = 'emptyCode',
  EmptyPassword = 'emptyPassword',
  EmptyUsername = 'emptyUsername',
  InvalidMFA = 'invalidMFA',
  InvalidUsername = 'invalidUsername',
  MissingAuthConfig = 'missingAuthConfig',
  NoConfig = 'noConfig',
  NoMFA = 'noMFA',
  NoUserSession = 'noUserSession',
  SignUpError = 'signUpError',
  userNotAuthenticated = 'userNotAuthenticated',
}

export enum AuthException {
  NewPasswordRequiredException = 'NewPasswordRequiredException',
  PasswordResetRequiredException = 'PasswordResetRequiredException',
}

export enum AuthChallengeName {
  ADMIN_NO_SRP_AUTH = 'ADMIN_NO_SRP_AUTH',
  CUSTOM_CHALLENGE = 'CUSTOM_CHALLENGE',
  DEVICE_PASSWORD_VERIFIER = 'DEVICE_PASSWORD_VERIFIER',
  DEVICE_SRP_AUTH = 'DEVICE_SRP_AUTH',
  MFA_SETUP = 'MFA_SETUP',
  NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
  PASSWORD_VERIFIER = 'PASSWORD_VERIFIER',
  SELECT_MFA_TYPE = 'SELECT_MFA_TYPE',
  SMS_MFA = 'SMS_MFA',
  SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA',
}
