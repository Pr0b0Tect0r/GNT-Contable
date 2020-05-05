export const initialState = {
    path: null,
    funcion: '',
    menuOpen: true,
    acciones: [],
    appbar: { title: null, actionText: null },
    sidebar: { selected: null, path: null },
    menuArray: {},
    guardar: null,
    guardarPdf: null,
    guardarExcel: null,
    openDialog: false,
    historial: [],
    openLoader: false,
    limpiar: null
}


export function interactionFunctionReducer(state, [action, payload]) {
    switch (action) {
        case 'inicio':
            return { ...state, path: payload };

        case 'acercade':
            return { ...state, path: payload };

        case 'anexoForm':
            return { ...state, path: payload };

        case 'anexoFormNuevo':
            return { ...state, path: payload };

        case 'menu':
            return { ...state, menuOpen: payload };

        case 'sidebar':
            return { ...state, sidebar: payload };

        case 'volver':
            return { ...state, path: payload };

        case 'acciones':
            return { ...state, acciones: payload };

        case 'guardar':
            return { ...state, guardar: payload };

        case 'guardarPdf':
            return { ...state, guardarPdf: payload };

        case 'guardarExcel':
            return { ...state, guardarExcel: payload };

        case 'openDialog':
            return { ...state, openDialog: payload };

        case 'historial':
            return { ...state, historial: payload };

        case 'openLoader':
            return { ...state, openLoader: payload };


        case 'limpiar':
            return { ...state, limpiar: payload };

        default:
            return state;
    }
}