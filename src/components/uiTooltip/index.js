import uiTooltip from './uiTooltip';
import uiTooltipIndents from './uiTooltipIndents';

uiTooltip.install = function(Vue) {
	Vue.component(uiTooltip.name, uiTooltip);
	Vue.component(uiTooltipIndents.name, uiTooltipIndents);
};

export default uiTooltip;
