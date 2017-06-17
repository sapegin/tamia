let log;
let warn;
let addBadge;

if (DEBUG) {
	addBadge = (args, name, background) => {
		// Color console badge
		// Based on https://github.com/jbail/lumberjack
		if (navigator.userAgent.indexOf('Chrome') !== -1 || navigator.userAgent.indexOf('Firefox') !== -1) {
			const format = '%c %s %c ' + args.shift();
			args.unshift(format, `background:${background}; color:#fff`, name, 'background:inherit; color:inherit');
		}
		else {
			args[0] = `${name}: ${args[0]}`;
		}
		return args;
	};

	const logger = (func) => (...args) => {
		console[func](...addBadge(args, 'Tâmia', '#aa759f'));  // eslint-disable-line no-console
	};

	log = logger('log');
	warn = logger('warn');
}
else {
	const fn = function() {};
	log = fn;
	warn = fn;
	addBadge = fn;
}

export {
	log,
	warn,
	addBadge,
};
