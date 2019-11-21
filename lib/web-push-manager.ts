function urlB64ToUint8Array(base64String: any) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

class WebPushManager {
  public manager: any;
  public subscriptionAttempt: boolean;

  constructor() {
    this.manager = null;
    this.subscriptionAttempt = false;
  }

  public set = manager => {
    this.manager = manager;
    if (this.subscriptionAttempt) {
      this.subscribe();
      // @ts-ignore
    } else if (this.unsubscriptionAttempt) {
      this.unsubscribe();
    }
  };

  public subscribe = () => {
    if (!this.manager) {
      this.subscriptionAttempt = true;
      return Promise.reject('Please try again.');
    }
    return this.manager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(
        'BLt4-Sojo1RFTtQDhqdFi57Xp1PVqf6a_N8Xk4JxRRbF7C1BlgqaauvetEdCHixDc4onKBEVpVZmPtvSLstCv9E'
      ),
    });
  };

  public unsubscribe = () => {
    if (!this.manager) {
      // @ts-ignore
      this.unsubscriptionAttempt = true;
      return Promise.resolve(true);
    }
    return this.getSubscription().then((subscription: any) => subscription.unsubscribe());
  };

  public getPermissionState = () => {
    // No compat
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return new Promise(res => {
        res(false);
      });
    }
    // Old API
    if (navigator.permissions) {
      return navigator.permissions
        .query({ name: 'notifications' })
        .then((result: any) => result.state);
    }
    // New API
    return new Promise(res => {
      res(Notification.permission);
    });
  };

  public _getSubscription = () => {
    return this.manager.getSubscription();
  };

  public getSubscription = () =>
    new Promise(res => {
      // Recursively call this method until we got a manager
      if (!this.manager) {
        setTimeout(() => {
          res(this.getSubscription());
        }, 500);
      } else {
        res(this._getSubscription());
      }
    });
}

export default new WebPushManager();
