export default {
    load: (id) => {
        return async (dispatch, _, services) => {
            dispatch({ type: 'comments/load-start' });

            try {
                const res = await services.api.request({
                    url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
                });
                
                dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
            } catch (e) {
                dispatch({ type: 'comments/load-error' });
            }
        };
    },
    create: (user, comment, onSuccess = () => {}) => {
        return async (dispatch, _, services) => {
            dispatch({ type: 'comments/load-start' });

            try {
                const res = await services.api.request({
                    url: `/api/v1/comments`,
                    method: 'POST',
                    body: JSON.stringify(comment),
                });

                dispatch({
                    type: 'comments/create-success',
                    payload: {
                        data: {
                            ...res.data.result,
                            author: {
                                ...res.data.result.author,
                                profile: {
                                    name: user.profile.name,
                                },
                            },
                        },
                    },
                });
                onSuccess('');
            } catch (e) {
                dispatch({ type: 'comments/load-error' });
            }
        };
    },
};
  