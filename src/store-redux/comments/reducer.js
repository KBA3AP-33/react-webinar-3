export const initialState = {
    data: {
        items: [],
        count: 0,
    },
    waiting: false,
};
  
function reducer(state = initialState, action) {
    switch (action.type) {
    case 'comments/load-start':
        return { ...state, waiting: true };

    case 'comments/load-success':
        return { ...state, data: action.payload.data, waiting: false };

    case 'comments/create-success': {
        return {
            ...state,
            data: {
                items: [
                    ...state.data.items,
                    action.payload.data
                ],
                count: state.data.count + 1,
            },
            waiting: false,
        };
    }

    case 'comments/load-error':
        return { ...state, waiting: false };

    default:
        return state;
    }
}
  
export default reducer;
  