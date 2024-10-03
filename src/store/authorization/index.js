import StoreModule from '../module';

class AuthorizationState extends StoreModule {
  initState() {
    return {
      user: null,
      error: '',
    };
  }

  async init() {
    const token = localStorage.getItem('token');

    if (token && !this.getState().user) {
        await this.load(token);
    }
  }

  async login(user) {
    this.setState({ ...this.getState() });
    await fetch(`/api/v1/users/sign`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(async (res) => {
      if (res.ok) {
        const result = await res.json();
        this.setState({ ...this.getState(), user: result.result.user, error: '' });
        localStorage.setItem('token', result.result.token);
      }
      else await Promise.reject(res);
    })
    .catch((e) => this.setState({ ...this.getState(), error: e.statusText }));
  }

  async load(token) {
    this.setState({ ...this.getState()});
    const response = await fetch(`/api/v1/users/self?fields=*`, {
        headers: {
            'X-Token': token,
            'Content-Type': 'application/json'
        },
    });
    const json = await response.json();
    this.setState({ ...this.getState(), user: { ...json.result } }, 'Загрузка профиля');
  }

  async logout() {
    const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
            'X-Token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
    });
    const json = await response.json();

    if (json.result) {
        this.setState(this.initState(), 'logout');
        localStorage.removeItem('token');
    }
  }
}

export default AuthorizationState;
