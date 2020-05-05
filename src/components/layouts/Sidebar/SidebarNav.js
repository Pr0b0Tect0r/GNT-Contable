import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TreeView } from '@material-ui/lab'
import {
	ExpandMore,
	ChevronRight,
	DescriptionTwoTone
} from '@material-ui/icons';
import TreeItemStyled from 'components/common/TreeItemStyled'
import AppInteractionContext from 'app/context/appInteraction';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(0.8),
	}
}));


const SidebarNav = props => {
	const classes = useStyles();
	const { menuItems } = props;
	const history = useHistory()
	const { dispatch } = React.useContext(AppInteractionContext)

	const onClickMenuItem = menuValue => {
		if (!menuValue.padre) {
			history.push(`/${menuValue.codigo}`)
			dispatch(['sidebar', { selected: menuValue, path: menuValue.codigo }])
		}
	}

	const createTreeItems = (menuItems, clickFun) => {

		return menuItems.map((mitem) => {
			return (
				<TreeItemStyled
					key={mitem.idmenu}
					nodeId={mitem.idmenu}
					labelText={mitem.nombre}
					endIcon={DescriptionTwoTone}
					{...(!mitem.padre && { onClick: clickFun.bind(null, mitem) })}
				>
					{mitem.padre ? createTreeItems(mitem.children, clickFun) : null}
				</TreeItemStyled>
			)
		})
	}

	return (
		<div className={classes.root}>
			<TreeView
				defaultCollapseIcon={<ExpandMore />}
				defaultExpandIcon={<ChevronRight />}
			>
				{createTreeItems(menuItems.grouped, onClickMenuItem)}
			</TreeView>
		</div>
	)
}

export default SidebarNav