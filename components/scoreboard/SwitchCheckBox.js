import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const SwitchCheckBox = ({ id, switchChecked, onChange, label }) => {
	return (
		<div className="flex justify-between items-center ">
			<Label htmlFor={label} className="text-md text-white">
				{label}
			</Label>

			<Switch id={id} checked={switchChecked} onCheckedChange={(e) => onChange(e)} />
		</div>
	);
};

export default SwitchCheckBox;
