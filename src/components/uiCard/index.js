import uiCard from './uiCard';
import uiCardSection from './uiCardSection';
import uiCardRibbon from './uiCardRibbon';
import uiCardParams from './uiCardParams';

uiCard.install = function install(Vue) {
	Vue.component(uiCard.name, uiCard);
	Vue.component(uiCardSection.name, uiCardSection);
	Vue.component(uiCardRibbon.name, uiCardRibbon);
	Vue.component(uiCardParams.name, uiCardParams);
};

export default uiCard;
