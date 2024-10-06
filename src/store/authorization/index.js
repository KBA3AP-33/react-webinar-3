import StoreModule from '../module';

class AuthorizationState extends StoreModule {
  initState() {
    return {
      user: null,
      error: '',
      waiting: false,
    };
  }

  async login(user) {
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const json = await response.json();
    if (json.error) {
      this.setState({ ...this.getState(), user: null, error: json.error.data.issues[0].message });
      return;
    }

    this.setState({ ...this.getState(), user: json.result.user, error: '' });
    localStorage.setItem('token', json.result.token);
  }

  async load() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.setState({ ...this.getState(), waiting: true });
    const response = await fetch(`/api/v1/users/self?fields=*`, {
        headers: {
            'X-Token': token,
            'Content-Type': 'application/json'
        },
    });
    const json = await response.json();
    this.setState({ ...this.getState(), user: { ...json.result }, waiting: false }, 'Загрузка своего профиля');
  }

  async logout() {
    const token = localStorage.getItem('token');
    await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
            'X-Token': token,
            'Content-Type': 'application/json'
        },
    });

    this.setState(this.initState(), 'logout');
    localStorage.removeItem('token');
  }
}

export default AuthorizationState;
