import React, { useCallback } from 'react';
import { Switch as SwitchBase } from '@blueprintjs/core';

interface SwitchComponentProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label: string;
}

const Switch: React.FC<SwitchComponentProps> = ({
	checked,
	onChange,
	label,
}) => {
	const handleChange = useCallback(
		(event: React.FormEvent<HTMLInputElement>) => {
			onChange(event.currentTarget.checked);
		},
		[onChange],
	);

	return (
		<SwitchBase checked={checked} label={label} onChange={handleChange} />
	);
};

export default Switch;
