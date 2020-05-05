import React from 'react'
import Acercade from './Acercade';
import InfoAcercade from './infoAcercade'
import { AcercadeContextProviders } from './acercadeContext';

function IndexAcercade() {
	return (
		<AcercadeContextProviders>
			<Acercade />
            <InfoAcercade />
		</AcercadeContextProviders>
	)
}

export default IndexAcercade;