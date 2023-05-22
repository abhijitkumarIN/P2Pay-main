import './sign-up.scss';

import { AuthButton, TextField, PhoneNumber } from '../auth.styles';
import { AuthMessage, KSAuth, SignUpOptions } from '@kleeen/auth';
import { ChangeEvent, ReactNode } from 'react';
import { CommonProps, handleExceptions } from '../helpers';
import { ISignUpProps } from 'aws-amplify-react/lib-esm/Auth/SignUp';
import { SignUp } from 'aws-amplify-react';
import { SignUpState } from './sign-up.model';
import { withSnackbar } from 'notistack';
import classNames from 'classnames';
import { formatPhoneNumber } from '../utils';
import { RadioGroup } from '@kleeen/react/components';
import { ListItem } from '@kleeen/types';
import { Auth } from '@aws-amplify/auth';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import awsmobile from '../../aws-exports';

class CustomSignUp extends SignUp {
  constructor(props: ISignUpProps) {
    super(props);
    this._validAuthStates = ['signUp', 'confirmSignUp'];
  }

  handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e?.target?.name) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ username: e });
    }
  }

  /**
   * Handlers
   */

  async confirmSignUp(): Promise<void> {
    const { code, username = '', role = 'Doctor', password } = this.state as SignUpState;

    try {
      const phoneNumberFormatted = formatPhoneNumber(username);

      const options = { username: phoneNumberFormatted, code };
      await KSAuth.confirmSignUp({ options });
      KSAuth.changeState(AuthMessage.SignIn);

      const optionsLogIn = { username: phoneNumberFormatted, password };
      await KSAuth.signIn({ options: optionsLogIn });

      const credentials = await Auth.currentCredentials();
      const cognitoServiceProvider = new CognitoIdentityServiceProvider({
        region: awsmobile.aws_project_region,
        apiVersion: '2016-04-18',
        credentials: Auth.essentialCredentials(credentials),
      });

      const params = {
        GroupName: role,
        UserPoolId: awsmobile.aws_user_pools_id,
        Username: phoneNumberFormatted,
      };
      await cognitoServiceProvider.adminAddUserToGroup(params).promise();
      await KSAuth.signOut();

      KSAuth.changeState(AuthMessage.SignIn);
      // Clean form state to avoid issues if the user retry
      ['username', 'code', 'password'].forEach((attribute) => this.setState({ [attribute]: '' }));
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  async resendSignUp(): Promise<void> {
    const { username = '' } = this.state as SignUpState;
    const phoneNumberFormatted = formatPhoneNumber(username);

    try {
      const options = { username: phoneNumberFormatted };
      await KSAuth.resendSignUp({ options });
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  async signUp(): Promise<void> {
    const { username = '', password } = this.state as SignUpState;

    try {
      const phoneNumberFormatted = formatPhoneNumber(username);

      const options: SignUpOptions = {
        username: phoneNumberFormatted,
        password,
        attributes: { phone_number: phoneNumberFormatted },
      };

      await KSAuth.signUp({ options });
      KSAuth.changeState(AuthMessage.ConfirmSignUp, username);
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  showComponent(): ReactNode {
    const { username, role = 'Doctor' } = this.state as SignUpState;
    const bem = 'ks-sign-up';

    const roles = [
      { displayValue: 'Doctor', id: '1', value: 'Doctor' },
      { displayValue: 'Patient', id: '2', value: 'Patient' },
      { displayValue: 'Donor', id: '3', value: 'Donor' },
    ];
    const roleOptions = { isLoading: false, data: roles };

    return (
      <div className={classNames(bem, 'sign-up')}>
        <div className={classNames(`${bem}__container`, 'container')}>
          <div className={classNames(`${bem}__wrapper`, 'wrap')}>
            <div className={classNames(`${bem}__logo-container`, 'pic')}>
              <img className={classNames(`${bem}__logo`)} src="/assets/logo.png" alt="KS Logo" />
            </div>
            {this.props.authState === 'signUp' && (
              <form className={classNames(`${bem}__form`)} data-testid="sign-up-section">
                <PhoneNumber
                  name="username"
                  label="Phone Number"
                  data-cy="user-phone"
                  defaultCountry={'us'}
                  onChange={this.handleInputChange}
                  data-testid="email"
                  key="username"
                  required={true}
                  type="phone"
                />
                <TextField
                  className={classNames(`${bem}__password input`, 'padding')}
                  data-testid="password"
                  key="password"
                  label="Password"
                  name="password"
                  onChange={this.handleInputChange}
                  required={true}
                  type="password"
                />
                <div className={classNames(`${bem}__helpers`, 'padding')}>
                  <span className="text">Select your role</span>
                  <RadioGroup
                    title="roles"
                    options={roleOptions}
                    defaultSelectionValue={role}
                    disabled={false}
                    hideTitle={false}
                    inSummaryDetails={false}
                    onSelect={(newSelectedOption: ListItem) => {
                      const newState = { role: newSelectedOption.displayValue } as any;
                      this.setState(newState);
                    }}
                  />
                </div>

                <div className={classNames(`${bem}__helpers`, 'padding', 'create-account')}>
                  <span className="text">
                    Have an account?
                    <a
                      className={classNames(`${bem}__link`, 'link')}
                      data-testid="sign-in"
                      onClick={() => KSAuth.changeState(AuthMessage.SignIn)}
                    >
                      Sign in
                    </a>
                  </span>

                  <AuthButton
                    className={classNames(`${bem}__cta`)}
                    data-testid="sign-up"
                    onClick={() => this.signUp()}
                    variant="contained"
                  >
                    Create Account
                  </AuthButton>
                </div>
              </form>
            )}
            {this.props.authState === 'confirmSignUp' && (
              <form
                className={classNames(`${bem}__form--confirmation`)}
                data-testid="confirm-sign-up-section"
              >
                <PhoneNumber
                  className={classNames(`${bem}__username`, 'input')}
                  data-cy="user-phone"
                  data-testid="email"
                  defaultCountry={'us'}
                  disabled={true}
                  key="username"
                  label="Phone Number"
                  name="phone"
                  onChange={this.handleInputChange}
                  required={true}
                  type="email"
                  value={username}
                />
                <TextField
                  className={classNames(`${bem}__code`, 'input')}
                  data-testid="code"
                  key="code"
                  label="Confirmation Code"
                  name="code"
                  onChange={this.handleInputChange}
                  required={true}
                  type="text"
                />
                <div className={classNames(`${bem}__resend-code`, 'padding', 'resend-code')}>
                  <span className={classNames('text')}>
                    Lost your code?
                    <a
                      className={classNames(`${bem}__link`, 'link')}
                      data-testid="resend-code"
                      onClick={() => this.resendSignUp()}
                    >
                      Resend Code
                    </a>
                  </span>
                </div>
                <div className={classNames('padding', 'confirm')}>
                  <a
                    className={classNames(`${bem}__link`, 'link')}
                    data-testid="sign-in"
                    onClick={() => KSAuth.changeState(AuthMessage.SignIn)}
                  >
                    Back to Sign In
                  </a>
                  <AuthButton
                    className={classNames(`${bem}__cta`)}
                    data-testid="confirm-sign-up"
                    onClick={() => this.confirmSignUp()}
                    variant="contained"
                  >
                    Confirm
                  </AuthButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withSnackbar(CustomSignUp as any); // eslint-disable-line
