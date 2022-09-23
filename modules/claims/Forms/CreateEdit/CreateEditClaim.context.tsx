import * as React from 'react';
import { CreateEditClaimContext } from './CreateEditClaim.types';

const CreateEditClaimContext = React.createContext<CreateEditClaimContext>({
	edit: false
});

if (process.env.NODE_ENV !== 'production') {
	CreateEditClaimContext.displayName = 'CreateEditClaimContext';
}

export default CreateEditClaimContext;
