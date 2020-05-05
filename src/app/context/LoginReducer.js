export const initialState = localStorage.getItem('perfil') ? JSON.parse(localStorage.getItem('perfil')) : null


export function loginFunctionReducer(state, [action, payload]) {
    switch (action) {
        case 'login':
            return payload;

        case 'logout':
            return payload;

        default:
            return state;
    }
}