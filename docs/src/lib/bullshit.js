import capitalize from 'lodash/capitalize';
import random from 'lodash/random';
import range from 'lodash/range';
import sample from 'lodash/sample';

// Based on https://github.com/cezary/bullshit

/* eslint-disable max-len */
const VERBS = ['implement', 'utilize', 'integrate', 'streamline', 'optimize', 'evolve', 'transform', 'embrace', 'enable', 'orchestrate', 'leverage', 'reinvent', 'aggregate', 'architect', 'enhance', 'incentivize', 'morph', 'empower', 'envisioneer', 'monetize', 'harness', 'facilitate', 'seize', 'disintermediate', 'synergize', 'strategize', 'deploy', 'brand', 'grow', 'target', 'syndicate', 'synthesize', 'deliver', 'mesh', 'incubate', 'engage', 'maximize', 'benchmark', 'expedite', 'reintermediate', 'whiteboard', 'visualize', 'repurpose', 'innovate', 'scale', 'unleash', 'drive', 'extend', 'engineer', 'revolutionize', 'generate', 'exploit', 'transition', 'e-enable', 'iterate', 'cultivate', 'matrix', 'productize', 'redefine', 'recontextualize'];
const ADJECTIVES = ['clicks-and-mortar', 'value-added', 'vertical', 'proactive', 'robust', 'revolutionary', 'scalable', 'leading-edge', 'innovative', 'intuitive', 'strategic', 'e-business', 'mission-critical', 'sticky', 'one-to-one', '24/7', 'end-to-end', 'global', 'B2B', 'B2C', 'granular', 'frictionless', 'virtual', 'viral', 'dynamic', '24/365', 'best-of-breed', 'killer', 'magnetic', 'bleeding-edge', 'web-enabled', 'interactive', 'dot-com', 'sexy', 'back-end', 'real-time', 'efficient', 'front-end', 'distributed', 'seamless', 'extensible', 'turn-key', 'world-class', 'open-source', 'cross-platform', 'cross-media', 'synergistic', 'bricks-and-clicks', 'out-of-the-box', 'enterprise', 'integrated', 'impactful', 'wireless', 'transparent', 'next-generation', 'cutting-edge', 'user-centric', 'visionary', 'customized', 'ubiquitous', 'plug-and-play', 'collaborative', 'compelling', 'holistic', 'rich'];
const NOUNS = ['synergies', 'web-readiness', 'paradigms', 'markets', 'partnerships', 'infrastructures', 'platforms', 'initiatives', 'channels', 'eyeballs', 'communities', 'ROI', 'solutions', 'e-tailers', 'e-services', 'action-items', 'portals', 'niches', 'technologies', 'content', 'vortals', 'supply-chains', 'convergence', 'relationships', 'architectures', 'interfaces', 'e-markets', 'e-commerce', 'systems', 'bandwidth', 'infomediaries', 'models', 'mindshare', 'deliverables', 'users', 'schemas', 'networks', 'applications', 'metrics', 'e-business', 'functionalities', 'experiences', 'web services', 'methodologies'];
/* eslint-enable max-len */

const verb = () => sample(VERBS);
const adjective = () => sample(ADJECTIVES);
const noun = () => sample(NOUNS);
const header = () => capitalize(verb()) + ' ' + adjective() + ' ' + noun();
const sentence = () => header() + '.';
const paragraph = (number = random(4, 12)) => range(number).map(() => sentence()).join(' ');

Array.from(document.querySelectorAll('.fixie')).forEach(elem => {
	switch (elem.nodeName) {
		case 'P':
			elem.innerHTML = paragraph();
			break;
		case 'H1':
		case 'H2':
		case 'H3':
			elem.innerHTML = header();
			break;
		case 'SPAN':
			elem.innerHTML = sentence();
			break;
		case 'LI':
		case 'TD':
		case 'TH':
		case 'OPTION':
			elem.innerHTML = capitalize(noun());
			break;
		case 'BUTTON':
			elem.innerHTML = capitalize(verb());
			break;
		default:
			elem.innerHTML = sentence();
			break;
	}
});
