import React from 'react'
import { themeFunctionReducer, initialState } from './ThemeReducer';
import { MuiThemeProvider } from '@material-ui/core/styles';

const ThemeContext = React.createContext()
export const ThemeContextProvider = ThemeContext.Provider

export const ThemeContextProviders = (props) => {
	const [theme, dispatchTheme] = React.useReducer(themeFunctionReducer, initialState)

	return (<ThemeContextProvider value={{ theme, dispatchTheme }}>
		<MuiThemeProvider theme={theme}>
			{props.children}
		</MuiThemeProvider>
	</ThemeContextProvider>)
}

export default ThemeContext	