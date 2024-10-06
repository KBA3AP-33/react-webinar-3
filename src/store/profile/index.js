import StoreModule from '../module';

class ProfileState extends StoreModule {
    initState() {
        return {
            user: null,
            waiting: true,
            error: '',
        };
    }

    async load() {
        this.setState({...this.getState(), waiting: true })
        const token = localStorage.getItem('token');
        
        if (token) {
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
                error: json?.error?.data?.issues[0]?.message ?? '',
            }, 'Загрузка профиля пользователя');
        }
        this.setState({ ...this.getState(), waiting: false });
    }
}

export default ProfileState;
