export default {
	bind (uid, target, value) {
		if (!this.components[target]) return;

		this.components[target] = {
			[uid]: value
		};

		this.update(target);
	},
	unbind (uid, target) {
		if (this.components[target] == null) return;

		delete this.components[target][uid];

		this.update(target);
	},
	update (target) {
		this[target] = Object.values(this.components[target]).reduce((prev, current) => (prev + current), 0);
	}
}