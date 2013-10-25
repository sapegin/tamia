Object.getPropertyDescriptor = function(subject, name) {
	var pd = Object.getOwnPropertyDescriptor(subject, name);
	var proto = Object.getPrototypeOf(subject);
	while (pd === undefined && proto !== null) {
		pd = Object.getOwnPropertyDescriptor(proto, name);
		proto = Object.getPrototypeOf(proto);
	}
	return pd;
};
