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
    this.setState({ ...this.getState(), waiting: true });
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const json = await response.json();
    if (json.error) {
      this.setState({ ...this.getState(), user: null, error: json.error.data.issues[0].message, waiting: false });
      return;
    }

    this.setState({ ...this.getState(), user: json.result.user, error: '', waiting: false });
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
    this.setState({
      ...this.getState(),
      user: json.result ? { ...json.result } : null,
      waiting: false,
    }, 'Загрузка своего профиля');
    
    if (json.error) {
      localStorage.removeItem('token');
    }
  }

  async logout() {
    const token = localStorage.getItem('token');
    this.setState({ ...this.getState(), waiting: true });
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

  resetError() {
    this.setState({ ...this.getState(), error: '' });    
  }
}

export default AuthorizationState;
