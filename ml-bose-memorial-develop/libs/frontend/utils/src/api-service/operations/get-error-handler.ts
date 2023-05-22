import { httpStatusCode as HTTP_STATUS_CODE } from '@kleeen/common/utils';
import { _throw } from 'rxjs/observable/throw';

interface TypeIcon {
  icon: string;
  type: string;
}

interface Alert extends TypeIcon {
  error: string;
}

export function getErrorHandler(className: string, methodName: string) {
  return (error) => {
    let actions: Alert[] = [];

    switch (error.status) {
      case HTTP_STATUS_CODE.FORBIDDEN: {
        actions = [
          showAlert('Not Authorized', {
            type: 'primary',
            icon: 'i-flash',
          }),
        ];
        break;
      }
      case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR: {
        if (error.responseType === 'json' && error.response.errorMessage) {
          actions = [
            showAlert(error.response.errorMessage, {
              type: 'primary',
              icon: 'i-flash',
            }),
          ];
        } else {
          actions = [
            showAlert('Internal Server Error', {
              type: 'primary',
              icon: 'i-flash',
            }),
          ];
        }
        break;
      }
      case HTTP_STATUS_CODE.NOT_FOUND:
      case HTTP_STATUS_CODE.BAD_REQUEST:
      case HTTP_STATUS_CODE.BAD_GATEWAY: {
        actions = [
          showAlert('Something went wrong. Try again or contact your support admin.', {
            type: 'primary',
            icon: 'i-flash',
          }),
        ];
        break;
      }
      case HTTP_STATUS_CODE.SESSION_EXPIRED: {
        actions = [];
        break;
      }
      default:
        break;
    }

    /* eslint-disable no-console */
    console.error(className, methodName, error);
    /* eslint-enable no-console */
    return _throw({
      error,
      errorActions: actions,
    });
  };
}

function showAlert(error: string, baseAction: TypeIcon): Alert {
  console.warn('baseAPi log:', error, baseAction);

  return {
    ...baseAction,
    error,
  };
}
